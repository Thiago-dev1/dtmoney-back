import { container } from 'tsyringe'

import IUser from '../../../../models/interfaces/IUser'
import { CreateUserUseCase } from './CreateUserUseCase'

class CreateUserController {
	async handle({
		email,
		name,
		typeLogin,
		password,
		picture,
	}: IUser): Promise<IUser> {
		try {
			const createUserUseCase = container.resolve(CreateUserUseCase)

			const user = await createUserUseCase.execute({
				email,
				name,
				typeLogin,
				password,
				picture,
			})
			return user
		} catch (error) {
			console.log(`[CreateUserController] -> [handle] -> ${error}`)

			throw new Error(error)
		}
	}
}

export { CreateUserController }
//
