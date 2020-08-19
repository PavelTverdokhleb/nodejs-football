import { Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(public readonly appService: AppService) {}

  /**
   * Parse data from uri and inserts entities in db.
   */
  @Post('/seed')
  @HttpCode(HttpStatus.CREATED)
  async seedData(): Promise<HttpStatus> {
    return await this.appService.seedData();
  }
}
