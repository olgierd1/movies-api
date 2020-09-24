import { HttpService } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
export declare class OmdbService {
    private readonly httpService;
    private readonly configService;
    constructor(httpService: HttpService, configService: ConfigService);
    fetchMovie(opts: {
        title: string;
        year?: number;
    }): Promise<unknown>;
}
