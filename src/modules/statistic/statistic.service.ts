import { Injectable } from '@nestjs/common';
import { IMatch } from '../matches/interfaces/match.interface';
import { IStatistic } from './interfaces/statistic.interface';
import { ITeam, TeamsService } from '../teams';
import { MatchesService } from '../matches';
import { StatisticDto } from './dto/statistic.dto';
import { Utils } from '../../utils';
import { MatchQueryDto } from '../matches/dto/match-query.dto';
import {MATCH} from "../../constants";

@Injectable()
export class StatisticService {
  constructor(
    private teamsService: TeamsService,
    private matchesService: MatchesService,
  ) {}

  /**
   * Get teams statistic.
   */
  public async getStatistic(): Promise<IStatistic[]> {
    const teams = await this.teamsService.getTeams();
    const matches = await this.matchesService.getMatches();
    const statistic = teams.map(t => {
      return this.calculateTeamStatistic(t, matches);
    });
    return statistic
      .sort(this.sortByPointsAndGoals)
      .map((s, idx) => ({ ...s, position: idx + 1 }));
  }

  /**
   * Get team statistic.
   */
  public async getTeamStatistic(id: string): Promise<IStatistic> {
    const team = await this.teamsService.findTeam('_id', id);
    const matches = await this.matchesService.getMatches({
      teams: team.name,
    } as MatchQueryDto);
    return this.calculateTeamStatistic(team, matches);
  }

  /**
   * Calculate team statistic based on matches
   * @team team entity;
   * @matches array of matches;
   */
  private calculateTeamStatistic(team: ITeam, matches: IMatch[]): IStatistic {
    let teamStat = new StatisticDto({
      team: {
        id: team.id,
        name: team.name,
      },
    });
    matches.forEach(m => {
      teamStat = Utils.checkAndSwap(
        [team.name === m.homeTeam, team.name === m.awayTeam],
        teamStat,
        this.getTeamPoints,
        m.homeTeamGoals,
        m.awayTeamGoals,
      );
    });
    return teamStat;
  }

  /**
   * Sort teams by points and goals difference.
   * @a team statistic;
   * @b team statistic;
   */
  private sortByPointsAndGoals(a: IStatistic, b: IStatistic): number {
    const aGoalsDiff = a.goalsScored - a.goalsConceded;
    const bGoalsDiff = b.goalsScored - b.goalsConceded;
    return b.points - a.points || bGoalsDiff - aGoalsDiff;
  }

  /**
   * Update team statistic based on match.
   * @stat team statistic;
   * @homeGoals goals scored by home team;
   * @awayGoals goals scored by away team;
   */
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
      matchesCount: stat.matchesCount + 1,
    };
  }

  /**
   * Calculate team points and match result.
   * @homeGoals goals scored by home team;
   * @awayGoals goals scored by away team;
   */
  private static calculatePoints(
    homeGoals: number,
    awayGoals: number,
  ): Pick<IStatistic, 'points' | 'win' | 'draw' | 'lose'> {
    if (homeGoals > awayGoals) {
      return { points: MATCH.WIN_POINTS, win: 1, draw: 0, lose: 0 };
    } else if (homeGoals < awayGoals) {
      return { points: MATCH.LOSE_POINTS, win: 0, draw: 0, lose: 1 };
    } else {
      return { points: MATCH.DRAW_POINTS, win: 0, draw: 1, lose: 0 };
    }
  }
}
