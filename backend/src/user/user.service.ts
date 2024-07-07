import { Injectable } from '@nestjs/common';
import { User } from './user.model';
import { Conversation } from '../conversation/conversation.model';
import { PrismaService } from '../prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async createUser(username: string) {
    const createdUser = await this.prisma.user.create({
      data: {
        username: username,
      },
    });
    return createdUser;
  }
}
