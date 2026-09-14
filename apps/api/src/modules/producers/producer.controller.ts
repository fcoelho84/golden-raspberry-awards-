import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { ProducerService } from './producer.service.js';

@Controller('producers')
export class ProducerController {
  constructor(private readonly service: ProducerService) {}

  @Get('awards-interval')
  @HttpCode(HttpStatus.OK)
  async getAwardIntervals() {
    return this.service.getAwardIntervals();
  }
}
