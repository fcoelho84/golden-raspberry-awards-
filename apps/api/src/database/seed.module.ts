import { Module } from '@nestjs/common';
import { CsvParserModule } from '../shared/csv-parser/csv-parser.module.js';
import { DatabaseSeedService } from './seed.service.js';
import { MovieModule } from '../modules/movies/movie.module.js';
import { ProducerModule } from '../modules/producers/producer.module.js';
import { StudioModule } from '../modules/studios/studio.module.js';

@Module({
  imports: [CsvParserModule, MovieModule, ProducerModule, StudioModule],
  controllers: [],
  providers: [DatabaseSeedService],
  exports: [DatabaseSeedService],
})
export class SeedModule {}
