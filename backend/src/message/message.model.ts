import { Field, ID, ObjectType } from '@nestjs/graphql';
import { User } from '../user/user.model';

@ObjectType()
export class Message {
  @Field(() => ID)
  id: string;

  @Field()
  content: string;

  @Field(() => User)
  user: User;

  @Field()
  conversationId: string;
}
