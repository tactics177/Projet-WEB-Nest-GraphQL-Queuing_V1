import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/graphql-auth.guard';
import { User } from './user.model';
import { UserService } from './user.service';

/**
 * Resolver for User entity.
 */
@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  /**
   * Mutation to create a new user.
   * @param username - The username of the user.
   * @param password - The password of the user.
   * @returns The created user.
   */
  @Mutation(() => User)
  async createUser(
    @Args('username') username: string,
    @Args('password') password: string,
  ): Promise<User> {
    return this.userService.createUser(username, password);
  }

  /**
   * Query to get all users.
   * @returns An array of users.
   */
  @UseGuards(GqlAuthGuard)
  @Query(() => [User])
  async users(): Promise<User[]> {
    return this.userService.findAll();
  }
}
