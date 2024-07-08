import { ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';

/**
 * Custom GraphQL authentication guard that extends the built-in AuthGuard class.
 * This guard is used to protect GraphQL resolvers by validating JWT tokens.
 */
@Injectable()
export class GqlAuthGuard extends AuthGuard('jwt') {
  /**
   * Retrieves the request object from the execution context.
   * @param context - The execution context.
   * @returns The request object.
   */
  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req;
  }
}
