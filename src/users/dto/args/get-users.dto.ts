import { Transform } from 'class-transformer';
import { IsArray, IsMongoId, IsNotEmpty } from 'class-validator';

export class GetUsersDto {
	@IsNotEmpty()
	@IsArray()
	@IsMongoId({ each: true })
	@Transform(({ value }) => value.split(","))
	readonly _id: string[];
}
