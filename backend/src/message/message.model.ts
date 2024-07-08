import { Field, ID, ObjectType } from '@nestjs/graphql';
import { User } from '../user/user.model';

/**
 * Represents a message in a conversation.
 */
@ObjectType()
export class Message {
  /**
   * The unique identifier of the message.
   */
  @Field(() => ID)
  id: string;

  /**
   * The content of the message.
   */
  @Field()
  content: string;

  /**
   * The user who sent the message.
   */
  @Field(() => User)
  user: User;

  /**
   * The identifier of the conversation that the message belongs to.
   */
  @Field()
  conversationId: string;
}
