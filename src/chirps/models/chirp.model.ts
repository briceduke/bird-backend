import { AbstractModel } from 'src/common/abstract.model';

export class Chirp extends AbstractModel {
	readonly userId: string;

	readonly userUsername: string;

	readonly userAvatarUri: string;

	readonly content: string;

	readonly subChirpCount: number;

	readonly subChirpIds: string[];

	readonly likeCount: number;

	readonly likedUserIds: string[];

	readonly reChirpCount: number;

	readonly reChirpUserIds: string[];

	readonly postDate: Date;

	readonly isSubChirp: boolean;
}
