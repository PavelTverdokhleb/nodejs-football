import {
  BadRequestException,
  forwardRef,
  HttpStatus,
  Inject,
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
import { MatchesService } from '../matches';

@Injectable()
export class TeamsService {
  constructor(
    @InjectModel(TeamSchema.name) private readonly teamModel: Model<ITeam>,
    @Inject(forwardRef(() => MatchesService))
    private matchesService: MatchesService,
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
    const newTeam = new this.teamModel(data);
    return newTeam.save();
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
    return this.findTeam('_id', id);
  }

  /**
   * Update team in db.
   * @id id of the team;
   * @data team dto;
   */
  public async updateTeam(id: string, data: TeamDto): Promise<ITeam> {
    const result = await this.teamModel.updateOne({ _id: id }, data).exec();
    if (!result.n) {
      throw new NotFoundException(
        Utils.format(StringResource.TeamNotExist, id),
      );
    }
    return this.findTeam('_id', id);
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
    try {
      const team = await this.findTeam('_id', id, true);
      const result = await this.teamModel.deleteOne({ _id: id }).exec();
      if (!result.n) {
        throw new Error(Utils.format(StringResource.TeamNotExist, id));
      }
      await this.matchesService.deleteMatchesByTeam(team.name);
    } catch (e) {
      throw new NotFoundException(e.message);
    }
  }

  /**
   * Find team in db.
   * @id id of the team;
   * @check condition to throw bad request exception;
   */
  public async findTeam(
    field: keyof ITeam,
    value: string,
    check?: boolean,
  ): Promise<ITeam> {
    const team = await this.teamModel.findOne({ [field]: value }).exec();
    if (!team && check) {
      throw new BadRequestException(
        Utils.format(StringResource.TeamNotExist, value),
      );
    } else if (!team) {
      throw new NotFoundException(StringResource.TeamNotFound);
    }
    return team;
  }
}
