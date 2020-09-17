import { Controller, Get } from '@nestjs/common'
import {
  HealthCheckService,
  HealthCheck,
  HealthCheckResult,
  HealthIndicatorResult
} from '@nestjs/terminus'
import { CustomHealthIndicator } from './custom.health'

@Controller('health')
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private customHealthIndicator: CustomHealthIndicator,
  ) {}

  @Get()
  @HealthCheck()
  check(): Promise<HealthCheckResult> {
    return this.health.check([():Promise<HealthIndicatorResult> => this.customHealthIndicator.isHealthy()])
  }
}
