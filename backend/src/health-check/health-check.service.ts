import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bullmq';

@Injectable()
export class HealthCheckService implements OnModuleInit {
  constructor(@InjectQueue('test-queue') private readonly testQueue: Queue) {}

  async onModuleInit() {
    await this.testQueue.add('test-job', {
      message: 'This is a test job',
    });
  }

  async addJob(data: any) {
    await this.testQueue.add('test-job', data);
  }
}
