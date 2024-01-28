import { NextFunction, Request, Response } from 'express'
import { OAuth2Client } from 'google-auth-library'

const client = new OAuth2Client()

export async function verifyGoogleToken(
	request: Request,
	response: Response,
	next: NextFunction,
): Promise<void> {
	try {
		const { credential } = request.body
		const ticket = await client.verifyIdToken({
			idToken: credential,
			audience: process.env.GOOGLE_CLIENT_ID,
		})

		request.userGoogle = ticket.getPayload() // Add the user payload to the request object.
		next() // Continue to the next middleware or route handler.
	} catch (error) {
		response.status(401).json({ error: 'Invalid credentials' })
	}
}
