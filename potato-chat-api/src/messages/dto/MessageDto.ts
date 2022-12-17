import { ApiProperty } from '@nestjs/swagger'

export class MessageDto {
	@ApiProperty()
	id: string
	@ApiProperty()
	readonly author: string
	@ApiProperty()
	readonly date: Date
	@ApiProperty()
	readonly text: string
}