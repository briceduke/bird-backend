import { IsMongoId, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateChirpInput {
	@IsNotEmpty()
	@IsString()
	@MinLength(1)
	@MaxLength(280)
	readonly content: string;

	@IsOptional()
	@IsMongoId()
	readonly subjectChirpId: string;
}
