import { Injectable } from '@nestjs/common';
import { User } from './user.model';
import { PrismaService } from '../prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async createUser(username: string, password: string): Promise<User> {
    const createdUser = await this.prisma.user.create({
      data: {
        username: username,
        password: password,
      },
    });
    return createdUser;
  }

  async findOne(username: string): Promise<User | undefined> {
    return this.prisma.user.findUnique({
      where: { username },
    });
  }
}
