import { Controller, Get, Logger } from '@nestjs/common';
import { HealthCheckService } from './health-check.service';

@Controller('health-check')
export class HealthCheckController {
  private readonly logger = new Logger(HealthCheckController.name);

  constructor(private readonly healthCheckService: HealthCheckService) {}

  @Get()
  async check() {
    const jobData = { message: 'Health check job' };
    await this.healthCheckService.addJob(jobData);
    this.logger.log('Job added to the queue');
    return 'OK';
  }
}
