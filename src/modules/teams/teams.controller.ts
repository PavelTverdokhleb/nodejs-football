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
import { ITeam } from './interfaces/team.interface';
import { TeamQueryDto } from './dto/team-query.dto';
import { routes } from '../../constants';
import { toTeam } from './transform/team.transform';

@Controller(routes.teams)
export class TeamsController {
  constructor(public readonly teamsService: TeamsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createTeam(@Body() data: TeamDto): Promise<ITeam> {
    const newTeam = await this.teamsService.createTeam(data);
    return newTeam.toObject({ transform: toTeam });
  }

  @Get()
  async getTeams(@Query() query: TeamQueryDto): Promise<ITeam[]> {
    const teams = await this.teamsService.getTeams(query);
    return teams.map(t => t.toObject({ transform: toTeam }));
  }

  @Get(':id')
  async getTeam(@Param('id') id: string): Promise<ITeam> {
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
  async deleteMovie(@Param('id') id: string): Promise<void> {
    await this.teamsService.deleteTeam(id);
  }
}
