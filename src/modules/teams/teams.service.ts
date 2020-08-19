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
import { TeamQueryDto } from './dto/team-query.dto';
import { Utils } from '../../utils';
import { StringResource } from '../../resource';
import { TeamSchema } from './schema/team.schema';

@Injectable()
export class TeamsService {
  constructor(
    @InjectModel(TeamSchema.name) private readonly teamModel: Model<ITeam>,
  ) {}

  /**
   * Insert team into db.
   * @data team dto;
   */
  public async createTeam(data: TeamDto): Promise<ITeam> {
    const team = await this.teamModel.findOne({ name: data.name }).exec();
    if (team) {
      throw new BadRequestException(
        Utils.format(StringResource.TeamWithNameExist, data.name),
      );
    }
    const newTeam = new this.teamModel({ ...data, id: Utils.generateId() });
    return await newTeam.save();
  }

  /**
   * Get teams from db.
   * @query queries defined for team entity;
   */
  public async getTeams(query?: TeamQueryDto): Promise<ITeam[]> {
    return await this.teamModel
      .find({ name: { $regex: query?.team || '', $options: '$i' } })
      .exec();
  }

  /**
   * Get team from db.
   * @id id of the team;
   */
  public async getTeam(id: string): Promise<ITeam> {
    return await this.findTeam(id);
  }

  /**
   * Update team in db.
   * @id id of the team;
   * @data team dto;
   */
  public async updateTeam(id: string, data: TeamDto): Promise<ITeam> {
    const result = await this.teamModel.updateOne({ id }, data).exec();
    if (result.n === 0) {
      throw new NotFoundException(StringResource.TeamNotFound);
    }
    return await this.findTeam(id);
  }

  /**
   * Insert or update teams in db parsed from uri.
   * @data array of teams;
   */
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
      throw new BadRequestException(StringResource.CantSetTeams);
    }
    return HttpStatus.OK;
  }

  /**
   * Delete team from db.
   * @id id of the team;
   */
  public async deleteTeam(id: string): Promise<void> {
    const result = await this.teamModel.deleteOne({ id: id }).exec();
    if (result.n === 0) {
      throw new NotFoundException(StringResource.TeamNotFound);
    }
  }

  /**
   * Find team in db.
   * @id id of the team;
   * @check condition to throw bad request exception;
   */
  public async findTeam(id: string, check?: boolean): Promise<ITeam> {
    const team = await this.teamModel.findOne({ id }).exec();
    if (!team) {
      if (check) {
        throw new BadRequestException(
          Utils.format(StringResource.TeamNotExist, id),
        );
      }
      throw new NotFoundException(StringResource.TeamNotFound);
    }
    return team;
  }
}
