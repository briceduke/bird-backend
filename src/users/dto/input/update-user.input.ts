import { IsDateString, IsNotEmpty, IsOptional, IsString, IsUrl, MaxLength, MinLength } from 'class-validator';

export class UpdateUserInput {
	@IsNotEmpty()
	@IsString()
	readonly _id: string;

	@IsOptional()
	@IsString()
	@MinLength(4)
	@MaxLength(50)
	readonly displayName?: string;

	@IsOptional()
	@IsString()
	@MinLength(3)
	@MaxLength(160)
	readonly bio?: string;

	@IsOptional()
	@IsUrl()
	readonly website?: string;

	@IsOptional()
	@IsDateString()
	readonly birth?: Date;

	@IsOptional()
	@IsString()
	@MinLength(3)
	@MaxLength(30)
	readonly location?: string;

	@IsOptional()
	@IsUrl()
	readonly avatarUri?: string;
}
