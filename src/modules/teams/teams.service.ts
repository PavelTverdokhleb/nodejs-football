import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { TeamDto } from './dto/team.dto';
import { ITeam } from './interfaces/team.interface';
import { Model } from 'mongoose';
import { toTeam } from '../../shared/transform';
import { TeamQueryDto } from './dto/team-query.dto';

@Injectable()
export class TeamsService {
  constructor(@InjectModel('Team') private readonly teamModel: Model<ITeam>) {}

  public async createTeam(data: TeamDto): Promise<ITeam> {
    const newTeam = new this.teamModel(data);
    const savedTeam = await newTeam.save();
    return savedTeam.toObject({ transform: toTeam });
  }

  public async getTeams(query: TeamQueryDto): Promise<ITeam[]> {
    const teams = await this.teamModel
      .find({ name: { $regex: query.team || '', $options: '$i' } })
      .exec();
    return teams.map(t => t.toObject({ transform: toTeam }));
  }

  public async setTeams(data: TeamDto[]): Promise<HttpStatus> {
    try {
      const teamsUpdate = data.map(t => ({
        updateOne: {
          filter: { name: t.name },
          update: { $set: t },
          upsert: true,
        },
      }));
      await this.teamModel.bulkWrite(teamsUpdate);
    } catch (e) {
      throw new BadRequestException("Can't set teams");
    }
    return HttpStatus.OK;
  }
}
