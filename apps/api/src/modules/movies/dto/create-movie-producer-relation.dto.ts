import { Producer } from '../../producers/producer.entity.js';

export interface CreateMovieProducerRelationDto {
  movieId: number;
  producers: Producer[];
}
