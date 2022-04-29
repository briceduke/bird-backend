import { IsMongoId, IsNotEmpty, IsNumberString, Max, Min } from 'class-validator';

export class GetUserTimelineDto {
	@IsNotEmpty()
	@IsMongoId()
	readonly userId: string;

    @IsNotEmpty()
    @IsNumberString()
    readonly skip: number;

    @IsNotEmpty()
    @IsNumberString()
    readonly limit: number;
}
