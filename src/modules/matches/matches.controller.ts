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
  Put,
} from '@nestjs/common';
import { MatchDto } from './dto/match.dto';
import { IMatch } from './interfaces/match.interface';
import { MatchesService } from './matches.service';
import { MatchQueryDto } from './dto/match-query.dto';
import { routes } from '../../constants';
import { toMatch } from './transform/match.transform';

@Controller(routes.matches)
export class MatchesController {
  constructor(public readonly matchService: MatchesService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createMatch(@Body() data: MatchDto): Promise<IMatch> {
    const newMatch = await this.matchService.createMatch(data);
    return newMatch.toObject({ transform: toMatch });
  }

  @Get()
  async getMatches(@Query() query: MatchQueryDto): Promise<IMatch[]> {
    const matches = await this.matchService.getMatches(query);
    return matches.map(m => m.toObject({ transform: toMatch }));
  }

  @Get(':id')
  async getMatch(@Param('id') id: string): Promise<IMatch> {
    const match = await this.matchService.getMatch(id);
    return match.toObject({ transform: toMatch });
  }

  @Put(':id')
  async updateMatch(@Param('id') id: string, @Body() data: MatchDto) {
    const updatedMatch = await this.matchService.updateMatch(id, data);
    return updatedMatch.toObject({ transform: toMatch });
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteMatch(@Param('id') id: string): Promise<void> {
    await this.matchService.deleteMatch(id);
  }
}
