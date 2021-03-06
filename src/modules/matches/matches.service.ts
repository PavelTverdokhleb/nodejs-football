import {
  BadRequestException,
  forwardRef,
  HttpStatus,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IMatch } from './interfaces/match.interface';
import { MatchDto } from './dto/match.dto';
import { MatchQueryDto } from './dto/match-query.dto';
import { TeamsService } from '../teams';
import { MatchSchema } from './schema/match.schema';
import { StringResource } from '../../resource';
import { Utils } from '../../utils';

@Injectable()
export class MatchesService {
  constructor(
    @InjectModel(MatchSchema.name) private readonly matchModel: Model<IMatch>,
    @Inject(forwardRef(() => TeamsService))
    private teamsService: TeamsService,
  ) {}

  /**
   * Insert match into db.
   * @data match dto;
   */
  public async createMatch(data: MatchDto): Promise<IMatch> {
    await this.teamsService.findTeam('name', data.homeTeam, true);
    await this.teamsService.findTeam('name', data.awayTeam, true);
    const newMatch = new this.matchModel(data);
    await newMatch.save();
    return this.findMatch(newMatch.id);
  }

  /**
   * Get matches from db.
   * @query queries defined for match entity;
   */
  public async getMatches(query?: MatchQueryDto): Promise<IMatch[]> {
    const filterParams = MatchesService.getFilters(query);
    let filter = {};
    if (filterParams.length > 0) {
      filter = {
        $and: filterParams,
      };
    }
    return this.matchModel.find(filter).exec();
  }

  /**
   * Get match from db.
   * @id id of the match;
   */
  public async getMatch(id: string): Promise<IMatch> {
    return this.findMatch(id);
  }

  /**
   * Insert or update matches in db parsed from uri.
   * @data array of matches;
   */
  public async setMatches(data: MatchDto[]): Promise<HttpStatus> {
    try {
      const matchesUpdate = data.map(m => ({
        updateOne: {
          filter: {
            homeTeam: m.homeTeam,
            awayTeam: m.awayTeam,
            date: m.date,
          },
          update: { $set: m },
          upsert: true,
        },
      }));
      await this.matchModel.bulkWrite(matchesUpdate);
      return HttpStatus.OK;
    } catch (e) {
      throw new BadRequestException(StringResource.CantSetMatches);
    }
  }

  /**
   * Update match in db.
   * @id id of the match;
   * @data match dto;
   */
  public async updateMatch(id: string, data: MatchDto): Promise<IMatch> {
    const result = await this.matchModel.updateOne({ _id: id }, data).exec();
    if (!result.n) {
      throw new NotFoundException(
        Utils.format(StringResource.MatchNotExist, id),
      );
    }
    return this.findMatch(id);
  }

  /**
   * Delete match from db.
   * @id id of the match;
   */
  public async deleteMatch(id: string): Promise<void> {
    const result = await this.matchModel.deleteOne({ _id: id }).exec();
    if (!result.n) {
      throw new NotFoundException(
        Utils.format(StringResource.MatchNotExist, id),
      );
    }
  }

  /**
   * Delete match where team played from db.
   * @teamName name of the team;
   */
  public async deleteMatchesByTeam(teamName: string): Promise<void> {
    try {
      const matches = await this.getMatches({
        teams: teamName,
      } as MatchQueryDto);
      const matchesDelete = matches.map(m => ({
        deleteOne: {
          filter: { _id: m.id },
        },
      }));
      await this.matchModel.bulkWrite(matchesDelete);
    } catch (e) {
      throw new BadRequestException(StringResource.MatchesDeleteByTeam);
    }
  }

  /**
   * Find match in db.
   * @id id of the match;
   */
  public async findMatch(id: string): Promise<IMatch> {
    const match = await this.matchModel.findOne({ _id: id }).exec();
    if (!match) {
      throw new NotFoundException(StringResource.MatchNotFound);
    }
    return match;
  }

  /**
   * Get filters based on queries.
   * @query queries defined for match entity;
   */
  private static getFilters(query?: MatchQueryDto): any {
    const teams = query?.teams?.split(',');
    const date = query?.date;
    const filters = [];
    if (teams) {
      filters.push({
        $or: [{ homeTeam: { $in: teams } }, { awayTeam: { $in: teams } }],
      });
    }
    if (date) {
      filters.push({
        date,
      });
    }
    return filters;
  }
}
