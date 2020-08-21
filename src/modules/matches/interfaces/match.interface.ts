import * as mongoose from 'mongoose';
import { ITeam } from '../../teams';

/**
 * Match interface definition.
 */
export interface IMatch extends mongoose.Document {
  /**
   * Id of the home team.
   */
  homeTeam: string;

  /**
   * Id of the away team.
   */
  awayTeam: string;

  /**
   * Date of the match.
   */
  date: string;

  /**
   * Goals scored by home team.
   */
  homeTeamGoals: number;

  /**
   * Goals scored by away team.
   */
  awayTeamGoals: number;

  /**
   * Team entity gets from db based on @homeTeam key.
   */
  homeTeamData: ITeam;

  /**
   * Team entity gets from db based on @awayTeam key.
   */
  awayTeamData: ITeam;
}
