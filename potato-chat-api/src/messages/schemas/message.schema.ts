import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type MessageDocument = HydratedDocument<Message>;

@Schema()
export class Message {
	@Prop()
	id: string;

	@Prop()
	author: string;

	@Prop()
	date: Date;

	@Prop()
	text: string;
}

export const MessageSchema = SchemaFactory.createForClass(Message)