import { Injectable, NotFoundException } from '@nestjs/common';
import { Movie } from '../movies/movie.model';
import { Connection } from 'typeorm';
import { CreateCommentDto } from './dto/create.comment.dto';
import { Comment } from './comment.model';

@Injectable()
export class CommentsService {
  constructor(private connection: Connection,) { }
  
  async create(commentDto: CreateCommentDto): Promise<void> {
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect()
    await queryRunner.startTransaction()
    try {
      const movie = await queryRunner.manager.findOne(Movie, {
        where: { title: commentDto.movieTitle }
      })
      if (!movie) {
        throw new NotFoundException('Movie with this title does not exist in Database')
      }
      await queryRunner.manager.save(new Comment({
        text: commentDto.text,
        author: commentDto.author,
        movie
      }))

      await queryRunner.commitTransaction()
    } catch (err) {
      await queryRunner.rollbackTransaction()
      throw err
    } finally {
      await queryRunner.release()
    }
  }

  public async findAll(): Promise<string[]> {
    return (await this.connection.getRepository(Comment).find({select: ['id']})).map(c => c.id)
  }

  public async find(uuid: string): Promise<Comment> {
    const found = this.connection.getRepository(Comment).findOne(uuid)
    if (!found) {
      throw new NotFoundException()
    }
    
    return found
  }
}
