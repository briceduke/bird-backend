import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { User } from 'src/users/models/user.model';

import { TokenPayload } from './dto/token-payload.dto';

@Injectable()
export class AuthService {
	constructor(
		private readonly configService: ConfigService,
		private readonly jwtService: JwtService
	) {}

	async login(user: User, res: Response) {
		const payload: TokenPayload = {
			userId: user._id,
		};

		const exp = new Date();

		exp.setSeconds(
			exp.getSeconds() + this.configService.get<number>("JWT_EXP")
		);

		const token = this.jwtService.sign(payload);

		res.cookie("Authentication", token, {
			httpOnly: true,
			expires: exp,
		});
	}

	logout(res: Response) {
		res.cookie("Authentication", "", {
			httpOnly: true,
			expires: new Date(),
		});
	}
}
