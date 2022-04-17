import { NotFoundException } from '@nestjs/common';
import { FilterQuery, Model, Types, UpdateQuery } from 'mongoose';

import { AbstractDocument } from './abstract.schema';

export abstract class AbstractRepository<TDocument extends AbstractDocument> {
	constructor(protected readonly model: Model<TDocument>) {}

	async create(doc: Omit<TDocument, "_id">): Promise<TDocument> {
		const created = new this.model({
			...doc,
			_id: new Types.ObjectId(),
		});

		return (await (await created.save()).toJSON()) as unknown as TDocument;
	}

	async findOne(query: FilterQuery<TDocument>): Promise<TDocument> {
		const doc = await this.model.findOne(query, {}, { lean: true });

		return doc;
	}

	async findOneAndUpdate(
		query: FilterQuery<TDocument>,
		update: UpdateQuery<TDocument>
	): Promise<TDocument> {
		const doc = await this.model.findOneAndUpdate(query, update, {
			lean: true,
			new: true,
		});

		if (!doc) throw new NotFoundException();

		return doc;
	}

	async find(query: FilterQuery<TDocument>): Promise<TDocument[]> {
		return this.model.find(query, {}, { lean: true });
	}
}
