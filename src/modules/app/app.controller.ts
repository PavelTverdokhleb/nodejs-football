import { Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(public readonly appService: AppService) {}

  @Post('/seed')
  @HttpCode(HttpStatus.CREATED)
  async seedDataBase(): Promise<HttpStatus> {
    return await this.appService.seedData();
  }
}
