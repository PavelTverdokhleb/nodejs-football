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
import { MatchesService } from './matches.service';
import { MatchQueryDto } from './dto/match-query.dto';
import { routes } from '../../constants';
import { toMatch } from './transform/match.transform';
import { ParseObjectIdPipe } from '../../pipes';
import {
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { MatchResponseDto } from './dto/match-response.dto';

@ApiTags(routes.matches.title)
@Controller(routes.matches.url)
export class MatchesController {
  constructor(public readonly matchService: MatchesService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({
    description: 'Match created.',
    type: MatchResponseDto,
  })
  async createMatch(@Body() data: MatchDto): Promise<MatchResponseDto> {
    const newMatch = await this.matchService.createMatch(data);
    return newMatch.toObject({ transform: toMatch });
  }

  @Get()
  @ApiOkResponse({
    description: 'Matches list.',
    type: [MatchResponseDto],
  })
  async getMatches(@Query() query: MatchQueryDto): Promise<MatchResponseDto[]> {
    const matches = await this.matchService.getMatches(query);
    return matches.map(m => m.toObject({ transform: toMatch }));
  }

  @Get(':id')
  @ApiOkResponse({
    description: 'Match data.',
    type: MatchResponseDto,
  })
  async getMatch(
    @Param('id', ParseObjectIdPipe) id: string,
  ): Promise<MatchResponseDto> {
    const match = await this.matchService.getMatch(id);
    return match.toObject({ transform: toMatch });
  }

  @Put(':id')
  @ApiOkResponse({
    description: 'Match updated.',
    type: MatchResponseDto,
  })
  async updateMatch(
    @Param('id', ParseObjectIdPipe) id: string,
    @Body() data: MatchDto,
  ): Promise<MatchResponseDto> {
    const updatedMatch = await this.matchService.updateMatch(id, data);
    return updatedMatch.toObject({ transform: toMatch });
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiNoContentResponse({
    description: 'Match deleted.',
  })
  async deleteMatch(@Param('id', ParseObjectIdPipe) id: string): Promise<void> {
    await this.matchService.deleteMatch(id);
  }
}
