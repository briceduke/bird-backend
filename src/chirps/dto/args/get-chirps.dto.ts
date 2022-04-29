import { IsMongoId, IsNotEmpty } from 'class-validator';

export class GetChirpsDto {
	@IsNotEmpty()
	@IsMongoId()
	readonly _id: string[];
}
