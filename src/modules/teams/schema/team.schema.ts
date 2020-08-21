import * as mongoose from 'mongoose';

/**
 * Team schema definition.
 */
const TeamBase = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  division: { type: String, required: true },
});

export const TeamSchema = {
  name: 'Team',
  schema: TeamBase,
};
