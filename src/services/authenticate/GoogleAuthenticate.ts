import { inject, injectable } from 'tsyringe'
import { IUserRepository } from '../../modules/users/repositories/IUserRepository'
import { CreateUserController } from '../../modules/users/useCase/createUser/CreateUserController'
import { generateToken } from '../generateToken'
import IAuthenticate from './interfaces/IAuthenticate'

const createUserController = new CreateUserController()

@injectable()
class GoogleAuthenticate implements IAuthenticate {
	constructor(
		@inject('UserRepository')
		private userRepository: IUserRepository,
	) {}

	async login(email: string): Promise<string> {
		let user = await this.userRepository.findByEmail(email)

		if (user) {
			const token = generateToken(user.email, user._id)
			return token
		}

		user = await createUserController.handle({
			email,
			name: email,
			typeLogin: 'google',
			password: '',
			picture: '',
		})

		const token = generateToken(user.email, user._id)

		return token
	}
}

export { GoogleAuthenticate }
//
