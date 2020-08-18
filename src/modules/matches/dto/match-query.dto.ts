import { IsString, IsOptional } from 'class-validator';

export class MatchQueryDto {
  @IsOptional()
  @IsString()
  teams: string;

  @IsOptional()
  @IsString()
  date: string;
}
