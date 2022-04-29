import { Types } from 'mongoose';

import { AbstractModel } from 'src/common/abstract.model';

export class Invite extends AbstractModel {
	readonly inviteCode: string;

	readonly active: boolean;

	readonly createdBy: string;

	readonly createdOn: Date;

	readonly usedOn: Date;
}
