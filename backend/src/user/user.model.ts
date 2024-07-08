import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Conversation } from '../conversation/conversation.model';

/**
 * Represents a User.
 */
@ObjectType()
export class User {
  /**
   * The unique identifier of the user.
   */
  @Field(() => ID)
  id: string;

  /**
   * The username of the user.
   */
  @Field()
  username: string;

  /**
   * The password of the user.
   */
  @Field()
  password: string;

  /**
   * The conversations associated with the user.
   * Can be null or an array of Conversation objects.
   */
  @Field(() => [Conversation], { nullable: 'itemsAndList' })
  conversations?: Conversation[];
}
