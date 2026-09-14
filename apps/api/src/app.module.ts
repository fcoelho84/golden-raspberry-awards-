import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { Movie } from './modules/movies/movie.entity.js';
import { Studio } from './modules/studios/studio.entity.js';
import { Producer } from './modules/producers/producer.entity.js';
import { MovieModule } from './modules/movies/movie.module.js';
import { ProducerModule } from './modules/producers/producer.module.js';
import { StudioModule } from './modules/studios/studio.module.js';
import { SeedModule } from './database/seed.module.js';

@Module({
  imports: [
    MovieModule,
    ProducerModule,
    StudioModule,
    SeedModule,
    TypeOrmModule.forRoot({
      type: 'better-sqlite3',
      database: ':memory:',
      autoLoadEntities: true,
      synchronize: true,
      entities: [Movie, Studio, Producer],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
  exports: [],
})
export class AppModule {}
