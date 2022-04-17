import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory, Reflector } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';

import { AppModule } from './app.module';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	app.useGlobalPipes(new ValidationPipe());
	app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
	app.use(cookieParser());

	const configService = app.get(ConfigService);
	const port = configService.get<number>("PORT");

	await app.listen(port);
}
bootstrap();
