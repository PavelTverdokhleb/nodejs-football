import * as mongoose from 'mongoose';

/**
 * Team interface definition.
 */
export interface ITeam extends mongoose.Document {
  /**
   * Id of the team.
   */
  id: string;

  /**
   * Name of the team.
   */
  name: string;
}

export type Team = Pick<ITeam, 'id' | 'name'>;
