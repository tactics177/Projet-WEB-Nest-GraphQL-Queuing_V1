import { Module } from '@nestjs/common';
import { ConversationService } from './conversation.service';
import { ConversationResolver } from './conversation.resolver';
import { PrismaService } from '../prisma.service';

/**
 * Represents the Conversation module.
 * This module provides the ConversationService, ConversationResolver, and PrismaService providers.
 */
@Module({
  providers: [ConversationService, ConversationResolver, PrismaService],
})
export class ConversationModule {}
