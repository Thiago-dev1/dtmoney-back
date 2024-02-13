import 'reflect-metadata'
import { container, inject, injectable } from 'tsyringe'
import { IUserRepository } from '../../modules/users/repositories/IUserRepository'
import { generateToken } from '../generateToken'
import IAuthenticate from './interfaces/IAuthenticate'

import { CreateUserUseCase } from '../../modules/users/useCase/createUser/CreateUserUseCase'

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

		const createUserUseCase = container.resolve(CreateUserUseCase)

		user = await createUserUseCase.execute({
			email,
			name: email.split('@')[0],
			typeLogin: 'google',
		})

		const token = generateToken(user.email, user._id)

		return token
	}
}

export { GoogleAuthenticate }
//
