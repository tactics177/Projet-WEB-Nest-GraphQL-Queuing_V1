import { Injectable, ForbiddenException } from '@nestjs/common';
import { Message } from './message.model';
import { PrismaService } from '../prisma.service';

@Injectable()
export class MessageService {
  constructor(private prisma: PrismaService) {}

  async createMessage(
    username: string,
    content: string,
    conversationId: string,
  ): Promise<Message> {
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
    const { userId, ...rest } = createdMessage;
    return createdMessage;
  }

  async getMessages(username: string, conversationId: string): Promise<Message[]> {
    const isParticipant = await this.isUserInConversation(username, conversationId);
    if (!isParticipant) {
      throw new ForbiddenException('User is not a participant in this conversation');
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

  private async isUserInConversation(username: string, conversationId: string): Promise<boolean> {
    const conversation = await this.prisma.conversation.findUnique({
      where: { id: conversationId },
      include: { users: true },
    });
    return conversation.users.some(user => user.username === username);
  }
}
