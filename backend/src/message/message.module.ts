import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { MessageService } from './message.service';
import { MessageResolver } from './message.resolver';
import { MessageProcessor } from './message.processor';
import { PrismaService } from '../prisma.service';
import { MessageGateway } from './message.gateway';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'message-queue',
    }),
  ],
  providers: [MessageService, MessageResolver, MessageProcessor, PrismaService, MessageGateway],
})
export class MessageModule {}
