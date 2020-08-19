import * as mongoose from 'mongoose';
import { ITeam } from '../../teams';

export interface IMatch extends mongoose.Document {
  id: string;
  homeTeam: string;
  awayTeam: string;
  date: string;
  homeTeamGoals: number;
  awayTeamGoals: number;
  homeTeamData: ITeam;
  awayTeamData: ITeam;
}
