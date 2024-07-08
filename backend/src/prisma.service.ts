import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  /**
   * Initializes the Prisma client and establishes a connection to the database.
   * This method is called when the module is initialized.
   */
  async onModuleInit() {
    await this.$connect();
  }

  /**
   * Disconnects the Prisma client from the database.
   * This method is called when the module is destroyed.
   */
  async onModuleDestroy() {
    await this.$disconnect();
  }
}
