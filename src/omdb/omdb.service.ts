import { HttpService, Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class OmdbService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService
  ) { }

  public async fetchMovie(opts: {title: string, year?: number}): Promise<unknown> {
    try {
      const { data } = await this.httpService.get(`${this.configService.get('RESOURCE_BASE_URL')}&t=${opts.title}&y=${opts.year}`).toPromise()
  
      if (data.Response === 'False') {
        throw new NotFoundException(data.Error)
      }

      return data
    } catch (error) {
      throw error
     }
  }
}
