import { Body, Controller, Delete, Get, Post, Query, UseGuards } from '@nestjs/common';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { User } from 'src/users/models/user.model';

import { ChirpsService } from './chirps.service';
import { GetChirpDto } from './dto/args/get-chirp.dto';
import { GetChirpsDto } from './dto/args/get-chirps.dto';
import { GetHomeTimelineDto } from './dto/args/get-home-timeline.dto';
import { GetUserTimelineDto } from './dto/args/get-user-timeline.dto';
import { CreateChirpInput } from './dto/input/create-chirp.input';
import { DeleteChirpInput } from './dto/input/delete-chirp.input';
import { Chirp } from './models/chirp.model';

@Controller("chirps")
@UseGuards(JwtAuthGuard)
export class ChirpsController {
	constructor(private readonly chirpsService: ChirpsService) {}

	@Get()
	async getChirp(@Query() getChirpDto: GetChirpDto): Promise<Chirp> {
		return this.chirpsService.getChirp(getChirpDto);
	}

	@Get("/many")
	async getChirps(@Query() getChirpsDto: GetChirpsDto): Promise<Chirp[]> {
		return this.chirpsService.getChirpsById(getChirpsDto);
	}

	@Get("/replies")
	async getSubChirps(@Query() getChirpDto: GetChirpDto): Promise<Chirp[]> {
		return this.chirpsService.getSubChirps(getChirpDto);
	}

	@Get("/timeline/user")
	async getUserTimeline(
		@Query() getUserTimelineDto: GetUserTimelineDto
	): Promise<Chirp[]> {
		return this.chirpsService.getUserTimeline(getUserTimelineDto);
	}

	@Get("/timeline/home")
	async getHomeTimeline(
		@Query() getHomeTimelineDto: GetHomeTimelineDto,
		@CurrentUser() user: User
	): Promise<Chirp[]> {
		return this.chirpsService.getHomeTimeline(getHomeTimelineDto, user);
	}

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

	@Post("/like")
	async likeChirp(
		@Body() likeChirpDto: GetChirpDto,
		@CurrentUser() user: User
	): Promise<Chirp> {
		return this.chirpsService.like(likeChirpDto, user);
	}
}
