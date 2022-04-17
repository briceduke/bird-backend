import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { GetUserDto } from './dto/args/get-user.dto';
import { GetUsersDto } from './dto/args/get-users.dto';
import { CreateUserInput } from './dto/input/create-user.input';
import { UpdateUserInput } from './dto/input/update-user.input';
import { User } from './models/user.model';
import { UserDocument } from './models/user.schema';
import { UsersRepository } from './repositories/users.repository';

@Injectable()
export class UsersService {
	constructor(private readonly usersRepo: UsersRepository) {}

	private toModel(userDoc: UserDocument): User {
		return {
			...userDoc,
			_id: userDoc._id.toHexString(),
		};
	}

	async validate(username: string, password: string): Promise<User> {
		const user = await this.usersRepo.findOne({ username });

		if (!user) throw new NotFoundException();

		const validPass = await bcrypt.compare(password, user.password);

		if (!validPass) throw new UnauthorizedException();

		return this.toModel(user);
	}

	async create(data: CreateUserInput): Promise<User> {
		const user = await this.usersRepo.findOne({ username: data.username });

		if (user) throw new BadRequestException("username exists!");

		const userDoc = await this.usersRepo.create({
			...data,
			followersId: [],
			followingIds: [],
			isMuted: false,
			isBanned: false,
			isVerified: false,
			joinDate: new Date(Date.now()),
			password: await bcrypt.hash(data.password, 13),
		});

		return this.toModel(userDoc);
	}

	async update(data: UpdateUserInput): Promise<User> {
		const userDoc = await this.usersRepo.findOneAndUpdate(
			{ _id: data._id },
			data
		);

		if (!userDoc) throw new NotFoundException();

		return this.toModel(userDoc);
	}

	async get(dto: GetUserDto): Promise<User> {
		const userDoc = await this.usersRepo.findOne(dto);

		if (!userDoc) throw new NotFoundException();

		return this.toModel(userDoc);
	}

	async getMany(dto: GetUsersDto): Promise<User[]> {
		const userDocs = await this.usersRepo.find(dto);

		return userDocs.map((doc) => this.toModel(doc));
	}
}
