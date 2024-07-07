import { Module } from '@nestjs/common';
import { ConversationService } from './conversation.service';
import { ConversationResolver } from './conversation.resolver';
import { PrismaService } from '../prisma.service';

@Module({
  providers: [ConversationService, ConversationResolver, PrismaService],
})
export class ConversationModule {}
