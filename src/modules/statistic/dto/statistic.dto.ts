import { IStatistic } from '..';
import { Team } from '../../teams';

/**
 * Default statistic object.
 */
export const defaultStatisticArgs: IStatistic = {
  team: {
    name: '',
    division: ''
  },
  points: 0,
  win: 0,
  draw: 0,
  lose: 0,
  goalsScored: 0,
  goalsConceded: 0,
  matchesCount: 0
};

export class StatisticDto {
  public team: Team;
  public points: number;
  public win: number;
  public draw: number;
  public lose: number;
  public goalsConceded: number;
  public goalsScored: number;
  public matchesCount: number;

  public constructor(args) {
    const data = { ...defaultStatisticArgs, ...args };
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        this[key] = data[key];
      }
    }
  }
}
