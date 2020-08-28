import { IStatistic } from '..';
import { Team } from '../../teams';
import { ApiProperty } from '@nestjs/swagger';
import { TeamResponseDto } from '../../teams/dto/team-response.dto';

/**
 * Default statistic object.
 */
export const defaultStatisticArgs: IStatistic = {
  team: {
    name: '',
    division: '',
  },
  points: 0,
  win: 0,
  draw: 0,
  lose: 0,
  goalsScored: 0,
  goalsConceded: 0,
  matchesCount: 0,
};

export class StatisticDto {
  @ApiProperty({ description: 'Team data', type: TeamResponseDto })
  public team: Team;

  @ApiProperty({ description: 'Season points' })
  public points: number;

  @ApiProperty({ description: 'Season wins' })
  public win: number;

  @ApiProperty({ description: 'Season draws' })
  public draw: number;

  @ApiProperty({ description: 'Season loses' })
  public lose: number;

  @ApiProperty({ description: 'Total goals conceded' })
  public goalsConceded: number;

  @ApiProperty({ description: 'Total goals scored' })
  public goalsScored: number;

  @ApiProperty({ description: 'Total season matches' })
  public matchesCount: number;

  public constructor(args) {
    const data = { ...defaultStatisticArgs, ...args };
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        this[key] = data[key];
      }
    }
  }
}
