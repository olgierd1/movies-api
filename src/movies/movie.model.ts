import { IsOptional } from 'class-validator';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinTable } from 'typeorm';
import { Comment } from '../comments/comment.model';

@Entity()
export class Movie {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  title: string

  @Column()
  director: string

  @Column()
  year: string

  @Column()
  actors: string 

  @Column({nullable: true})
  @IsOptional()
  plot: string

  @OneToMany(() => Comment, comment => comment.movie, {cascade: true})
  comments: Comment[]
    
  constructor(partial: Partial<Movie>) {
    Object.assign(this, partial);
  }
}