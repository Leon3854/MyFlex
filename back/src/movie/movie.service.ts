import { Injectable } from '@nestjs/common'
import { ModelType, DocumentType } from '@typegoose/typegoose/lib/types'
import { Types } from 'mongoose'
import { InjectModel } from 'nestjs-typegoose'

import { CreateMovieDto } from './dto/create-movie.dto'
import { MovieModel } from './movie.model'

@Injectable()
export class MovieService {
	telegramService: any
	constructor(
		@InjectModel(MovieModel) private readonly movieModel: ModelType<MovieModel>,
	) {}

	async bySlug(slug: string) {
		return await this.movieModel
			.findOne({ slug })
			.populate('genres actors')
			.exec()
	}

	async getAll(searchTerm?: string) {
		let options = {}

		if (searchTerm) {
			options = {
				$or: [
					{
						title: new RegExp(searchTerm, 'i'),
					},
				],
			}
		}

		return this.movieModel
			.find(options)
			.select('-updatedAt -__v')
			.sort({ createdAt: 'desc' })
			.populate('genres actors')
			.exec()
	}

	async byActor(actorId: Types.ObjectId) {
		return await this.movieModel.find({ actors: actorId }).exec()
	}

	async byGenres(
		genreIds: Types.ObjectId[],
	): Promise<DocumentType<MovieModel>[]> {
		return this.movieModel.find({ genres: { $in: genreIds } }).exec()
	}

	async getMostPopular() {
		return this.movieModel
			.find({ countOpened: { $gt: 0 } })
			.sort({ countOpened: -1 })
			.populate('genres')
			.exec()
	}

	async updateCountOpened(slug: string) {
		return this.movieModel
			.findOneAndUpdate({ slug }, { $inc: { countOpened: 1 } }, { new: true })
			.exec()
	}
	//
	async updateRating(id: string, newRating: number) {
		return this.movieModel
			.findByIdAndUpdate(id, { rating: newRating }, { new: true })
			.exec()
	}

	/* Admin area */

	async byId(id: string) {
		return this.movieModel.findById(id).exec()
	}

	async create() {
		const defaultValue: CreateMovieDto = {
			bigPoster: '',
			actors: [],
			genres: [],
			poster: '',
			title: '',
			videoUrl: '',
			slug: '',
		}
		const movie = await this.movieModel.create(defaultValue)
		return movie._id
	}

	async update(_id: string, dto: CreateMovieDto) {
		return this.movieModel.findByIdAndUpdate(_id, dto, { new: true }).exec()
		// if (!dto.isSendTelegram) {
		// 	await this.sendNotifications(dto)
		// 	dto.isSendTelegram = true
		// }
	}

	async delete(id: string) {
		return this.movieModel.findByIdAndDelete(id).exec()
	}

	/* Utilites */
	async sendNotifications(dto: CreateMovieDto) {
		// if (process.env.NODE_ENV !== 'development')
		await this.telegramService.sendPhoto(dto.poster)

		const msg = `<b>${dto.title}</b>\n\n`

		// await this.telegramService.sendMessage(msg, {
		// 	reply_markup: {
		// 		inline_keyboard: [
		// 			[
		// 				{
		// 					url: 'https://okko.tv/movie/free-guy',
		// 					text: '🍿 Go to watch',
		// 				},
		// 			],
		// 		],
		// 	},
		// })
	}
}
