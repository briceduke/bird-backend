import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AbstractRepository } from 'src/database/abstract.repository';
import { Invite } from '../models/invite.model';
import { InviteDocument } from '../models/invite.schema';


@Injectable()
export class InvitesRepository extends AbstractRepository<InviteDocument> {
	constructor(@InjectModel(Invite.name) inviteModel: Model<InviteDocument>) {
		super(inviteModel);
	}
}
