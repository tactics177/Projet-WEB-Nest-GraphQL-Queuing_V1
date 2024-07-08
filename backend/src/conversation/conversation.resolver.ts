import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/graphql-auth.guard';
import { CurrentUser } from '../auth/current-user.decorator';
import { Conversation } from './conversation.model';
import { ConversationService } from './conversation.service';

/**
 * Resolver for Conversation entity.
 */
@Resolver(() => Conversation)
export class ConversationResolver {
  constructor(private conversationService: ConversationService) {}

  /**
   * Mutation to create a new conversation between two users.
   * @param username1 - The username of the first user.
   * @param username2 - The username of the second user.
   * @returns The created Conversation entity.
   */
  @UseGuards(GqlAuthGuard)
  @Mutation(() => Conversation)
  async createConversation(
    @Args('username1') username1: string,
    @Args('username2') username2: string,
  ) {
    return this.conversationService.createConversation(username1, username2);
  }

  /**
   * Query to get all conversations of a user.
   * @param user - The current user.
   * @param username - The username of the user whose conversations are to be fetched.
   * @returns An array of Conversation entities.
   */
  @UseGuards(GqlAuthGuard)
  @Query(() => [Conversation])
  async getConversations(@CurrentUser() user: any, @Args('username') username: string) {
    return this.conversationService.getConversations(username);
  }
}
