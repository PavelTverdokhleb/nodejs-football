import { ITeam } from '..';

export const toTeam = (team: ITeam) => ({
  id: team.id,
  name: team.name,
});
