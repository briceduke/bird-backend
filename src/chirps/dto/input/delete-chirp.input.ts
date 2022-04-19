import { IsMongoId, IsNotEmpty } from 'class-validator';

export class DeleteChirpInput {
	@IsNotEmpty()
	@IsMongoId()
	readonly _id: string;
}
