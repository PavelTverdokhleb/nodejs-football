import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { toMatch, toTeam } from '../../shared/transform';
import { IMatch } from './interfaces/match.interface';
import { MatchDto } from './dto/match.dto';
import { MatchQueryDto } from './dto/match-query.dto';

@Injectable()
export class MatchesService {
  constructor(
    @InjectModel('Match') private readonly matchModel: Model<IMatch>,
  ) {}

  public async createMatch(data: MatchDto): Promise<IMatch> {
    const newMatch = new this.matchModel(data);
    const savedMatch = await newMatch.save();
    return savedMatch.toObject({ transform: toTeam });
  }

  public async getMatches(query: MatchQueryDto): Promise<IMatch[]> {
    const filterParams = this.getFilters(query);
    let filter;
    if (filterParams.length > 0) {
      filter = {
        $and: filterParams,
      };
    }
    const matches = await this.matchModel.find(filter).exec();
    return matches.map(m => m.toObject({ transform: toMatch }));
  }

  public async setMatches(data: MatchDto[]): Promise<HttpStatus> {
    try {
      const matchesUpdate = data.map(m => ({
        updateOne: {
          filter: { homeTeam: m.homeTeam, awayTeam: m.awayTeam, date: m.date },
          update: { $set: m },
          upsert: true,
        },
      }));
      await this.matchModel.bulkWrite(matchesUpdate);
    } catch (e) {
      throw new BadRequestException("Can't set matches");
    }
    return HttpStatus.OK;
  }

  private getFilters(query: MatchQueryDto): any {
    const teams = query.teams && query.teams.split(',');
    const date = query.date;
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
