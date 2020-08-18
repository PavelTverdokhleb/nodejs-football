import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class MatchDto {
    @IsNotEmpty()
    @IsString()
    id: string;

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
