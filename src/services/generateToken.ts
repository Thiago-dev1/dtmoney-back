import { sign } from 'jsonwebtoken'

export function generateToken(email: string, idUser: string): string {
	return sign({}, process.env.JWT_SECRET, {
		subject: `${idUser}`,
		expiresIn: '1d',
	})
}
