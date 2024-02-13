import IAuthenticate from '../../../../services/authenticate/interfaces/IAuthenticate'

class AuthenticateUserUseCase {
	constructor(private authenticate: IAuthenticate) {}

	async execute(email: string, password: string) {
		try {
			const token = await this.authenticate.login(email, password)
			return token
		} catch (error) {
			console.error(
				`[AuthenticateUserUseCase] -> [execute] -> ${error.message || error}`,
			)
			throw new Error(error)
		}
	}
}

export { AuthenticateUserUseCase }
//
