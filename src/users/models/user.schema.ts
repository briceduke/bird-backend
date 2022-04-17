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
	followingIds: string[];

	@Prop()
	isVerified: boolean;

	@Prop()
	isBanned: boolean;

	@Prop()
	isMuted: boolean;

	@Prop()
	bio: string;

	@Prop()
	website: string;

	@Prop()
	birth: Date;

	@Prop()
	joinDate: Date;

	@Prop()
	location: string;

	@Prop()
	displayName: string;

	@Prop()
	avatarUri: string;
}

export const UserSchema = SchemaFactory.createForClass(UserDocument);
