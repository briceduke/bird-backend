import { IsMongoId, IsNotEmpty, IsNumber, Max, Min } from 'class-validator';

export class GetHomeTimelineDto {
    @IsNotEmpty()
    @IsNumber()
    @Min(0)
    readonly skip: number;

    @IsNotEmpty()
    @IsNumber()
    @Min(0)
    @Max(20)
    readonly limit: number;
}
