import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, FilterQuery } from 'mongoose';
import { AbstractRepository } from 'src/database/abstract.repository';

import { Chirp } from '../models/chirp.model';
import { ChirpDocument } from '../models/chirp.schema';

@Injectable()
export class ChirpsRepository extends AbstractRepository<ChirpDocument> {
	constructor(@InjectModel(Chirp.name) chirpModel: Model<ChirpDocument>) {
		super(chirpModel);
	}

	async findAndPaginate(query: FilterQuery<ChirpDocument>, skip: number, limit: number): Promise<ChirpDocument[]> {
		return this.model.find(query, {}, { lean: true, skip, limit, sort: '-postDate' });
	}
}
