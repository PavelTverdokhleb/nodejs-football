import * as mongoose from 'mongoose';

export const MatchSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  homeTeam: { type: String, required: true },
  awayTeam: { type: String, required: true },
  date: { type: String, required: true },
  homeTeamGoals: { type: Number, required: true },
  awayTeamGoals: { type: Number, required: true },
});

export interface IMatch extends mongoose.Document {
  id: string;
  homeTeam: string;
  awayTeam: string;
  date: string;
  homeTeamGoals: number;
  awayTeamGoals: number;
}
