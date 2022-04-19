import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractDocument } from 'src/database/abstract.schema';

@Schema({ versionKey: false })
export class UserDocument extends AbstractDocument {
	@Prop()
	username: string;

	@Prop()
	password: string;

	@Prop()
	followersId: string[];

	@Prop()
	followersCount: number;

	@Prop()
	followingIds: string[];

	@Prop()
	followingCount: number;

	@Prop()
	isVerified: boolean;

	@Prop()
	isBanned: boolean;

	@Prop()
	isMuted: boolean;

	@Prop({ required: false })
	bio?: string;

	@Prop({ required: false })
	website?: string;

	@Prop({ required: false })
	birth?: Date;

	@Prop()
	joinDate: Date;

	@Prop({ required: false })
	location?: string;

	@Prop({ required: false })
	displayName?: string;

	@Prop({ required: false })
	avatarUri?: string;

	@Prop()
	chirpsCount: number;
}

export const UserSchema = SchemaFactory.createForClass(UserDocument);
