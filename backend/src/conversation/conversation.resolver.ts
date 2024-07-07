import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/graphql-auth.guard';
import { CurrentUser } from '../auth/current-user.decorator';
import { Conversation } from './conversation.model';
import { ConversationService } from './conversation.service';

@Resolver(() => Conversation)
export class ConversationResolver {
  constructor(private conversationService: ConversationService) {}

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Conversation)
  async createConversation(
    @Args('username1') username1: string,
    @Args('username2') username2: string,
  ) {
    return this.conversationService.createConversation(username1, username2);
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => [Conversation])
  async getConversations(@CurrentUser() user: any, @Args('username') username: string) {
    return this.conversationService.getConversations(username);
  }
}
