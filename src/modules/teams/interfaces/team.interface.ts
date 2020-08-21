import * as mongoose from 'mongoose';

/**
 * Team interface definition.
 */
export interface ITeam extends mongoose.Document {
  /**
   * Name of the team.
   */
  name: string;

  /**
   * Division of the team.
   */
  division: string;
}

export type Team = Pick<ITeam, 'name' | 'division'>;
