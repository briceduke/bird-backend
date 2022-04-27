import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { GetUserByUsernameDto } from './dto/args/get-user-username.dto';
import { GetUserDto } from './dto/args/get-user.dto';
import { GetUsersDto } from './dto/args/get-users.dto';
import { CreateUserInput } from './dto/input/create-user.input';
import { FollowUserInput } from './dto/input/follow-user.input';
import { UpdateUserInput } from './dto/input/update-user.input';
import { User } from './models/user.model';
import { UserDocument } from './models/user.schema';
import { UsersRepository } from './repositories/users.repository';

@Injectable()
export class UsersService {
	constructor(private readonly usersRepo: UsersRepository) {}

	private toModel(userDoc: UserDocument): User {
		return {
			_id: userDoc._id.toHexString(),
			username: userDoc.username,
			followersCount: userDoc.followersCount,
			followersId: userDoc.followersId,
			followingCount: userDoc.followingCount,
			followingIds: userDoc.followingIds,
			isVerified: userDoc.isVerified,
			isBanned: userDoc.isBanned,
			isMuted: userDoc.isMuted,
			joinDate: userDoc.joinDate,
			displayName: userDoc.displayName,
			bio: userDoc.bio,
			website: userDoc.website,
			avatarUri: userDoc.avatarUri,
			birth: userDoc.birth,
			location: userDoc.location,
			chirpsCount: userDoc.chirpsCount,
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
			followersCount: 0,
			followersId: [],
			followingCount: 0,
			followingIds: [],
			isMuted: false,
			isBanned: false,
			isVerified: false,
			joinDate: new Date(Date.now()),
			password: await bcrypt.hash(data.password, 13),
			chirpsCount: 0,
		});

		return this.toModel(userDoc);
	}

	async update(data: UpdateUserInput, userId: string): Promise<User> {
		const userDoc = await this.usersRepo.findOneAndUpdate(
			{ _id: userId },
			data
		);

		if (!userDoc) throw new NotFoundException();

		return this.toModel(userDoc);
	}

	async follow(data: FollowUserInput, userId: string): Promise<User> {
		const targetCandidate = await this.usersRepo.findOne({ _id: data._id });

		if (
			!targetCandidate ||
			targetCandidate.followersId.includes(userId) ||
			targetCandidate._id.toHexString() === userId
		)
			throw new BadRequestException();

		const targetDoc = await this.usersRepo.findOneAndUpdate(
			{ _id: data._id },
			{
				$push: {
					followersId: userId,
				},
				$inc: {
					followersCount: 1,
				},
			}
		);

		const userDoc = await this.usersRepo.findOneAndUpdate(
			{ _id: userId },
			{
				$push: {
					followingIds: targetDoc._id,
				},
				$inc: {
					followingCount: 1,
				},
			}
		);

		return this.toModel(userDoc);
	}

	async unfollow(data: FollowUserInput, userId: string): Promise<User> {
		const targetCandidate = await this.usersRepo.findOne({ _id: data._id });

		if (
			!targetCandidate ||
			!targetCandidate.followersId.includes(userId) ||
			targetCandidate._id.toHexString() === userId
		)
			throw new BadRequestException();

		const targetDoc = await this.usersRepo.findOneAndUpdate(
			{ _id: data._id },
			{
				$pull: {
					followersId: userId,
				},
				$inc: {
					followersCount: -1,
				},
			}
		);

		const userDoc = await this.usersRepo.findOneAndUpdate(
			{ _id: userId },
			{
				$pull: {
					followingIds: targetDoc._id,
				},
				$inc: {
					followingCount: -1,
				},
			}
		);

		return this.toModel(userDoc);
	}

	async get(dto: GetUserDto | GetUserByUsernameDto): Promise<User> {
		const userDoc = await this.usersRepo.findOne(dto);

		if (!userDoc) throw new NotFoundException();

		return this.toModel(userDoc);
	}

	async getMany(dto: GetUsersDto): Promise<User[]> {
		const userDocs = await this.usersRepo.find(dto);

		return userDocs.map((doc) => this.toModel(doc));
	}
}
