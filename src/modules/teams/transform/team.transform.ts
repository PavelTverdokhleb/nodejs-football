import { ITeam } from '..';

/**
 * Transform DB team entity.
 */
export const toTeam = (team: ITeam) => ({
  id: team.id,
  name: team.name,
});
