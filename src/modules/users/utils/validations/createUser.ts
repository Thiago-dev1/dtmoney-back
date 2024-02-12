import 'reflect-metadata'
import { inject, injectable } from 'tsyringe'
import { IUserRepository } from '../../repositories/IUserRepository'

interface IValidationRequest {
	email: string
	password?: string
	confirmpassword?: string
	typeLogin: string
}

@injectable()
class CreateUserValidation {
	constructor(
		@inject('UserRepository')
		private userRepository: IUserRepository,
	) {}

	async validateUserCreation({
		email,
		password,
		confirmpassword,
		typeLogin,
	}: IValidationRequest): Promise<void> {
		if (typeLogin === 'email' && password !== confirmpassword) {
			throw new Error('Senhas não conferem')
		}

		const userAlreadyExists = await this.userRepository.findByEmail(email)

		if (userAlreadyExists) {
			if (typeLogin !== 'email') return

			throw new Error('Usuário já existe')
		}
	}
}

export { CreateUserValidation }
//
