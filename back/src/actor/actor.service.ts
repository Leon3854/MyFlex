import { Injectable, NotFoundException } from '@nestjs/common'
import { ActorModel } from './actor.model'
import { ModelType, DocumentType } from '@typegoose/typegoose/lib/types'
import { InjectModel } from 'nestjs-typegoose'
import { CreateActorDto } from './dto/create-actor.dto'
import { Types } from 'mongoose'

@Injectable()
export class ActorService {
	constructor(
		@InjectModel(ActorModel) private readonly actorModel: ModelType<ActorModel>,
	) {}

	//
	async getAll(searchTerm?: string) {
		//
		let options = {}

		if (searchTerm) {
			options = {
				$or: [
					{ name: new RegExp(searchTerm, 'i') },
					{ slug: new RegExp(searchTerm, 'i') },
				],
			}
		}
		return this.actorModel
			.aggregate()
			.match(options)
			.lookup({
				from: 'Movie',
				foreignField: 'actors',
				localField: '_id',
				as: 'movies',
			})
			.addFields({
				countMovies: {
					$size: '$movies',
				},
			})
			.project({
				__v: 0,
				updatedAt: 0,
				movies: 0,
			})
			.sort({ createdAt: -1 })
			.exec()
	}

	//
	async bySlug(slug: string) {
		const doc = await this.actorModel.findOne({ slug }).exec()
		if (!doc) throw new NotFoundException('Actor wos not found')
		return doc
	}
	//
	//
	//
	// Admin place
	//We are the found on the data for the (_id)
	async byId(_id: string) {
		//
		const actor = await this.actorModel.findById(_id)

		if (!actor) throw new NotFoundException('Actor was be not found!')

		return actor
	}
	// Create the genre on the id
	async create() {
		const defaultValue: CreateActorDto = {
			name: '',
			slug: '',
			photo: '',
		}
		const actor = await this.actorModel.create(defaultValue)
		return actor._id
	}
	// Update the genre on the id
	async update(id: string, dto: CreateActorDto) {
		const updateDoc = this.actorModel
			.findByIdAndUpdate(id, dto, { new: true })
			.exec()
		if (!updateDoc) throw new NotFoundException('Actor not found')
		return updateDoc
	}
	// Delete the genre on the id
	async delete(id: string) {
		const deleteDoc = this.actorModel.findByIdAndDelete(id).exec()
		if (!deleteDoc) throw new NotFoundException('Actor was not found')
		return deleteDoc
	}
}
