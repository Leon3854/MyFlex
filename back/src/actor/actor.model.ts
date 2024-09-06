import { prop } from '@typegoose/typegoose'
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses'

export interface ActorModel extends Base {}

export class ActorModel extends TimeStamps {
	find(options: {}) {
		throw new Error('Method not implemented.')
	}
	@prop()
	name: string

	@prop({ unique: true })
	slug: string

	@prop()
	photo: string
}
