  
import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Comment } from './comment.model'
import { CommentsSerializerService } from './comment.serializer'
import { CommentsController } from './comments.controller'
import { CommentsService } from './comments.service'

@Module({
  imports: [
    TypeOrmModule.forFeature([Comment])
  ],
  exports: [TypeOrmModule],
  controllers: [CommentsController],
  providers: [CommentsService, CommentsSerializerService]
})
export class CommentsModule {}