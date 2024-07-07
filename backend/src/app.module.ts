import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { BullModule } from '@nestjs/bull';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HealthCheckModule } from './health-check/health-check.module';
import {UserModule} from "./user/user.module";
import { ConversationModule } from './conversation/conversation.module';
import { MessageModule } from './message/message.module';
import { AuthModule } from './auth/auth.module';
import { MessageGateway } from './message/message.gateway';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
    ConfigModule.forRoot(), // Loads environment variables from a .env file if present
    BullModule.forRoot({
      redis: {
        host: process.env.REDIS_HOST || 'localhost',
        port: parseInt(process.env.REDIS_PORT, 10) || 6379,
        password: process.env.REDIS_PASSWORD,
        maxRetriesPerRequest: null, // Remove retry limit
        retryStrategy: times => {
          return Math.min(times * 50, 2000);
        },
      },
    }),
    HealthCheckModule,
    UserModule,
    ConversationModule,
    MessageModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService, MessageGateway],
})
export class AppModule {}
