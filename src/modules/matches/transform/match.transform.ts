import { IMatch } from '../interfaces/match.interface';

export const toMatch = (match: IMatch) => ({
  id: match.id,
  homeTeam: match.homeTeam,
  awayTeam: match.awayTeam,
  date: match.date,
  homeTeamGoals: match.homeTeamGoals,
  awayTeamGoals: match.awayTeamGoals,
});
