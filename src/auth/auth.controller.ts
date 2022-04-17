import { Controller, Get, Post, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { User } from 'src/users/models/user.model';

import { AuthService } from './auth.service';
import { CurrentUser } from './decorators/current-user.decorator';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller("auth")
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@UseGuards(LocalAuthGuard)
	@Post("login")
	async login(
		@Res({ passthrough: true }) res: Response,
		@CurrentUser() user: User
	) {
		await this.authService.login(user, res);

		res.send(user);
	}

	@UseGuards(JwtAuthGuard)
	@Get()
	isAuth() {
		return true;
	}

	@UseGuards(JwtAuthGuard)
	@Post("logout")
	logout(@Res({ passthrough: true }) res: Response) {
		this.authService.logout(res);

		res.json({});
	}
}
