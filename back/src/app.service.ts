import { Injectable } from '@nestjs/common'

@Injectable()
export class AppService {
	getHello() {
		return { text: 'Hello World! It is Me! Again!!)' }
	}
}
