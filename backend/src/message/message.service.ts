import { Injectable, ForbiddenException } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { Message } from './message.model';
import { PrismaService } from '../prisma.service';

@Injectable()
export class MessageService {
  constructor(
    private prisma: PrismaService,
    @InjectQueue('message-queue') private messageQueue: Queue,
  ) {}

  /**
   * Creates a new message and adds it to the message queue.
   * @param username - The username of the sender.
   * @param content - The content of the message.
   * @param conversationId - The ID of the conversation.
   * @returns A promise that resolves to the created message.
   */
  async createMessage(
    username: string,
    content: string,
    conversationId: string,
  ): Promise<Message> {
    await this.messageQueue.add('createMessage', {
      username,
      content,
      conversationId,
    });

    return new Promise((resolve, reject) => {
      this.messageQueue.on('completed', (job, result) => {
        if (job.data.conversationId === conversationId) {
          resolve(result);
        }
      });
      this.messageQueue.on('failed', (job, err) => {
        if (job.data.conversationId === conversationId) {
          reject(err);
        }
      });
    });
  }

  /**
   * Retrieves all messages in a conversation.
   * @param username - The username of the participant.
   * @param conversationId - The ID of the conversation.
   * @returns A promise that resolves to an array of messages.
   * @throws ForbiddenException if the user is not a participant in the conversation.
   */
  async getMessages(
    username: string,
    conversationId: string,
  ): Promise<Message[]> {
    const isParticipant = await this.isUserInConversation(
      username,
      conversationId,
    );
    if (!isParticipant) {
      throw new ForbiddenException(
        'User is not a participant in this conversation',
      );
    }

    const messages = await this.prisma.message.findMany({
      where: {
        conversationId: conversationId,
      },
      include: {
        user: true,
      },
    });
    return messages;
  }

  /**
   * Checks if a user is a participant in a conversation.
   * @param username - The username of the user.
   * @param conversationId - The ID of the conversation.
   * @returns A promise that resolves to a boolean indicating if the user is a participant.
   */
  private async isUserInConversation(
    username: string,
    conversationId: string,
  ): Promise<boolean> {
    const conversation = await this.prisma.conversation.findUnique({
      where: { id: conversationId },
      include: { users: true },
    });
    return conversation.users.some((user) => user.username === username);
  }
}
