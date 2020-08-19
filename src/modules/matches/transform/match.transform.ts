import { IMatch } from '../interfaces/match.interface';
import { toTeam } from '../../teams/transform/team.transform';

export const toMatch = (match: IMatch) => ({
  id: match.id,
  homeTeam: match.homeTeamData?.toObject({ transform: toTeam }),
  awayTeam: match.awayTeamData?.toObject({ transform: toTeam }),
  date: match.date,
  homeTeamGoals: match.homeTeamGoals,
  awayTeamGoals: match.awayTeamGoals,
});
