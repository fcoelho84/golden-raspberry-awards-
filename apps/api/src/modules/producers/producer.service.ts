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

    let minIntervalValue = Number.POSITIVE_INFINITY;
    let maxIntervalValue = Number.NEGATIVE_INFINITY;

    const min: ProducerAwardIntervalDto[] = [];
    const max: ProducerAwardIntervalDto[] = [];

    for (const producer of consecutiveWinners) {
      for (let i = 0; i < producer.movies.length - 1; i++) {
        const previousWin = producer.movies[i].year;
        const followingWin = producer.movies[i + 1].year;
        const interval = followingWin - previousWin;
        const dto: ProducerAwardIntervalDto = {
          producer: producer.name,
          interval,
          previousWin,
          followingWin,
        };

        if (interval < minIntervalValue) {
          minIntervalValue = interval;
          min.length = 0;
          min.push(dto);
        } else if (interval === minIntervalValue) {
          min.push(dto);
        }

        if (interval > maxIntervalValue) {
          maxIntervalValue = interval;
          max.length = 0;
          max.push(dto);
        } else if (interval === maxIntervalValue) {
          max.push(dto);
        }
      }
    }

    return {
      min,
      max,
    };
  }
}
