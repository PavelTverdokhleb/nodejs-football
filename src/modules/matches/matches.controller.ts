import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { MatchDto } from './dto/match.dto';
import { IMatch } from './interfaces/match.interface';
import { MatchesService } from './matches.service';
import { MatchQueryDto } from './dto/match-query.dto';

@Controller('matches')
export class MatchesController {
  constructor(public readonly matchService: MatchesService) {}

  @Post()
  async createMatch(@Body() data: MatchDto): Promise<IMatch> {
    return this.matchService.createMatch(data);
  }

  @Get()
  async getMatches(@Query() query: MatchQueryDto): Promise<IMatch[]> {
    return this.matchService.getMatches(query);
  }
}
