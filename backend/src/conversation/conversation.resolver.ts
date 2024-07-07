import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Conversation } from './conversation.model';
import { ConversationService } from './conversation.service';

@Resolver(() => Conversation)
export class ConversationResolver {
  constructor(private conversationService: ConversationService) {}

  @Mutation(() => Conversation)
  async createConversation(
    @Args('username1') username1: string,
    @Args('username2') username2: string,
  ) {
    return this.conversationService.createConversation(username1, username2);
  }

  @Query(() => [Conversation])
  async getConversation(@Args('username1') username1: string) {
    return this.conversationService.getConversation(username1);
  }
}
