import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

/**
 * Custom decorator that retrieves the current user from the request object.
 * @param data - Additional data passed to the decorator.
 * @param context - The execution context containing the request object.
 * @returns The current user extracted from the request object.
 */
export const CurrentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req.user;
  },
);
