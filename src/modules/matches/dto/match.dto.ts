import { IsNotEmpty, IsString, IsObject, IsNumber } from 'class-validator';
import { Team } from '../../teams';

export class MatchDto {
  @IsNotEmpty()
  @IsObject()
  homeTeam: Team;

  @IsNotEmpty()
  @IsObject()
  awayTeam: Team;

  @IsNotEmpty()
  @IsString()
  date: string;

  @IsNotEmpty()
  @IsNumber()
  homeTeamGoals: number;

  @IsNotEmpty()
  @IsNumber()
  awayTeamGoals: number;
}

export class CreateMatchDto {
  @IsNotEmpty()
  @IsString()
  homeTeam: string;

  @IsNotEmpty()
  @IsString()
  awayTeam: string;

  @IsNotEmpty()
  @IsString()
  date: string;

  @IsNotEmpty()
  @IsNumber()
  homeTeamGoals: number;

  @IsNotEmpty()
  @IsNumber()
  awayTeamGoals: number;
}