import { IsMongoId, IsNotEmpty } from 'class-validator';

export class GetChirpDto {
	@IsNotEmpty()
	@IsMongoId()
	readonly _id: string;
}
