import { AbstractModel } from 'src/common/abstract.model';

export class User extends AbstractModel {
	readonly username: string;

	readonly password: string;

	readonly followersId: string[];

	readonly followingIds: string[];

	readonly isVerified: boolean;

	readonly isBanned: boolean;

	readonly isMuted: boolean;

	readonly bio?: string;

	readonly website?: string;

	readonly birth?: Date;

	readonly joinDate: Date;

	readonly location?: string;

	readonly displayName?: string;

	readonly avatarUri?: string;
}
