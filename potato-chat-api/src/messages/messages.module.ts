import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { Message, MessageSchema } from './schemas/message.schema'
import { MessagesService } from './messages.service'
import { MessagesController } from './messages.controller'
import { MessageWebsocketGateway } from './messages.gateway'
import { AnswersService } from '../answers/answers.service'

@Module({
	imports: [MongooseModule.forFeature([{ name: Message.name, schema: MessageSchema }])],
	controllers: [MessagesController],
	providers: [MessagesService, MessageWebsocketGateway, AnswersService],
})
export class MessagesModule {}