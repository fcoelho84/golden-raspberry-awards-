import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { Studio } from './studio.entity.js';
import { StudioRepository } from './studio.repository.js';

@Module({
  imports: [TypeOrmModule.forFeature([Studio])],
  controllers: [],
  providers: [StudioRepository],
  exports: [StudioRepository],
})
export class StudioModule {}
