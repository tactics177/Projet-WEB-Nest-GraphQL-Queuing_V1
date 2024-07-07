import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/graphql-auth.guard';
import { CurrentUser } from '../auth/current-user.decorator';
import { MessageService } from './message.service';
import { Message } from './message.model';

@Resolver(() => Message)
export class MessageResolver {
  constructor(private readonly messageService: MessageService) {}

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Message)
  async createMessage(
    @CurrentUser() user: any,
    @Args('content') content: string,
    @Args('conversationId') conversationId: string,
  ) {
    return this.messageService.createMessage(user.username, content, conversationId);
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => [Message])
  async getMessages(@CurrentUser() user: any, @Args('conversationId') conversationId: string) {
    return this.messageService.getMessages(user.username, conversationId);
  }
}
