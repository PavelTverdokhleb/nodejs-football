import { Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { routes } from '../../constants';
import { TeamResponseDto } from '../teams/dto/team-response.dto';

@ApiTags(routes.main.title)
@Controller()
export class AppController {
  constructor(public readonly appService: AppService) {}

  /**
   * Parse data from uri and inserts entities in db.
   */
  @Post('/seed')
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({ description: 'Data parsed.' })
  async seedData(): Promise<HttpStatus> {
    return await this.appService.seedData();
  }
}
