import {Args, Mutation, Resolver} from '@nestjs/graphql';
import {User} from './user.model';
import {UserService} from './user.service';

@Resolver(() => User)
export class UserResolver {
    constructor(private readonly userService: UserService) {
    }

    @Mutation(() => User)
    async createUser(@Args('username') username: string,
    ): Promise<User> {
        return this.userService.createUser(username);

    }


}
