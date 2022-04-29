import { IsMongoId, IsNotEmpty, IsNumber, Max, Min } from 'class-validator';

export class GetUserTimelineDto {
	@IsNotEmpty()
	@IsMongoId()
	readonly userId: string;

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
