import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

/**
 * DTO for team entity.
 */
export class TeamDto {
  /**
   * Name of the team.
   */
  @ApiProperty({ description: 'Name of the team.' })
  @IsNotEmpty()
  @IsString()
  name: string;

  /**
   * Division where team play.
   */
  @ApiProperty({ description: 'Division where team play.' })
  @IsNotEmpty()
  @IsString()
  division: string;
}
