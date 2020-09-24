import { HealthIndicator, HealthIndicatorResult } from '@nestjs/terminus';
export declare class CustomHealthIndicator extends HealthIndicator {
    isHealthy(): Promise<HealthIndicatorResult>;
}
