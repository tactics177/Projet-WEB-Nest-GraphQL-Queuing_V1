import { Injectable } from '@nestjs/common';
import { User } from './user.model';
import { PrismaService } from '../prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  /**
   * Creates a new user with the provided username and password.
   * @param {string} username - The username of the user.
   * @param {string} password - The password of the user.
   * @returns {Promise<User>} - The created user.
   */
  async createUser(username: string, password: string): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, 10);
    const createdUser = await this.prisma.user.create({
      data: {
        username: username,
        password: hashedPassword,
      },
    });
    return createdUser;
  }

  /**
   * Finds a user by their username.
   * @param {string} username - The username of the user to find.
   * @returns {Promise<User | undefined>} - The found user, or undefined if not found.
   */
  async findOne(username: string): Promise<User | undefined> {
    return this.prisma.user.findUnique({
      where: { username },
    });
  }

  /**
   * Finds all users.
   * @returns {Promise<User[]>} - An array of all users.
   */
  async findAll(): Promise<User[]> {
    return this.prisma.user.findMany();
  }
}
