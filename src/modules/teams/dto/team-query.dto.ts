import { IsString, IsOptional } from 'class-validator';

/**
 * DTO for team queries.
 */
export class TeamQueryDto {
    /**
     * Team name to search by.
     */
    @IsOptional()
    @IsString()
    team: string;
}
