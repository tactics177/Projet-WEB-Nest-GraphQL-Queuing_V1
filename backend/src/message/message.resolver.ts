import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { MessageService } from './message.service';
import { Message } from './message.model';

@Resolver(() => Message)
export class MessageResolver {
  constructor(private readonly messageService: MessageService) {}

  @Mutation(() => Message)
  async createMessage(
    @Args('username') username: string,
    @Args('content') content: string,
    @Args('conversationId') conversationId: string,
  ) {
    return this.messageService.createMessage(username, content, conversationId);
  }

  @Query(() => [Message])
  async getMessages(@Args('conversationId') conversationId: string) {
    return this.messageService.getMessages(conversationId);
  }
}
