import { Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { User } from "src/users/models/user.model";
import { v4 } from "uuid";
import { Types } from 'mongoose';
import { Invite } from "./models/invite.model";
import { InvitesRepository } from "./repositories/invites.repository";
import { InviteDocument } from "./models/invite.schema";

@Injectable()
export class InvitesService {
    constructor(private readonly invitesRepo: InvitesRepository) {}

    private toModel(inviteDoc: InviteDocument): Invite {
        return {
            _id: inviteDoc._id.toHexString(),
            inviteCode: inviteDoc.inviteCode,
            active: inviteDoc.active,
            createdBy: inviteDoc.createdBy.toHexString(),
            createdOn: inviteDoc.createdOn,
            usedOn: inviteDoc.usedOn,
        }
    }

    async createInvite(user: User): Promise<Invite> {
        if (!user.isAdmin) throw new UnauthorizedException();

        const inviteCode = v4().slice(0, 8);

        const inviteDoc = await this.invitesRepo.create({
            inviteCode,
            active: true,
            createdBy: new Types.ObjectId(user._id),
            createdOn: new Date(Date.now()),
            usedOn: null,
        });

        return this.toModel(inviteDoc);
    }

    async useInvite(inviteCode: string): Promise<Invite> {
        const inviteDoc = await this.invitesRepo.findOneAndUpdate({ inviteCode, active: true }, {
            active: false,
            usedOn: new Date(Date.now())
        });

        if (!inviteDoc) throw new UnauthorizedException();

        return this.toModel(inviteDoc);
    }
}