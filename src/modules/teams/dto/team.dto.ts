import { IsNotEmpty, IsString } from 'class-validator';

/**
 * DTO for team entity.
 */
export class TeamDto {
    /**
     * Name of the team.
     */
    @IsNotEmpty()
    @IsString()
    name: string;

    /**
     * Division where team play.
     */
    @IsNotEmpty()
    @IsString()
    division: string;
}
