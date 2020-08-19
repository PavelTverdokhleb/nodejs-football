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

@Controller(routes.teams)
export class TeamsController {
  constructor(public readonly teamsService: TeamsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createTeam(@Body() data: TeamDto): Promise<ITeam> {
    return await this.teamsService.createTeam(data);
  }

  @Get()
  async getTeams(@Query() query: TeamQueryDto): Promise<ITeam[]> {
    return await this.teamsService.getTeams(query);
  }

  @Get(':id')
  async getTeam(@Param('id') id: string): Promise<ITeam> {
    return await this.teamsService.getTeam(id);
  }

  @Put(':id')
  async updateTeam(@Param('id') id: string, @Body() data: TeamDto) {
    return this.teamsService.updateTeam(id, data);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteMovie(@Param('id') id: string): Promise<void> {
    await this.teamsService.deleteTeam(id);
  }
}
