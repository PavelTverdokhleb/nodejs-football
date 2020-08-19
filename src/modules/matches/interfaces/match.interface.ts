import * as mongoose from 'mongoose';
import { Team } from '../../teams';

export const MatchSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  homeTeam: {
    id: { type: String, required: true },
    name: { type: String, required: true },
  },
  awayTeam: {
    id: { type: String, required: true },
    name: { type: String, required: true },
  },
  date: { type: String, required: true },
  homeTeamGoals: { type: Number, required: true },
  awayTeamGoals: { type: Number, required: true },
});

export interface IMatch extends mongoose.Document {
  id: string;
  homeTeam: Team;
  awayTeam: Team;
  date: string;
  homeTeamGoals: number;
  awayTeamGoals: number;
}
