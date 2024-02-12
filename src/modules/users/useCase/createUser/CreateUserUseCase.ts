import { hash } from 'bcrypt'
import 'reflect-metadata'

import { inject, injectable } from 'tsyringe'
import IUser from '../../../../models/interfaces/IUser'
import { IUserRepository } from '../../../../modules/users/repositories/IUserRepository'
import { CreateUserValidation } from '../../utils/validations/createUser'

interface IRequest extends IUser {
	confirmpassword?: string
}

@injectable()
class CreateUserUseCase {
	constructor(
		@inject('CreateUserValidation')
		private createUserValidation: CreateUserValidation,
		@inject('UserRepository') // nesse caso está mapeado no container shared com o nome 'UserRepository'
		private userRepository: IUserRepository,
	) {}

	async execute({
		email,
		name,
		typeLogin,
		password,
		picture,
		confirmpassword,
	}: IRequest) {
		try {
			await this.createUserValidation.validateUserCreation({
				email,
				password,
				confirmpassword,
				typeLogin,
			})

			let hashPassword = password || ''
			if (typeLogin === 'email') hashPassword = await hash(password, 8)

			const user = await this.userRepository.create({
				email,
				name,
				typeLogin,
				password: hashPassword,
				picture,
			})
			return user
		} catch (error) {
			console.log(`[CreateUserUseCase] -> [execute] -> ${error.message}`)
			throw new Error(error)
		}
	}
}

export { CreateUserUseCase }
//
