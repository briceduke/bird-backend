import { Body, Controller, Get, Post, Put, Query, UseGuards } from '@nestjs/common';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

import { GetUserByUsernameDto } from './dto/args/get-user-username.dto';
import { GetUserDto } from './dto/args/get-user.dto';
import { GetUsersDto } from './dto/args/get-users.dto';
import { CreateUserInput } from './dto/input/create-user.input';
import { FollowUserInput } from './dto/input/follow-user.input';
import { UpdateUserInput } from './dto/input/update-user.input';
import { User } from './models/user.model';
import { UsersService } from './users.service';

@Controller("users")
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	@UseGuards(JwtAuthGuard)
	@Get()
	async getUser(@Query() getUserDto: GetUserDto): Promise<User> {
		return this.usersService.get(getUserDto);
	}

	@UseGuards(JwtAuthGuard)
	@Get("/me")
	async getMe(@CurrentUser() user: User): Promise<User> {
		return this.usersService.get({ _id: user._id });
	}

	@UseGuards(JwtAuthGuard)
	@Get("username")
	async getUserByUsername(
		@Query() getUserByUsername: GetUserByUsernameDto
	): Promise<User> {
		return this.usersService.get(getUserByUsername);
	}

	@UseGuards(JwtAuthGuard)
	@Get("many")
	async getUsers(@Query() getUsersDto: GetUsersDto): Promise<User[]> {
		return this.usersService.getMany(getUsersDto);
	}

	@Post()
	async createUser(@Body() createUserDto: CreateUserInput): Promise<User> {
		return this.usersService.create(createUserDto);
	}

	@UseGuards(JwtAuthGuard)
	@Put()
	async updateUser(
		@Body() updateUserDto: UpdateUserInput,
		@CurrentUser() user: User
	): Promise<User> {
		return this.usersService.update(updateUserDto, user._id);
	}

	@UseGuards(JwtAuthGuard)
	@Put("follow")
	async followUser(
		@Body() followUserDto: FollowUserInput,
		@CurrentUser() user: User
	): Promise<User> {
		return this.usersService.follow(followUserDto, user._id);
	}

	@UseGuards(JwtAuthGuard)
	@Put("unfollow")
	async unfollowUser(
		@Body() unfollowUserDto: FollowUserInput,
		@CurrentUser() user: User
	): Promise<User> {
		return this.usersService.unfollow(unfollowUserDto, user._id);
	}
}
