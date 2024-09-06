import { Injectable, NotFoundException, Req } from '@nestjs/common'
import { InjectModel } from 'nestjs-typegoose'
import { UserModel } from './user.model'
import { ModelType } from '@typegoose/typegoose/lib/types'
import { UpdateUserDto } from './dto/update-user.dto'
import { genSalt, hash } from 'bcryptjs'
import { Types } from 'mongoose'
import { path } from 'app-root-path'

@Injectable()
export class UserService {
	//
	constructor(
		@InjectModel(UserModel) private readonly userModel: ModelType<UserModel>,
	) {}
	//
	async byId(_id: string) {
		const user = await this.userModel.findById(_id)

		if (!user) throw new NotFoundException('User was not found')

		//
		return user
	}

	//

	async updateProfile(_id: string, dto: UpdateUserDto) {
		const user = await this.byId(_id)
		const isSameUser = await this.userModel.findOne({ email: dto.email })

		if (isSameUser && String(_id) !== String(isSameUser._id))
			throw new NotFoundException('Email is busy')

		if (dto.password) {
			const salt = await genSalt(10)
			user.password = await hash(dto.password, salt)
		}

		user.email = dto.email
		if (dto.isAdmin || dto.isAdmin === false) user.isAdmin = dto.isAdmin

		await user.save()
		return
	}
	// We are count all users
	async getCount() {
		return await this.userModel.find().count().exec()
	}
	// We get All users
	async getAll(searchTerm?: string) {
		//
		let options = {}
		//
		if (searchTerm) {
			options = {
				$or: [
					{
						email: new RegExp(searchTerm, 'i'),
					},
				],
			}
		}
		return this.userModel
			.find(options)
			.select('-password -updatedAt -__v')
			.sort({ createdAt: 'desc' })
			.exec()
	}
	// We are delete unique user on the his id
	async delete(id: string) {
		return await this.userModel.findByIdAndDelete(id).exec()
	}

	//
	async toggleFavorite(movieId: Types.ObjectId, user: UserModel) {
		const { _id, favorites } = user

		await this.userModel.findByIdAndUpdate(_id, {
			favorites: favorites.includes(movieId)
				? favorites.filter((id) => String(id) !== String(movieId))
				: [...favorites, movieId],
		})
	}

	//
	async getFavoriteMovies(_id: Types.ObjectId) {
		return this.userModel
			.findById(_id, 'favorites')
			.populate({
				path: 'favorites',
				populate: {
					path: 'genres',
				},
			})
			.exec()
			.then((data) => data.favorites)
	}
}
