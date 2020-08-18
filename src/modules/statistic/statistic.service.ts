import { Injectable } from '@nestjs/common';
import { IMatch } from '../matches/interfaces/match.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IStatistic } from './interfaces/statistic.interface';

@Injectable()
export class StatisticService {
  constructor(
    @InjectModel('Match') private readonly matchModel: Model<IMatch>,
  ) {}

  public async getStatistic(): Promise<IStatistic[]> {
    const matches = await this.matchModel.find().exec();
    let statistic = [];
    matches.forEach(m => {
      this.parseTeamStat(
        statistic,
        m.homeTeam,
        m.homeTeamGoals,
        m.awayTeamGoals,
      );
      this.parseTeamStat(
        statistic,
        m.awayTeam,
        m.awayTeamGoals,
        m.homeTeamGoals,
      );
    });
    return statistic
      .sort((a, b) => b.points - a.points)
      .map((s, idx) => ({ ...s, position: idx + 1 }));
  }

  public async getTeamStatistic(team: string): Promise<IStatistic> {
    const matches = await this.matchModel
      .find({ $or: [{ homeTeam: team }, { awayTeam: team }] })
      .exec();
    let statistic: IStatistic = {
      team,
      points: 0,
      win: 0,
      draw: 0,
      lose: 0,
      goalsScored: 0,
      goalsConceded: 0,
    };
    matches.forEach(m => {
      if (m.homeTeam === team) {
        const { points, win, draw, lose } = StatisticService.calculatePoints(
          m.homeTeamGoals,
          m.awayTeamGoals,
        );
        statistic = {
          team,
          points: statistic.points + points,
          win: statistic.win + win,
          draw: statistic.draw + draw,
          lose: statistic.lose + lose,
          goalsScored: statistic.goalsScored + m.homeTeamGoals,
          goalsConceded: statistic.goalsConceded + m.awayTeamGoals,
        };
      } else if (m.awayTeam === team) {
        const { points, win, draw, lose } = StatisticService.calculatePoints(
          m.awayTeamGoals,
          m.homeTeamGoals,
        );
        statistic = {
          team,
          points: statistic.points + points,
          win: statistic.win + win,
          draw: statistic.draw + draw,
          lose: statistic.lose + lose,
          goalsScored: statistic.goalsScored + m.awayTeamGoals,
          goalsConceded: statistic.goalsConceded + m.homeTeamGoals,
        };
      }
    });
    return statistic;
  }

  private parseTeamStat(
    arr: IStatistic[],
    team: string,
    gS: number,
    gC: number,
  ): void {
    const teamIndex = arr.findIndex(t => t.team === team);
    const { points, win, draw, lose } = StatisticService.calculatePoints(
      gS,
      gC,
    );
    if (teamIndex !== -1) {
      arr[teamIndex] = {
        ...arr[teamIndex],
        points: arr[teamIndex].points + points,
        win: arr[teamIndex].win + win,
        draw: arr[teamIndex].draw + draw,
        lose: arr[teamIndex].lose + lose,
        goalsScored: arr[teamIndex].goalsScored + gS,
        goalsConceded: arr[teamIndex].goalsConceded + gC,
      };
    } else {
      arr.push({
        team,
        points,
        win,
        draw,
        lose,
        goalsScored: gS,
        goalsConceded: gC,
      });
    }
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
