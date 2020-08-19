import * as mongoose from 'mongoose';

/**
 * Team schema definition.
 */
const TeamBase = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
});

export const TeamSchema = {
  name: 'Team',
  schema: TeamBase,
};
