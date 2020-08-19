import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

/**
 * DTO for match entity.
 */
export class MatchDto {
  /**
   * Id of the home team.
   */
  @IsNotEmpty()
  @IsString()
  homeTeam: string;

  /**
   * Id of the away team.
   */
  @IsNotEmpty()
  @IsString()
  awayTeam: string;

  /**
   * Date of the match.
   */
  @IsNotEmpty()
  @IsString()
  date: string;

  /**
   * Goals scored by home team.
   */
  @IsNotEmpty()
  @IsNumber()
  homeTeamGoals: number;

  /**
   * Goals scored by away team.
   */
  @IsNotEmpty()
  @IsNumber()
  awayTeamGoals: number;
}
