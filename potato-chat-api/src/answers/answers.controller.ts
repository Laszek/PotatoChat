import { Controller, Get, Req } from '@nestjs/common'
import { Answer, AnswersService } from './answers.service'
import { Request } from 'express'
import { AnswerDto } from './dto/AnswerDto'
import { ApiOperation, ApiParam, ApiProperty, ApiResponse, ApiTags } from '@nestjs/swagger'
import { MessageDto } from '../messages/dto/MessageDto'

@Controller('/answers')
@ApiTags('answers')
export class AnswersController {
	constructor(private readonly answersService: AnswersService) {
	}

	@Get()
	@ApiOperation({ summary: 'List all questions and answers from database' })
	@ApiResponse({ status: 201, description: 'Asked question', type: MessageDto })
	async getAllQuestionsAndAnswers(): Promise<Answer[]> {
		return this.answersService.getAll();
	}


	@Get(':qText')
	@ApiOperation({ summary: 'Get answer by question text' })
	@ApiParam({ name: 'qText', type: 'string' })
	@ApiResponse({ status: 200, description: 'Get Answer by question text', type: AnswerDto })
	getByQuestionText(@Req() request: Request): AnswerDto {
		const answers = this.answersService.getAnswerByQuestionText(request.params.qText);
		return {
			answer: answers[0]
		};
	}
}
