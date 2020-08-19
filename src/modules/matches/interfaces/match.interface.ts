import * as mongoose from 'mongoose';
import { ITeam } from '../../teams';

const MatchBase = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true },
    homeTeam: { type: String, required: true },
    awayTeam: { type: String, required: true },
    date: { type: String, required: true },
    homeTeamGoals: { type: Number, required: true },
    awayTeamGoals: { type: Number, required: true },
  },
  { toObject: { virtuals: true } },
);

MatchBase.virtual('homeTeamData', {
  ref: 'Team',
  localField: 'homeTeam',
  foreignField: 'id',
  justOne: true,
});

MatchBase.virtual('awayTeamData', {
  ref: 'Team',
  localField: 'awayTeam',
  foreignField: 'id',
  justOne: true,
});

MatchBase.pre('init', function() {
  this.populate('homeTeamData');
  this.populate('awayTeamData');
});

MatchBase.pre('save', function() {
  this.populate('homeTeamData');
  this.populate('awayTeamData');
});

MatchBase.pre('find', function() {
  this.populate('homeTeamData');
  this.populate('awayTeamData');
});

MatchBase.pre('findOne', function() {
  this.populate('homeTeamData');
  this.populate('awayTeamData');
});

MatchBase.pre('findOneAndUpdate', function() {
  this.populate('homeTeamData');
  this.populate('awayTeamData');
});

export const MatchSchema = MatchBase;

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
