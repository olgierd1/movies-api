import { HttpModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentsSerializerService } from '../comments/comment.serializer';
import { OmdbModule } from '../omdb/omdb.module';
import { Movie } from './movie.model';
import { MovieSerializerService } from './movie.serializer';
import { MoviesController } from './movies.controller';
import { MoviesService } from './movies.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Movie]),
    HttpModule,
    OmdbModule
  ],
  exports: [TypeOrmModule],
  controllers: [MoviesController],
  providers: [MoviesService, MovieSerializerService, CommentsSerializerService]
})
  
export class MoviesModule {}
