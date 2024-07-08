import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { PrismaService } from '../prisma.service';

/**
 * Represents the User module in the application.
 * This module provides the UserService, UserResolver, and PrismaService.
 * It also exports the UserService for use in other modules.
 */
@Module({
  providers: [UserService, UserResolver, PrismaService],
  exports: [UserService],
})
export class UserModule {}
