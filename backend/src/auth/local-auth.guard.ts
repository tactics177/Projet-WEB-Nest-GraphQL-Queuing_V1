import { Injectable, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

/**
 * Custom guard that extends the AuthGuard class to handle local authentication.
 */
@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  /**
   * Determines if the current request is authorized to proceed.
   * @param context - The execution context of the current request.
   * @returns A Promise that resolves to a boolean indicating if the request is authorized.
   */
  async canActivate(context: ExecutionContext): Promise<boolean> {
    return (await super.canActivate(context)) as boolean;
  }
}
