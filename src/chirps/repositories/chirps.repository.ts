import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AbstractRepository } from 'src/database/abstract.repository';

import { Chirp } from '../models/chirp.model';
import { ChirpDocument } from '../models/chirp.schema';

@Injectable()
export class ChirpsRepository extends AbstractRepository<ChirpDocument> {
	constructor(@InjectModel(Chirp.name) chirpModel: Model<ChirpDocument>) {
		super(chirpModel);
	}
}
