import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Producer } from './producer.entity.js';

@Injectable()
export class ProducerRepository {
  constructor(
    @InjectRepository(Producer)
    private readonly base: Repository<Producer>,
  ) {}

  // Talvez a utilização do LAG ou self join para pegar os valores de anos anterios,
  // pode ser uma opção mais performatica. Mas precisaria de algumas outras métricas para validar a ideia.
  // como o volume de dados é pequeno, segui com essa forma mais simples.
  async getConsecutiveWinners() {
    const producersWithMultipleWins = this.base
      .createQueryBuilder('p')
      .select('p.id')
      .innerJoin('p.movies', 'm', 'm.winner = :winner')
      .groupBy('p.id')
      .having('COUNT(m.id) > 1');

    return this.base
      .createQueryBuilder('producer')
      .innerJoinAndSelect(
        'producer.movies',
        'movie',
        'movie.winner = :winner',
        { winner: true },
      )
      .where(`producer.id IN (${producersWithMultipleWins.getQuery()})`)
      .setParameters(producersWithMultipleWins.getParameters())
      .orderBy('movie.year', 'ASC')
      .getMany();
  }

  async findOrCreate(names: string[]): Promise<Producer[]> {
    await this.base
      .createQueryBuilder()
      .insert()
      .into(Producer)
      .values(names.map((name) => ({ name })))
      .orIgnore()
      .execute();

    return this.base
      .createQueryBuilder('producer')
      .where('producer.name IN (:...names)', { names })
      .getMany();
  }
}
