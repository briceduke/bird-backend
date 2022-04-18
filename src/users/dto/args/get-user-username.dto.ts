import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class GetUserByUsernameDto {
	@IsNotEmpty()
	@IsString()
	@MinLength(3)
	@MaxLength(15)
	readonly username: string;
}
