import { IsNotEmpty, IsString, IsDateString, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

/**
 * DTO for match response.
 */
export class MatchResponseDto {
  /**
   * Id of the match.
   */
  @ApiProperty({ description: 'Id of the match.' })
  @IsNotEmpty()
  @IsString()
  id: string;

  /**
   * Name of the home team.
   */
  @ApiProperty({ description: 'Name of the home team.' })
  @IsNotEmpty()
  @IsString()
  homeTeam: string;

  /**
   * Name of the away team.
   */
  @ApiProperty({ description: 'Name of the away team.' })
  @IsNotEmpty()
  @IsString()
  awayTeam: string;

  /**
   * Date of the match.
   */
  @ApiProperty({ description: 'Date of the match.' })
  @IsNotEmpty()
  @IsDateString()
  date: string;

  /**
   * Goals scored by home team.
   */
  @ApiProperty({ description: 'Goals scored by home team.' })
  @IsNotEmpty()
  @IsNumber()
  homeTeamGoals: number;

  /**
   * Goals scored by away team.
   */
  @ApiProperty({ description: 'Goals scored by away team.' })
  @IsNotEmpty()
  @IsNumber()
  awayTeamGoals: number;
}
