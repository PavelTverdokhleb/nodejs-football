import { IsNotEmpty, IsString } from 'class-validator';

export class TeamDto {
    @IsNotEmpty()
    @IsString()
    name: string;
}
