import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { User } from 'src/users/models/user.model';
import { UsersService } from 'src/users/users.service';

import { GetChirpDto } from './dto/args/get-chirp.dto';
import { GetChirpsDto } from './dto/args/get-chirps.dto';
import { GetHomeTimelineDto } from './dto/args/get-home-timeline.dto';
import { GetUserTimelineDto } from './dto/args/get-user-timeline.dto';
import { CreateChirpInput } from './dto/input/create-chirp.input';
import { DeleteChirpInput } from './dto/input/delete-chirp.input';
import { Chirp } from './models/chirp.model';
import { ChirpDocument } from './models/chirp.schema';
import { ChirpsRepository } from './repositories/chirps.repository';

@Injectable()
export class ChirpsService {
	constructor(private readonly chirpsRepo: ChirpsRepository, private readonly usersService: UsersService) {}

	private toModel(chirpDoc: ChirpDocument): Chirp {
		return {
			_id: chirpDoc._id.toHexString(),
			userId: chirpDoc.userId,
			userUsername: chirpDoc.userUsername,
			userAvatarUri: chirpDoc.userAvatarUri,
			content: chirpDoc.content,
			likeCount: chirpDoc.likeCount,
			likedUserIds: chirpDoc.likedUserIds,
			postDate: chirpDoc.postDate,
			reChirpCount: chirpDoc.reChirpCount,
			reChirpUserIds: chirpDoc.reChirpUserIds,
			subChirpIds: chirpDoc.subChirpIds,
			isSubChirp: chirpDoc.isSubChirp,
			subChirpCount: chirpDoc.subChirpCount,
		};
	}

	async create(data: CreateChirpInput, userId: string, isMuted: boolean) {
		if (isMuted) throw new UnauthorizedException("you are muted!");

		if (data.subjectChirpId.length > 0) {
			const subjectChirpDoc = await this.chirpsRepo.findOne({
				_id: data.subjectChirpId,
			});

			if (!subjectChirpDoc)
				throw new NotFoundException("subject chirp not found!");
		}

		const user = await this.usersService.get({ _id: userId });

		const chirpDoc = await this.chirpsRepo.create({
			...data,
			userId,
			userUsername: user.username,
			userAvatarUri: user.avatarUri,
			likeCount: 0,
			likedUserIds: [],
			postDate: new Date(Date.now()),
			reChirpCount: 0,
			reChirpUserIds: [],
			subChirpCount: 0,
			subChirpIds: [],
			isDeleted: false,
			isSubChirp: data.subjectChirpId.length > 0 ? true : false,
		});

		if (data.subjectChirpId.length > 0) {
			await this.chirpsRepo.findOneAndUpdate(
				{ _id: data.subjectChirpId },
				{
					$push: {
						subChirpIds: chirpDoc._id,
					},
					$inc: {
						subChirpCount: 1,
					},
				}
			);
		}

		return this.toModel(chirpDoc);
	}

	async delete(data: DeleteChirpInput, userId: string) {
		const chirpDoc = await this.chirpsRepo.findOneAndUpdate(
			{ _id: data._id, userId },
			{
				$set: {
					isDeleted: true,
				},
			}
		);

		if (chirpDoc.isSubChirp) {
			const subjectChirpDoc = await this.chirpsRepo.findOneAndUpdate(
				{ subChirpIds: chirpDoc._id },
				{
					$pull: {
						subChirpIds: chirpDoc._id,
					},
					$inc: {
						subChirpCount: -1,
					},
				}
			);

			if (!subjectChirpDoc)
				throw new NotFoundException("subject chirp not found!");
		}

		if (!chirpDoc) throw new NotFoundException();

		return true;
	}

	async like(data: GetChirpDto, user: User) {
		if (user.isMuted) throw new UnauthorizedException("you are muted!");

		const chirpDoc = await this.chirpsRepo.findOne(data);

		if (!chirpDoc) throw new NotFoundException();

		if (chirpDoc.likedUserIds.includes(user._id)) {
			await this.chirpsRepo.findOneAndUpdate(data, {
				$push: {
					likedUserIds: user._id,
				},
				$inc: {
					likeCount: 1,
				},
			});
		} else {
			await this.chirpsRepo.findOneAndUpdate(
				{ _id: data._id, userId: user._id },
				{
					$pull: {
						likedUserIds: user._id,
					},
					$inc: {
						likeCount: -1,
					},
				}
			);
		}

		return this.toModel(chirpDoc);
	}

	async getChirp(getChirpDto: GetChirpDto): Promise<Chirp> {
		const chirpDoc = await this.chirpsRepo.findOne(getChirpDto);

		if (!chirpDoc) throw new NotFoundException();

		return this.toModel(chirpDoc);
	}

	async getSubChirps(getChirpDto: GetChirpDto): Promise<Chirp[]> {
		const chirpDoc = await this.getChirp(getChirpDto);

		const subChirpDocs = await this.getChirpsById({ _id: chirpDoc.subChirpIds });

		return subChirpDocs;
	}

	async getChirpsById(getChirpsDto: GetChirpsDto): Promise<Chirp[]> {
		const chirpDocs = await this.chirpsRepo.find(getChirpsDto);

		if (!chirpDocs) throw new NotFoundException();

		return chirpDocs.map(doc => this.toModel(doc));
	}

	async getUserTimeline(userDto: GetUserTimelineDto): Promise<Chirp[]> {
		const chirpDocs = await this.chirpsRepo.findAndPaginate({ userId: userDto.userId }, userDto.skip, userDto.limit);

		if (!chirpDocs) throw new BadRequestException();

		return chirpDocs.map(doc => this.toModel(doc));
	}

	async getHomeTimeline(getHomeTimelineDto: GetHomeTimelineDto, user: User): Promise<Chirp[]> {
		const limitPerUser = Math.floor(getHomeTimelineDto.limit / user.followingCount);
		const skipPerUser = Math.floor(getHomeTimelineDto.skip / user.followingCount);

		let chirps: Chirp[] = [];

		for (const userId of user.followingIds) {
			const userChirps = await this.getUserTimeline({ userId, limit: limitPerUser, skip: skipPerUser });

			chirps.concat(userChirps);
		}

		return chirps.sort((a, b) => b.postDate.getTime() - a.postDate.getTime());
	}
}
