import { Processor, Process } from '@nestjs/bull';
import { Job } from 'bull';
import { Logger } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { MessageGateway } from './message.gateway';

/**
 * Processor class for handling message queue jobs.
 */
@Processor('message-queue')
export class MessageProcessor {
  private readonly logger = new Logger(MessageProcessor.name);

  constructor(private prisma: PrismaService, private messageGateway: MessageGateway) {}

  /**
   * Handles the 'createMessage' job from the message queue.
   * @param job - The job object containing the data for creating a new message.
   * @returns The created message.
   */
  @Process('createMessage')
  async handleCreateMessage(job: Job) {
    this.logger.log(`Processing job ${job.id} with data: ${JSON.stringify(job.data)}`);
    
    const { username, content, conversationId } = job.data;
    const createdMessage = await this.prisma.message.create({
      data: {
        content: content,
        user: {
          connect: {
            username: username,
          },
        },
        conversation: {
          connect: {
            id: conversationId,
          },
        },
      },
      include: {
        user: true,
      },
    });

    this.logger.log(`Message created for conversation ${conversationId}`);
    this.messageGateway.notifyNewMessage(conversationId, createdMessage);
    return createdMessage;
  }
}
