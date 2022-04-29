import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from 'src/users/users.module';

import { ChirpsController } from './chirps.controller';
import { ChirpsService } from './chirps.service';
import { Chirp } from './models/chirp.model';
import { ChirpSchema } from './models/chirp.schema';
import { ChirpsRepository } from './repositories/chirps.repository';

@Module({
	imports: [
		MongooseModule.forFeature([{ name: Chirp.name, schema: ChirpSchema }]),
		UsersModule
	],
	controllers: [ChirpsController],
	providers: [ChirpsService, ChirpsRepository],
})
export class ChirpsModule {}
