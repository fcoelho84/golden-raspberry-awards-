import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
  Index,
} from 'typeorm';
import { Producer } from '../producers/producer.entity.js';
import { Studio } from '../studios/studio.entity.js';

@Entity('movies')
@Index(['year'])
export class Movie {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  year: number;

  @Column()
  title: string;

  @Column({ default: false })
  winner: boolean;

  // Para este desafio, um ManyToMany com tabela com a tabela pivot já atende às necessidades.
  // em um cenário com maior volume de dados seria interessante considerar o uso de uma
  // tabela explícita para melhor controle de indices/atributos de relacionamento.
  @ManyToMany(() => Studio, (studio) => studio.movies, { cascade: true })
  @JoinTable({
    name: 'movie_studios',
    joinColumn: { name: 'movie_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'studio_id', referencedColumnName: 'id' },
  })
  studios: Studio[];

  @ManyToMany(() => Producer, (producer) => producer.movies, { cascade: true })
  @JoinTable({
    name: 'movie_producers',
    joinColumn: { name: 'movie_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'producer_id', referencedColumnName: 'id' },
  })
  producers: Producer[];
}
