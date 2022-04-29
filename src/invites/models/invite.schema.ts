import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes, Types } from 'mongoose';
import { AbstractDocument } from 'src/database/abstract.schema';

@Schema({ versionKey: false })
export class InviteDocument extends AbstractDocument {
	@Prop()
	readonly inviteCode: string;

	@Prop()
	readonly active: boolean;

	@Prop({ type: SchemaTypes.ObjectId })
	readonly createdBy: Types.ObjectId;

	@Prop()
	readonly createdOn: Date;

	@Prop()
	readonly usedOn: Date;
}

export const InviteSchema = SchemaFactory.createForClass(InviteDocument);
