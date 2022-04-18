import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';

import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ChirpsModule } from './chirps/chirps.module';

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			validationSchema: Joi.object({
				MONGO_URI: Joi.string().required(),
				PORT: Joi.number().required(),
				JWT_SECRET: Joi.string().required(),
				JWT_EXP: Joi.number().required(),
			}),
		}),
		DatabaseModule,
		UsersModule,
		AuthModule,
		ChirpsModule,
	],
	providers: [],
})
export class AppModule {}
