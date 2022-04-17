import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';

export class GetUserDto {
	@IsNotEmpty()
	@IsString()
	@IsMongoId()
	readonly _id: string;
}
