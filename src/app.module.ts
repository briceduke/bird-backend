import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';

import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/users.module';

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			validationSchema: Joi.object({
				MONGO_URI: Joi.number().required(),
				PORT: Joi.number().required(),
				JWT_SECRET: Joi.string().required(),
				JWT_EXP: Joi.string().required(),
			}),
		}),
		DatabaseModule,
		UsersModule,
	],
	providers: [],
})
export class AppModule {}
