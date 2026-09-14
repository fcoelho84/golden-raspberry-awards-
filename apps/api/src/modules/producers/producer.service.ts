import { Injectable } from '@nestjs/common';
import { ProducerRepository } from './producer.repository.js';
import { ProducerAwardIntervalDto } from './dto/award-intervals-response.dto.js';

@Injectable()
export class ProducerService {
  constructor(private readonly repository: ProducerRepository) {}

  async getAwardIntervals() {
    const consecutiveWinners = await this.repository.getConsecutiveWinners();

    if (!consecutiveWinners.length) {
      return {
        min: [],
        max: [],
      };
    }

    const dtos: ProducerAwardIntervalDto[] = consecutiveWinners.flatMap(
      (producer) => {
        const intervals: ProducerAwardIntervalDto[] = [];

        for (let i = 0; i < producer.movies.length - 1; i++) {
          const previousWin = producer.movies[i].year;
          const followingWin = producer.movies[i + 1].year;

          intervals.push({
            producer: producer.name,
            interval: followingWin - previousWin,
            previousWin,
            followingWin,
          });
        }

        return intervals;
      },
    );

    const minIntervalValue = Math.min(...dtos.map((item) => item.interval));
    const maxIntervalValue = Math.max(...dtos.map((item) => item.interval));

    const min = dtos.filter((item) => item.interval === minIntervalValue);
    const max = dtos.filter((item) => item.interval === maxIntervalValue);

    return {
      min,
      max,
    };
  }
}
