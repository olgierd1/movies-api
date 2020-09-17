import { Injectable } from '@nestjs/common';
import { HealthIndicator, HealthIndicatorResult } from '@nestjs/terminus';

@Injectable()
export class CustomHealthIndicator extends HealthIndicator {

  async isHealthy(): Promise<HealthIndicatorResult> {
    return this.getStatus('healthy', true);
  }
}