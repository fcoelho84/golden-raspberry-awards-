import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMovieDto } from './dto/create-movie.dto.js';
import { Movie } from './movie.entity.js';
import { CreateMovieProducerRelationDto } from './dto/create-movie-producer-relation.dto.js';
import { CreateMovieStudioRelationDto } from './dto/create-movie-studio-relation.dto.js';

@Injectable()
export class MovieRepository {
  constructor(
    @InjectRepository(Movie)
    private readonly base: Repository<Movie>,
  ) {}

  async create(dto: CreateMovieDto) {
    return this.base
      .createQueryBuilder()
      .insert()
      .into(Movie)
      .values({
        year: dto.year,
        title: dto.title,
        winner: dto.winner,
      })
      .execute();
  }

  async createProducerRelation(dto: CreateMovieProducerRelationDto) {
    return this.base
      .createQueryBuilder()
      .relation(Movie, 'producers')
      .of(dto.movieId)
      .add(dto.producers);
  }

  async createStudioRelation(dto: CreateMovieStudioRelationDto) {
    return this.base
      .createQueryBuilder()
      .relation(Movie, 'studios')
      .of(dto.movieId)
      .add(dto.studios);
  }
}
