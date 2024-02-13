import { compare } from 'bcrypt'
import 'reflect-metadata'
import { inject, injectable } from 'tsyringe'
import { IUserRepository } from '../../modules/users/repositories/IUserRepository'
import { generateToken } from '../generateToken'
import IAuthenticate from './interfaces/IAuthenticate'

@injectable()
class EmailPasswordAuthenticate implements IAuthenticate {
	constructor(
		@inject('UserRepository')
		private userRepository: IUserRepository,
	) {}

	async login(email: string, password: string): Promise<string> {
		try {
			if (!email || !password)
				throw new Error('Email e senha são obrigatórios.')

			const user = await this.userRepository.findByEmail(email)

			if (!user) throw new Error('Usuário não encontrado.')

			const passwordMatched = await compare(password, user.password)

			if (!passwordMatched) throw new Error('Email ou senha incorretos.')

			const token = generateToken(user.email, user._id)

			return token
		} catch (error) {
			console.log(
				`[EmailPasswordAuthenticate] -> [login] -> ${error.message || error}`,
			)
			throw new Error(error)
		}
	}
}

export { EmailPasswordAuthenticate }
//
