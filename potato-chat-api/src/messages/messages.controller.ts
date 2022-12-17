import { Body, Controller, Get, NotFoundException, Post, Req } from '@nestjs/common'
import { MessagesService } from './messages.service'
import { MessageWebsocketGateway } from './messages.gateway'
import { AnswersService } from '../answers/answers.service'
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger'
import { MessageDto } from './dto/MessageDto'
import { CreateMessageDto } from './dto/CreateMessageDto'


@Controller('/messages')
@ApiTags('messages')
export class MessagesController {
	constructor(private readonly messagesService: MessagesService,
	            private readonly messagesGateway: MessageWebsocketGateway,
	            private readonly answersService: AnswersService) {
	}

	@Post()
	@ApiOperation({ summary: 'Send message to the server' })
	@ApiResponse({ status: 201, description: 'Asked question', type: MessageDto })
	async create(@Body() message: CreateMessageDto): Promise<MessageDto> {
		console.log(message)
		const question = await this.messagesService.create(message, 'Anonymous').then((result) => ({
			id: result.id,
			text: result.text,
			date: result.date,
			author: result.author,
		}))
		console.log(question)
		this.messagesGateway.broadcastChatMessage('message', { type: 'QUESTION', id: question.id })
		const answerTexts = this.answersService.getAnswerByQuestionText(message.content)
		const answer = await this.messagesService.create({
			content: answerTexts[0],
		}, 'PotatoChat')
		this.messagesGateway.broadcastChatMessage('answer', { type: 'ANSWER', id: answer.id })
		return question
	}

	@Get()
	@ApiOperation({ summary: 'Chat history' })
	@ApiResponse({ status: 201, description: 'Chat history', type: MessageDto })
	getAll(): Promise<MessageDto[]> {
		return this.messagesService.findAll().then((result) =>
			result.map(message => ({
				id: message.id,
				text: message.text,
				author: message.author,
				date: message.date,
			})))
	}

	@Get(':id')
	@ApiParam({ name: 'id', type: 'string' })
	@ApiOperation({ summary: 'Get message by ID' })
	@ApiResponse({ status: 200, description: 'Get message by ID', type: MessageDto })
	@ApiResponse({ status: 404, description: 'Message not found' })
	async getOne(@Req() req): Promise<MessageDto> {
		const result = await this.messagesService.findOne(req.params.id)
		if(!result) {
			throw new NotFoundException('Message not found')
		}
		return {
			id: result.id,
			text: result.text,
			author: result.author,
			date: result.date,
		}
	}
}
