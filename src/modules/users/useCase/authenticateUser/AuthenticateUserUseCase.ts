import IAuthenticate from '../../../../services/authenticate/interfaces/IAuthenticate'

class AuthenticateUserUseCase {
	constructor(private authenticate: IAuthenticate) {}

	async execute(email: string, password: string) {
		const token = await this.authenticate.login(email, password)
		return token
	}
}

export { AuthenticateUserUseCase }
//
