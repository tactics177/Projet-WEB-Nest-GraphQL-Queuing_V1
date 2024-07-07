import { Test, TestingModule } from '@nestjs/testing';
import { HealthCheckController } from './health-check.controller';
import { HealthCheckService } from './health-check.service';

describe('HealthCheckController', () => {
  let controller: HealthCheckController;
  let service: HealthCheckService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HealthCheckController],
      providers: [
        {
          provide: HealthCheckService,
          useValue: {
            // mock the methods if necessary
            check: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<HealthCheckController>(HealthCheckController);
    service = module.get<HealthCheckService>(HealthCheckService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  // Add more tests for your controller methods
});
