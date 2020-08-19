import { Injectable, NotFoundException } from '@nestjs/common';
import { IMatch } from '../matches/interfaces/match.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IStatistic } from './interfaces/statistic.interface';
import { ITeam, TeamsService } from '../teams';
import { StatisticDto } from './dto/statistic.dto';

@Injectable()
export class StatisticService {
  constructor(
    private teamsService: TeamsService,
    @InjectModel('Match') private readonly matchModel: Model<IMatch>,
    @InjectModel('Team') private readonly teamModel: Model<ITeam>,
  ) {}

  public async getStatistic(): Promise<IStatistic[]> {
    const teams = await this.teamModel.find().exec();
    const matches = await this.matchModel.find().exec();
    const statistic = teams.map(t => {
      return this.calculateTeamStatistic(t, matches);
    });
    return statistic
      .sort((a, b) => b.points - a.points)
      .map((s, idx) => ({ ...s, position: idx + 1 }));
  }

  public async getTeamStatistic(id: string): Promise<IStatistic> {
    const team = await this.teamsService.findTeam(id);
    const matches = await this.matchModel.find().exec();
    return this.calculateTeamStatistic(team, matches);
  }

  private calculateTeamStatistic(team: ITeam, matches: IMatch[]): IStatistic {
    let teamStat = new StatisticDto({
      team: {
        id: team.id,
        name: team.name,
      },
    });
    matches.forEach(m => {
      if (team.id === m.homeTeam.id) {
        teamStat = this.getTeamPoints(
          teamStat,
          m.homeTeamGoals,
          m.awayTeamGoals,
        );
      } else if (team.id === m.awayTeam.id) {
        teamStat = this.getTeamPoints(
          teamStat,
          m.awayTeamGoals,
          m.homeTeamGoals,
        );
      }
    });
    return teamStat;
  }

  private getTeamPoints(
    stat: IStatistic,
    homeGoals: number,
    awayGoals: number,
  ): IStatistic {
    const { points, win, draw, lose } = StatisticService.calculatePoints(
      homeGoals,
      awayGoals,
    );
    return {
      ...stat,
      points: stat.points + points,
      win: stat.win + win,
      draw: stat.draw + draw,
      lose: stat.lose + lose,
      goalsScored: stat.goalsScored + homeGoals,
      goalsConceded: stat.goalsConceded + awayGoals,
    };
  }

  private static calculatePoints(
    homeGoals: number,
    awayGoals: number,
  ): Pick<IStatistic, 'points' | 'win' | 'draw' | 'lose'> {
    if (homeGoals > awayGoals) {
      return { points: 3, win: 1, draw: 0, lose: 0 };
    } else if (homeGoals < awayGoals) {
      return { points: 0, win: 0, draw: 0, lose: 1 };
    } else {
      return { points: 1, win: 0, draw: 1, lose: 0 };
    }
  }
}
