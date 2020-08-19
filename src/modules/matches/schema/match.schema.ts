import * as mongoose from 'mongoose';

/**
 * Match schema definition.
 */
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

/**
 * Populate home team entity by id.
 */
MatchBase.virtual('homeTeamData', {
  ref: 'Team',
  localField: 'homeTeam',
  foreignField: 'id',
  justOne: true,
});

/**
 * Populate away team entity by id.
 */
MatchBase.virtual('awayTeamData', {
  ref: 'Team',
  localField: 'awayTeam',
  foreignField: 'id',
  justOne: true,
});

/**
 * Define populate fields on methods.
 */
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

export const MatchSchema = {
  name: 'Match',
  schema: MatchBase,
};
