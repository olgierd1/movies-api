import { Movie } from '../movies/movie.model'
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm'

@Entity()
export class Comment {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  text: string

  @Column()
  author: string

  @ManyToOne(() => Movie, movie => movie.comments)
  movie: Movie

  constructor(partial: Partial<Comment>) {
    Object.assign(this, partial)
  }
}
