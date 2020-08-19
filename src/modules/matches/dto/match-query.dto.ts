import { IsString, IsOptional } from 'class-validator';

/**
 * DTO for match queries.
 */
export class MatchQueryDto {
  /**
   * Ids of the teams to search by.
   */
  @IsOptional()
  @IsString()
  teams: string;

  /**
   * Date of the match to search by.
   */
  @IsOptional()
  @IsString()
  date: string;
}
