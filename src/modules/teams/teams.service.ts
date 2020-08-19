import {
  BadRequestException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { TeamDto } from './dto/team.dto';
import { ITeam } from './interfaces/team.interface';
import { Model } from 'mongoose';
import { toTeam } from './transform/team.transform';
import { TeamQueryDto } from './dto/team-query.dto';
import * as Utils from '../../utils';

@Injectable()
export class TeamsService {
  constructor(@InjectModel('Team') private readonly teamModel: Model<ITeam>) {}

  public async createTeam(data: TeamDto): Promise<ITeam> {
    const team = await this.teamModel.findOne({ name: data.name }).exec();
    if (team) {
      throw new BadRequestException(
        `Team with name ${data.name} already exist`,
      );
    }
    const newTeam = new this.teamModel({ ...data, id: Utils.generateId() });
    const savedTeam = await newTeam.save();
    return savedTeam.toObject({ transform: toTeam });
  }

  public async getTeams(query?: TeamQueryDto): Promise<ITeam[]> {
    const teams = await this.teamModel
      .find({ name: { $regex: query?.team || '', $options: '$i' } })
      .exec();
    return teams.map(t => t.toObject({ transform: toTeam }));
  }

  public async getTeam(id: string): Promise<ITeam> {
    const team = await this.findTeam(id);
    return team.toObject({ transform: toTeam });
  }

  public async updateTeam(id: string, data: TeamDto): Promise<ITeam> {
    const result = await this.teamModel.findOneAndUpdate({ id }, data).exec();
    if (!result) {
      throw new NotFoundException("Can't find team");
    }
    return result.toObject({ transform: toTeam });
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

  public async deleteTeam(id: string): Promise<void> {
    const result = await this.teamModel.deleteOne({ id: id }).exec();
    if (result.n === 0) {
      throw new NotFoundException('Could not find team.');
    }
  }

  public async findTeam(id: string, check?: boolean): Promise<ITeam> {
    const team = await this.teamModel.findOne({ id }).exec();
    if (!team) {
      if (check) {
        throw new BadRequestException(`Team with id - ${id} doesn't exist`);
      }
      throw new NotFoundException("Can't find team");
    }
    return team;
  }
}
