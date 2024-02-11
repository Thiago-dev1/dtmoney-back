import { Request, Response, Router } from 'express'

import { container } from 'tsyringe'
import { verifyGoogleToken } from '../middlewares/verifyGoogleToken'
import { AuthenticateUserUseCase } from '../modules/users/useCase/authenticateUser/authenticateUserUseCase'
import { GoogleAuthenticate } from '../services/authenticate/GoogleAuthenticate'

const authRoutes = Router()

authRoutes.post(
	'/google',
	verifyGoogleToken,
	(request: Request, response: Response): void => {
		loginGoogle(request, response)
	},
)

async function loginGoogle(
	request: Request,
	response: Response,
): Promise<void> {
	const { email } = request.userGoogle

	try {
		const googleAuthenticate = container.resolve(GoogleAuthenticate)
		const authenticateUserUseCase = new AuthenticateUserUseCase(
			googleAuthenticate,
		)

		const token = await authenticateUserUseCase.execute(email, '')

		response.status(201).json({ token, user: { email } })
	} catch (error) {
		console.error(`[authRoutes] -> [post] -> [google] -> ${error}`)
	}
}

export { authRoutes }
//
