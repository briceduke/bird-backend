import { IsNotEmpty, IsNumberString, Max, Min } from 'class-validator';

export class GetHomeTimelineDto {
    @IsNotEmpty()
    @IsNumberString()
    readonly skip: number;

    @IsNotEmpty()
    @IsNumberString()
    readonly limit: number;
}
