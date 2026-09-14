import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { Movie } from './movie.entity.js';
import { MovieRepository } from './movie.repository.js';

@Module({
  imports: [TypeOrmModule.forFeature([Movie])],
  controllers: [],
  providers: [MovieRepository],
  exports: [MovieRepository],
})
export class MovieModule {}
