import { IsString, IsOptional } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

/**
 * DTO for team queries.
 */
export class TeamQueryDto {
  /**
   * Team name to search by.
   */
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  team: string;
}
