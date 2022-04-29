import { Controller, Post, UseGuards } from "@nestjs/common";
import { CurrentUser } from "src/auth/decorators/current-user.decorator";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { User } from "src/users/models/user.model";
import { InvitesService } from "./invites.service";
import { Invite } from "./models/invite.model";

@Controller('invites')
@UseGuards(JwtAuthGuard)
export class InvitesController {
    constructor(private readonly invitesService: InvitesService) {}
    
    @Post()
    async createInvite(@CurrentUser() user: User): Promise<Invite> {
        return this.invitesService.createInvite(user);
    }
}