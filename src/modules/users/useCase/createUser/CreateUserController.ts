import { container } from 'tsyringe'

import { Request, Response } from 'express'
import { CreateUserUseCase } from './CreateUserUseCase'

class CreateUserController {
	async handle(request: Request, response: Response): Promise<Response> {
		try {
			const { email, name, password, picture, confirmpassword } =
				request.body

			console.log(`[CreateUserController] -> [handle] -> criar ${email}`)

			const createUserUseCase = container.resolve(CreateUserUseCase)

			const user = await createUserUseCase.execute({
				email,
				name,
				typeLogin: 'email',
				password,
				picture,
				confirmpassword,
			})

			console.log(`[CreateUserController] -> [handle] -> ${user.email}`)

			return response.status(201)
		} catch (error) {
			console.log(`[CreateUserController] -> [handle] -> ${error}`)

			return response
				.status(400)
				.json({ message: error.message || 'Unexpected error.' })
		}
	}
}

export { CreateUserController }
//
