import { IsNumber, IsString } from 'class-validator'

export class SetRatingDto {
	@IsString({ message: 'Movie Id is invalid' })
	movieId: string

	@IsNumber()
	value: number
}
