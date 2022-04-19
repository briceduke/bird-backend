import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractDocument } from 'src/database/abstract.schema';

@Schema({ versionKey: false })
export class ChirpDocument extends AbstractDocument {
	@Prop()
	readonly content: string;

	@Prop()
	readonly subChirpIds: string[];

	@Prop()
	readonly likeCount: number;

	@Prop()
	readonly likedUserIds: string[];

	@Prop()
	readonly reChirpCount: number;

	@Prop()
	readonly reChirpUserIds: string[];

	@Prop()
	readonly postDate: Date;
}

export const ChirpSchema = SchemaFactory.createForClass(ChirpDocument);
