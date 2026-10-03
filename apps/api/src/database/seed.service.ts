import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { CsvParserService } from '../shared/csv-parser/csv-parser.service.js';
import { ProducerRepository } from '../modules/producers/producer.repository.js';
import { StudioRepository } from '../modules/studios/studio.repository.js';
import { MovieRepository } from '../modules/movies/movie.repository.js';

@Injectable()
export class DatabaseSeedService implements OnApplicationBootstrap {
  constructor(
    private readonly csvParserService: CsvParserService,
    private readonly movieRepository: MovieRepository,
    private readonly producerRepository: ProducerRepository,
    private readonly studioRepository: StudioRepository,
  ) {}

  async onApplicationBootstrap(): Promise<void> {
    await this.seedCsvData();
  }

  private async seedCsvData(): Promise<void> {
    await this.csvParserService.parseFile<{
      year: string;
      title: string;
      studios: string;
      producers: string;
      winner: string;
    }>('src/database/Movielist.csv', async (row) => {
      try {
        const title = row.title?.trim() ?? '';
        const year = parseInt(row.year, 10);
        const producersNames = this.csvParserService.splitLine(row.producers);

        if (!title || !Number.isInteger(year) || producersNames.length === 0) {
          throw new Error('Linha com campos essenciais inválidos');
        }

        const studios = await this.getStudios(row.studios);
        const producers = await this.getProducers(row.producers);

        const {
          identifiers: [entity],
        } = await this.movieRepository.create({
          title,
          year,
          winner: row.winner?.toLowerCase().trim() === 'yes',
        });

        await this.movieRepository.createProducerRelation({
          movieId: entity.id,
          producers,
        });

        await this.movieRepository.createStudioRelation({
          movieId: entity.id,
          studios,
        });
      } catch (err) {
        console.warn(`Ignorando linha inválida: ${JSON.stringify(row)}`);
      }
    });
  }

  private async getStudios(studios: string) {
    const splited = this.csvParserService.splitLine(studios);
    return this.studioRepository.findOrCreate(splited);
  }

  private async getProducers(producers: string) {
    const splited = this.csvParserService.splitLine(producers);
    return this.producerRepository.findOrCreate(splited);
  }
}
