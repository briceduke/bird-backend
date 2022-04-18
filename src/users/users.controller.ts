import { Body, Controller, Get, Post, Put } from '@nestjs/common';

import { GetUserByUsernameDto } from './dto/args/get-user-username.dto';
import { GetUserDto } from './dto/args/get-user.dto';
import { GetUsersDto } from './dto/args/get-users.dto';
import { CreateUserInput } from './dto/input/create-user.input';
import { UpdateUserInput } from './dto/input/update-user.input';
import { User } from './models/user.model';
import { UsersService } from './users.service';

@Controller("users")
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	@Get()
	async getUser(@Body() getUserDto: GetUserDto): Promise<User> {
		return this.usersService.get(getUserDto);
	}

	@Get("username")
	async getUserByUsername(
		@Body() getUserByUsername: GetUserByUsernameDto
	): Promise<User> {
		return this.usersService.get(getUserByUsername);
	}

	@Get("many")
	async getUsers(@Body() getUsersDto: GetUsersDto): Promise<User[]> {
		return this.usersService.getMany(getUsersDto);
	}

	@Post()
	async createUser(@Body() createUserDto: CreateUserInput): Promise<User> {
		return this.usersService.create(createUserDto);
	}

	@Put()
	async updateUser(@Body() updateUserDto: UpdateUserInput): Promise<User> {
		return this.usersService.update(updateUserDto);
	}
}
