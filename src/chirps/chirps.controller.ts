import { Body, Controller, Delete, Patch, Post, UseGuards } from '@nestjs/common';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { User } from 'src/users/models/user.model';

import { ChirpsService } from './chirps.service';
import { GetChirpDto } from './dto/args/get-chirp.dto';
import { CreateChirpInput } from './dto/input/create-chirp.input';
import { DeleteChirpInput } from './dto/input/delete-chirp.input';
import { Chirp } from './models/chirp.model';

@Controller("chirps")
@UseGuards(JwtAuthGuard)
export class ChirpsController {
	constructor(private readonly chirpsService: ChirpsService) {}

	@Post()
	async createChirp(
		@Body() createChirpDto: CreateChirpInput,
		@CurrentUser() user: User
	): Promise<Chirp> {
		return this.chirpsService.create(createChirpDto, user._id, user.isMuted);
	}

	@Delete()
	async deleteChirp(
		@Body() deleteChirpDto: DeleteChirpInput,
		@CurrentUser() user: User
	): Promise<boolean> {
		return this.chirpsService.delete(deleteChirpDto, user._id);
	}

	@Patch()
	async likeChirp(
		@Body() likeChirpDto: GetChirpDto,
		@CurrentUser() user: User
	): Promise<Chirp> {
		return this.chirpsService.like(likeChirpDto, user);
	}
}
