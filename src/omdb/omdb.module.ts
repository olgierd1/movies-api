import { HttpModule, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { OmdbService } from './omdb.service';

@Module({
  imports: [HttpModule, ConfigModule],
  providers: [OmdbService],
  exports: [OmdbService]
})
export class OmdbModule {}
