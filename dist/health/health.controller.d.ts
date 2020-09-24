import { HealthCheckService, HealthCheckResult } from '@nestjs/terminus';
import { CustomHealthIndicator } from './custom.health';
export declare class HealthController {
    private health;
    private customHealthIndicator;
    constructor(health: HealthCheckService, customHealthIndicator: CustomHealthIndicator);
    check(): Promise<HealthCheckResult>;
}
