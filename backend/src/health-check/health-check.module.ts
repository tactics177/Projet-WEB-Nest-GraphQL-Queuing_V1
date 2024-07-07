import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { HealthCheckController } from './health-check.controller';
import { HealthCheckService } from './health-check.service';
import { HealthCheckProcessor } from './health-check.processor';
import { HealthCheckResolver } from './health-check.resolver';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'test-queue',
    }),
  ],
  controllers: [HealthCheckController],
  providers: [HealthCheckService, HealthCheckProcessor, HealthCheckResolver],
})
export class HealthCheckModule {}
