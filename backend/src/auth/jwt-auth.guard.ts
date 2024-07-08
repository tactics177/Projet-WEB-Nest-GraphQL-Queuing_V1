import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

/**
 * JwtAuthGuard class is responsible for guarding routes using JWT authentication.
 * It extends the AuthGuard class provided by the NestJS framework.
 * The 'jwt' parameter passed to the AuthGuard class specifies the strategy to be used for authentication.
 */
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
