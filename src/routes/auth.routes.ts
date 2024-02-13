import { Request, Response, Router } from 'express'

import { container } from 'tsyringe'
import { verifyGoogleToken } from '../middlewares/verifyGoogleToken'
import { AuthenticateUserUseCase } from '../modules/users/useCase/authenticateUser/AuthenticateUserUseCase'
import { EmailPasswordAuthenticate } from '../services/authenticate/EmailPasswordAuthenticate'
import { GoogleAuthenticate } from '../services/authenticate/GoogleAuthenticate'

const authRoutes = Router()

authRoutes.post('/google', verifyGoogleToken, loginGoogle)

authRoutes.post('/email', loginEmailPassword)

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
		console.log(
			`[authRoutes] -> [post] -> [google] -> login realizado com sucesso ${email}`,
		)

		response.status(201).json({ token, user: { email } })
	} catch (error) {
		console.error(`[authRoutes] -> [post] -> [google] -> ${error}`)
	}
}

async function loginEmailPassword(
	request: Request,
	response: Response,
): Promise<void> {
	const { email, password } = request.body

	try {
		const emailPasswordAuthenticate = container.resolve(
			EmailPasswordAuthenticate,
		)
		const authenticateUserUseCase = new AuthenticateUserUseCase(
			emailPasswordAuthenticate,
		)

		const token = await authenticateUserUseCase.execute(email, password)

		console.log(
			`[authRoutes] -> [post] -> [email] -> login realizado com sucesso ${email}`,
		)

		response.status(201).json({ token, user: { email } })
	} catch (error) {
		console.error(`[authRoutes] -> [post] -> [email] -> ${error}`)
	}
}

export { authRoutes }
//
