import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { Producer } from './producer.entity.js';
import { ProducerController } from './producer.controller.js';
import { ProducerService } from './producer.service.js';
import { ProducerRepository } from './producer.repository.js';

@Module({
  imports: [TypeOrmModule.forFeature([Producer])],
  controllers: [ProducerController],
  providers: [ProducerService, ProducerRepository],
  exports: [ProducerRepository],
})
export class ProducerModule {}
