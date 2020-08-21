import { Team } from '../../teams';

/**
 * Statistic interface definition.
 */
export interface IStatistic {
  /**
   * Team entity.
   */
  team: Team;

  /**
   * Count of team points based on matches.
   */
  points: number;

  /**
   * Count of wins for team in matches.
   */
  win: number;

  /**
   * Count of draw for team in matches.
   */
  draw: number;

  /**
   * Count of lose for team in matches.
   */
  lose: number;

  /**
   * Goals conceded by team in matches.
   */
  goalsConceded: number;

  /**
   * Goals scored by team in matches.
   */
  goalsScored: number;

  /**
   * Total matches played by team.
   */
  matchesCount: number;

  /**
   * Position in championship table based on points and goals difference.
   */
  position?: number;
}
