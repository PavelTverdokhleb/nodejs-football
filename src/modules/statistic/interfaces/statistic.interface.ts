import { Team } from '../../teams';

export interface IStatistic {
  team: Team;
  points: number;
  win: number;
  draw: number;
  lose: number;
  goalsConceded: number;
  goalsScored: number;
  position?: number;
}
