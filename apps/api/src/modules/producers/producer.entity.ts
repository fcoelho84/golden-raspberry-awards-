import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  Index,
} from 'typeorm';
import { Movie } from '../movies/movie.entity.js';

@Entity('producers')
@Index(['id'])
export class Producer {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;

  @ManyToMany(() => Movie, (movie) => movie.producers)
  movies: Movie[];
}
