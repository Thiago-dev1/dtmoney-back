import { hash } from 'bcrypt'
import 'reflect-metadata'
import { inject, injectable } from 'tsyringe'
import IUser from '../../../../models/interfaces/IUser'
import { IUserRepository } from '../../../../modules/users/repositories/IUserRepository'

interface IRequest extends IUser {
	confirmpassword?: string
}

@injectable()
class CreateUserUseCase {
	constructor(
		@inject('UserRepository')
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
			if (typeLogin === 'email' && password !== confirmpassword)
				throw new Error('Senhas não conferem')

			const userAlreadyExists =
				await this.userRepository.findByEmail(email)

			if (typeLogin != 'email' && userAlreadyExists)
				return userAlreadyExists

			if (typeLogin === 'email' && userAlreadyExists)
				throw new Error('Usuário já existe')

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
