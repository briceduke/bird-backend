import { Exclude } from 'class-transformer';
import { AbstractModel } from 'src/common/abstract.model';

export class User extends AbstractModel {
	readonly username: string;

	@Exclude()
	readonly password: string;

	readonly followersId: string[];

	readonly followingIds: string[];

	readonly isVerified: boolean;

	@Exclude()
	readonly isBanned: boolean;

	@Exclude()
	readonly isMuted: boolean;

	readonly bio?: string;

	readonly website?: string;

	readonly birth?: Date;

	readonly joinDate: Date;

	readonly location?: string;

	readonly displayName?: string;

	readonly avatarUri?: string;
}
