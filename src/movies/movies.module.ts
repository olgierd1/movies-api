import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movie } from './movie.model';
import { MovieSerializerService } from './movie.serializer';
import { MoviesController } from './movies.controller';
import { MoviesService } from './movies.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Movie]),
  ],
  exports: [TypeOrmModule],
  controllers: [MoviesController],
  providers: [MoviesService, MovieSerializerService]
})
  
export class MoviesModule {}
