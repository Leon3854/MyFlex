import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	NotFoundException,
	Param,
	Post,
	Put,
	Query,
	UsePipes,
	ValidationPipe,
} from '@nestjs/common'
import { ActorService } from './actor.service'
import { Auth } from 'src/auth/decorators/auth.decorator'
import { CreateActorDto } from './dto/create-actor.dto'
import { IdValidationPipe } from 'src/pipes/id.validation.pipe'

@Controller('actors')
export class ActorController {
	constructor(private readonly actorService: ActorService) {}
	//
	@Get('by-slug/:slug')
	async bySlug(@Param('slug') slug: string) {
		return this.actorService.bySlug(slug)
	}
	//

	//
	@Get()
	async getAll(@Query('searchTerm') searchTerm?: string) {
		return this.actorService.getAll(searchTerm)
	}
	//
	//
	//

	//
	@Get(':id')
	@Auth('admin')
	async get(@Param('id', IdValidationPipe) id: string) {
		return this.actorService.byId(id)
	}

	// Create the genre
	@UsePipes(new ValidationPipe())
	@Post()
	@HttpCode(200)
	@Auth('admin')
	async create() {
		return this.actorService.create()
	}

	// We are update genre
	@UsePipes(new ValidationPipe())
	@Put(':id')
	@HttpCode(200)
	@Auth('admin')
	async update(
		@Param('id', ValidationPipe) id: string,
		@Body() dto: CreateActorDto,
	) {
		const updateGenre = await this.actorService.update(id, dto)
		if (!updateGenre)
			throw new NotFoundException('Genre was be not update. Please try again!')
		return updateGenre
	}

	// We are doing delete genre
	@Delete(':id')
	@Auth('admin')
	async delete(@Param('id', IdValidationPipe) id: string) {
		const deleteDoc = await this.actorService.delete(id)
		if (!deleteDoc) throw new NotFoundException('Genre was be not found!')

		return deleteDoc
	}
}
