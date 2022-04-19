import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';

export class FollowUserInput {
	@IsNotEmpty()
	@IsString()
	@IsMongoId()
	readonly _id: string;
}
