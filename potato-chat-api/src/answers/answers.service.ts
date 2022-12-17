import { Injectable } from '@nestjs/common';
import answers from './answers'

export interface Answer {
	qId: string
	answers: string[]
	qText: string
}


@Injectable()
export class AnswersService {
	private readonly answers: Answer[]

	constructor() {
		this.answers = answers as Answer[];
	}

	getAll(): Answer[] {
		return answers;
	}

	getAnswerByQuestionText(qText: string): string[] {
		return answers.find(answer => answer.qText === qText)?.answers ?? ['More information in potato chat premium!'];
	}
}
