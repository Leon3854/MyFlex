import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectModel } from 'nestjs-typegoose'
import { GenreModel } from './genre.model'
import { ModelType, DocumentType } from '@typegoose/typegoose/lib/types'
import { CreateGenreDto } from './dto/create-genre.dto'
import { MovieService } from 'src/movie/movie.service'
import { ICollection } from './interface/genre.interface'

@Injectable()
export class GenreService {
	constructor(
		@InjectModel(GenreModel) private readonly genreModel: ModelType<GenreModel>,
		private readonly movieService: MovieService,
	) {}

	// Get all the genre in the data base
	async getAll(searchTerm?: string): Promise<DocumentType<GenreModel>[]> {
		//
		let options = {}

		if (searchTerm) {
			options = {
				$or: [
					{ name: new RegExp(searchTerm, 'i') },
					{ slug: new RegExp(searchTerm, 'i') },
					{ description: new RegExp(searchTerm, 'i') },
				],
			}
		}
		return this.genreModel
			.find(options)
			.select('-updatedAt -__v')
			.sort({ createdAt: 'desc' })
			.exec()
	}

	//
	async bySlug(slug: string): Promise<DocumentType<GenreModel>> {
		return this.genreModel.findOne({ slug }).exec()
	}
	//
	async getPopular(): Promise<DocumentType<GenreModel>[]> {
		return this.genreModel
			.find()
			.select('updatedAt - __v')
			.sort({ createdAt: 'desc' })
			.exec()
	}
	//
	//get Collections
	async getCollections(): Promise<ICollection[]> {
		const genres = await this.getAll()

		const collections = await Promise.all(
			genres.map(async (genre) => {
				const moviesByGenre = await this.movieService.byGenres([genre._id])

				const result: ICollection = {
					_id: String(genre._id),
					title: genre.name,
					slug: genre.slug,
					image: moviesByGenre[0].bigPoster || ' ',
				}

				return result
			}),
		)

		return collections
	}
	//
	//
	//
	// Admin place
	//We are the found on the data for the (_id)
	async byId(id: string): Promise<DocumentType<GenreModel>> {
		return this.genreModel.findById(id).exec()
	}
	// async byId(_id: string): Promise<DocumentType<GenreModel>> {

	// 	const genre = await this.genreModel.findById(_id)

	// 	if (!genre) throw new NotFoundException('Genre was be not found!')

	// 	return genre
	// }
	// Create the genre on the id
	async create() {
		const defaultValue: CreateGenreDto = {
			name: '',
			slug: '',
			description: '',
			icon: '',
		}
		const genre = await this.genreModel.create(defaultValue)
		return genre._id
	}
	// Update the genre on the id
	async update(id: string, dto: CreateGenreDto) {
		return this.genreModel.findByIdAndUpdate(id, dto, { new: true }).exec()
	}
	// Delete the genre on the id
	async delete(id: string) {
		return this.genreModel.findByIdAndDelete(id).exec()
	}
}
