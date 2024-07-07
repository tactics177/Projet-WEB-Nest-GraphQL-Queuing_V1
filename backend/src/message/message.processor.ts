import { Processor } from '@nestjs/bull';

import { Logger } from '@nestjs/common';

@Processor('message-queue')
export class MessageProcessor {
  private readonly logger = new Logger(MessageProcessor.name);
}
