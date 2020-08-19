import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  Delete,
  HttpCode,
  HttpStatus,
  Param,
} from '@nestjs/common';
import { CreateMatchDto } from './dto/match.dto';
import { IMatch } from './interfaces/match.interface';
import { MatchesService } from './matches.service';
import { MatchQueryDto } from './dto/match-query.dto';
import { routes } from '../../constants';

@Controller(routes.matches)
export class MatchesController {
  constructor(public readonly matchService: MatchesService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createMatch(@Body() data: CreateMatchDto): Promise<IMatch> {
    return this.matchService.createMatch(data);
  }

  @Get()
  async getMatches(@Query() query: MatchQueryDto): Promise<IMatch[]> {
    return this.matchService.getMatches(query);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteMatch(@Param('id') id: string): Promise<void> {
    await this.matchService.deleteMatch(id);
  }
}
