import * as mongoose from 'mongoose';

export interface ITeam extends mongoose.Document {
  id: string;
  name: string;
}

export type Team = Pick<ITeam, 'id' | 'name'>;
