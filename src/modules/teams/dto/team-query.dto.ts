import { IsString, IsOptional } from 'class-validator';

export class TeamQueryDto {
    @IsOptional()
    @IsString()
    team: string;
}
