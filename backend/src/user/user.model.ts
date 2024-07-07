import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Conversation } from '../conversation/conversation.model';

@ObjectType()
export class User {
  @Field(() => ID)
  id: string;

  @Field()
  username: string;

  @Field()
  password: string;

  @Field(() => [Conversation], { nullable: 'itemsAndList' })
  conversations?: Conversation[];
}
