import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  Query,
  Delete,
  HttpCode,
  HttpStatus,
  Param,
} from '@nestjs/common';
import { TeamsService } from './teams.service';
import { TeamDto } from './dto/team.dto';
import { TeamQueryDto } from './dto/team-query.dto';
import { routes } from '../../constants';
import { toTeam } from './transform/team.transform';
import { ParseObjectIdPipe } from '../../pipes';
import {
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { TeamResponseDto } from './dto/team-response.dto';

@ApiTags(routes.teams.title)
@Controller(routes.teams.url)
export class TeamsController {
  constructor(public readonly teamsService: TeamsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({
    description: 'Team created.',
    type: TeamResponseDto,
  })
  async createTeam(@Body() data: TeamDto): Promise<TeamResponseDto> {
    const newTeam = await this.teamsService.createTeam(data);
    return newTeam.toObject({ transform: toTeam });
  }

  @Get()
  @ApiOkResponse({
    description: 'Teams list.',
    type: [TeamResponseDto],
  })
  async getTeams(@Query() query: TeamQueryDto): Promise<TeamResponseDto[]> {
    const teams = await this.teamsService.getTeams(query);
    return teams.map(t => t.toObject({ transform: toTeam }));
  }

  @Get(':id')
  @ApiOkResponse({
    description: 'Team data.',
    type: TeamResponseDto,
  })
  async getTeam(
    @Param('id', ParseObjectIdPipe)
    id: string,
  ): Promise<TeamResponseDto> {
    const team = await this.teamsService.getTeam(id);
    return team.toObject({ transform: toTeam });
  }

  /**
   * Need to resolve conflicts with ids.
   */
  // @Put(':id')
  // async updateTeam(@Param('id') id: string, @Body() data: TeamDto) {
  //   const updatedTeam = await this.teamsService.updateTeam(id, data);
  //   return updatedTeam.toObject({ transform: toTeam });
  // }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiNoContentResponse({
    description: 'Team and related matches deleted.',
  })
  async deleteMovie(@Param('id', ParseObjectIdPipe) id: string): Promise<void> {
    await this.teamsService.deleteTeam(id);
  }
}
