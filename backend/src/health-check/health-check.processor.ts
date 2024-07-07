import { Processor, Process } from '@nestjs/bull';
import { Job } from 'bull';
import { Logger } from '@nestjs/common';

@Processor('test-queue')
export class HealthCheckProcessor {
  private readonly logger = new Logger(HealthCheckProcessor.name);

  @Process('test-job')
  async handleJob(job: Job<any>) {
    this.logger.log(`Processing job: ${job.id} with data: ${JSON.stringify(job.data)}`);
    // Simulez une tâche ici, par exemple en attendant un certain temps
    await new Promise(resolve => setTimeout(resolve, 1000));
    this.logger.log(`Job ${job.id} completed`);
  }
}
