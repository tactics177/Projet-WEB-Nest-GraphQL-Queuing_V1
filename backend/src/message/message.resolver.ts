import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/graphql-auth.guard';
import { CurrentUser } from '../auth/current-user.decorator';
import { MessageService } from './message.service';
import { Message } from './message.model';

/**
 * Resolver for the Message entity.
 */
@Resolver(() => Message)
export class MessageResolver {
  constructor(private readonly messageService: MessageService) {}

  /**
   * Creates a new message.
   * @param user - The current user.
   * @param content - The content of the message.
   * @param conversationId - The ID of the conversation.
   * @returns The created message.
   */
  @UseGuards(GqlAuthGuard)
  @Mutation(() => Message)
  async createMessage(
    @CurrentUser() user: any,
    @Args('content') content: string,
    @Args('conversationId') conversationId: string,
  ) {
    return this.messageService.createMessage(
      user.username,
      content,
      conversationId,
    );
  }

  /**
   * Retrieves all messages for a given conversation.
   * @param user - The current user.
   * @param conversationId - The ID of the conversation.
   * @returns An array of messages.
   */
  @UseGuards(GqlAuthGuard)
  @Query(() => [Message])
  async getMessages(
    @CurrentUser() user: any,
    @Args('conversationId') conversationId: string,
  ) {
    return this.messageService.getMessages(user.username, conversationId);
  }
}
