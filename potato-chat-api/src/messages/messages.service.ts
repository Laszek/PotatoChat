import { Message, MessageDocument } from './schemas/message.schema'
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose'
import { CreateMessageDto } from './dto/CreateMessageDto'
import { Guid } from 'guid-typescript'

@Injectable()
export class MessagesService {
	constructor(@InjectModel(Message.name) private MessageModel: Model<MessageDocument>) {}

	 async create(createMessageDto: CreateMessageDto, author: 'Anonymous' | 'PotatoChat'): Promise<Message> {
		const messageModel = {
			id: Guid.create().toString(),
			author: author,
			date: new Date(),
			text: createMessageDto.content,
		}
		const createdMessage = new this.MessageModel(messageModel);
		return createdMessage.save();
	}

	async findAll(): Promise<Message[]> {
		return this.MessageModel.find().exec();
	}

	async findOne(id: string): Promise<Message> {
		return this.MessageModel.findOne({ id }).exec();
	}
}
