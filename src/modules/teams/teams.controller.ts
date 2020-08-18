import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { TeamsService } from './teams.service';
import { TeamDto } from './dto/team.dto';
import { ITeam } from './interfaces/team.interface';
import { TeamQueryDto } from './dto/team-query.dto';

@Controller('teams')
export class TeamsController {
  constructor(public readonly teamsService: TeamsService) {}

  @Post()
  async createTeam(@Body() data: TeamDto): Promise<ITeam> {
    return await this.teamsService.createTeam(data);
  }

  @Get()
  async getTeams(@Query() query: TeamQueryDto): Promise<ITeam[]> {
    return await this.teamsService.getTeams(query);
  }
}
