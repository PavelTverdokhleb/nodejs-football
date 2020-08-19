import {
  BadRequestException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { toMatch } from './transform/match.transform';
import { IMatch } from './interfaces/match.interface';
import { CreateMatchDto, MatchDto } from './dto/match.dto';
import { MatchQueryDto } from './dto/match-query.dto';
import * as Utils from '../../utils';
import { TeamsService } from '../teams';

@Injectable()
export class MatchesService {
  constructor(
    private teamsService: TeamsService,
    @InjectModel('Match') private readonly matchModel: Model<IMatch>,
  ) {}

  public async createMatch(data: CreateMatchDto): Promise<IMatch> {
    const homeTeam = await this.teamsService.findTeam(data.homeTeam);
    const awayTeam = await this.teamsService.findTeam(data.awayTeam);
    const newMatch = new this.matchModel({
      ...data,
      homeTeam,
      awayTeam,
      id: Utils.generateId(),
    });
    const savedMatch = await newMatch.save();
    return savedMatch.toObject({ transform: toMatch });
  }

  public async getMatches(query: MatchQueryDto): Promise<IMatch[]> {
    const filterParams = this.getFilters(query);
    let filter;
    if (filterParams.length > 0) {
      filter = {
        $and: filterParams,
      };
    }
    const matches = await this.matchModel
      .find(filter)
      .populate('homeTeam')
      .populate('awayTeam')
      .exec();
    return matches.map(m => m.toObject({ transform: toMatch }));
  }

  public async setMatches(data: MatchDto[]): Promise<HttpStatus> {
    try {
      const matchesUpdate = data.map(m => ({
        updateOne: {
          filter: {
            'homeTeam.id': m.homeTeam.id,
            'awayTeam.id': m.awayTeam.id,
            date: m.date,
          },
          update: { $set: m },
          upsert: true,
        },
      }));
      await this.matchModel.bulkWrite(matchesUpdate);
    } catch (e) {
      console.log(e);
      throw new BadRequestException("Can't set matches");
    }
    return HttpStatus.OK;
  }

  public async deleteMatch(id: string): Promise<void> {
    const result = await this.matchModel.deleteOne({ id: id }).exec();
    if (result.n === 0) {
      throw new NotFoundException('Could not find match.');
    }
  }

  private getFilters(query: MatchQueryDto): any {
    const teams = query.teams && query.teams.split(',');
    const date = query.date;
    const filters = [];
    if (teams) {
      filters.push({
        $or: [
          { 'homeTeam.name': { $in: teams } },
          { 'awayTeam.name': { $in: teams } },
        ],
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
