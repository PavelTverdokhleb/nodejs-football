import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

/**
 * DTO for team response.
 */
export class TeamResponseDto {
    /**
     * Id of the team.
     */
    @ApiProperty({ description: 'Id of the team.' })
    @IsNotEmpty()
    @IsString()
    id: string;

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
