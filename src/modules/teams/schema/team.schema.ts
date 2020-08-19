import * as mongoose from 'mongoose';

const TeamBase = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
});

export const TeamSchema = {
  name: 'Team',
  schema: TeamBase,
};
