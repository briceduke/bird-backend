import { IsArray, IsNotEmpty } from 'class-validator';

export class GetUsersDto {
	@IsNotEmpty()
	@IsArray()
	readonly _id: string[];
}
