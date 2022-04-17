import { IsDate, IsOptional, IsString, IsUrl, MaxLength, MinLength } from 'class-validator';

export class UpdateUserInput {
	@IsOptional()
	@IsString()
	@MinLength(3)
	@MaxLength(30)
	readonly displayName?: string;

	@IsOptional()
	@IsString()
	@MinLength(3)
	@MaxLength(30)
	readonly bio?: string;

	@IsOptional()
	@IsUrl()
	readonly website?: string;

	@IsOptional()
	@IsDate()
	readonly birth?: Date;

	@IsOptional()
	@IsString()
	@MinLength(3)
	@MaxLength(10)
	readonly location?: string;

	@IsOptional()
	readonly avatarUri?: string;
}
