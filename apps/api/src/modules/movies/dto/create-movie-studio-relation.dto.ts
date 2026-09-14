import { Studio } from '../../studios/studio.entity.js';

export interface CreateMovieStudioRelationDto {
  movieId: number;
  studios: Studio[];
}
