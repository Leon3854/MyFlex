import { Module } from '@nestjs/common'
import { MovieService } from './movie.service'
import { MovieController } from './movie.controller'
import { TypegooseModule } from 'nestjs-typegoose'
import { MovieModel } from './movie.model'
import { UserModule } from 'src/user/user.module'
import { TelegramModule } from 'src/telegram/telegram.module'

@Module({
	controllers: [MovieController],
	imports: [
		TypegooseModule.forFeature([
			{
				typegooseClass: MovieModel,
				schemaOptions: {
					collection: 'Movie',
				},
			},
		]),
		TelegramModule,
		UserModule,
	],
	providers: [MovieService],
	exports: [MovieService],
})
export class MovieModule {}
