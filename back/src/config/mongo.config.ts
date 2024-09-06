import { ConfigService } from '@nestjs/config'
import { TypegooseModuleOptions } from 'nestjs-typegoose'

const options = {}

export const getMongoDBConfig = async (
	configService: ConfigService,
): Promise<TypegooseModuleOptions> => ({
	uri: configService.get('MONGO_URI'),
	...options,
})
