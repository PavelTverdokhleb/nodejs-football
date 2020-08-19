import * as mongoose from 'mongoose';

export const TeamSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true, unique: true },
});

export interface ITeam extends mongoose.Document {
  id: string;
  name: string;
}

export type Team = Pick<ITeam, 'id' | 'name'>;
