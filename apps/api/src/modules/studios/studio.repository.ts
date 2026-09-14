import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Studio } from './studio.entity.js';

@Injectable()
export class StudioRepository {
  constructor(
    @InjectRepository(Studio)
    private readonly base: Repository<Studio>,
  ) {}

  async getAwardIntervals() {
    return this.base
      .createQueryBuilder('producer')
      .leftJoinAndSelect('producer.movies', 'movie', 'movie.winner = :winner', {
        winner: true,
      })
      .getMany();
  }

  async find(name: string) {
    return this.base
      .createQueryBuilder('producer')
      .where('name = :name', { name })
      .getOne();
  }

  async findOrCreate(names: string[]): Promise<Studio[]> {
    await this.base
      .createQueryBuilder()
      .insert()
      .into(Studio)
      .values(names.map((name) => ({ name })))
      .orIgnore()
      .execute();

    return this.base
      .createQueryBuilder('studio')
      .where('studio.name IN (:...names)', { names })
      .getMany();
  }
}
