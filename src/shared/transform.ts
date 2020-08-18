import { ITeam } from '../modules/teams/interfaces/team.interface';
import { IMatch } from '../modules/matches/interfaces/match.interface';
import { IStatistic } from '../modules/statistic/interfaces/statistic.interface';

export const toTeam = (team: ITeam) => ({
  name: team.name,
});

export const toStatistic = (stat: IStatistic) => ({
  team: stat.team,
  points: stat.points,
  win: stat.win,
  draw: stat.draw,
  lose: stat.lose,
  goalsScored: stat.goalsScored,
  goalsConceded: stat.goalsConceded,
});

export const toMatch = (match: IMatch) => ({
  id: match.id,
  homeTeam: match.homeTeam,
  awayTeam: match.awayTeam,
  date: match.date,
  homeTeamGoals: match.homeTeamGoals,
  awayTeamGoals: match.awayTeamGoals,
});
