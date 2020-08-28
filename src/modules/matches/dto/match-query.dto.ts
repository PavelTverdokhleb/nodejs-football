import { IsString, IsDateString, IsOptional } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

/**
 * DTO for match queries.
 */
export class MatchQueryDto {
  /**
   * Names of the teams to search by.
   */
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  teams: string;

  /**
   * Date of the match to search by.
   */
  @ApiPropertyOptional()
  @IsOptional()
  @IsDateString()
  date: Date;
}
