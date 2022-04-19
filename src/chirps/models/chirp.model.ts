import { AbstractModel } from 'src/common/abstract.model';

export class Chirp extends AbstractModel {
	readonly content: string;

	readonly subChirpIds: string[];

	readonly likeCount: number;

	readonly likedUserIds: string[];

	readonly reChirpCount: number;

	readonly reChirpUserIds: string[];

	readonly postDate: Date;
}
