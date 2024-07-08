import { Field, ID, ObjectType } from '@nestjs/graphql';
import { User } from '../user/user.model';
import { Message } from '../message/message.model';

/**
 * Represents a conversation.
 */
@ObjectType()
export class Conversation {
  /**
   * The ID of the conversation.
   */
  @Field(() => ID)
  id: string;

  /**
   * The users participating in the conversation.
   */
  @Field(() => [User])
  users?: User[];

  /**
   * The messages in the conversation.
   */
  @Field(() => [Message], { nullable: true })
  messages?: Message[];
}
