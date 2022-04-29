import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { InvitesController } from './invites.controller';
import { InvitesService } from './invites.service';
import { Invite } from './models/invite.model';
import { InviteSchema } from './models/invite.schema';
import { InvitesRepository } from './repositories/invites.repository';

@Module({
	imports: [
		MongooseModule.forFeature([{ name: Invite.name, schema: InviteSchema }]),
	],
	controllers: [InvitesController],
	providers: [InvitesService, InvitesRepository],
	exports: [InvitesService]
})
export class InvitesModule {}
