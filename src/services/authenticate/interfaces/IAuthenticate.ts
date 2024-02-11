export default interface IAuthenticate {
	login(email: string, password?: string): Promise<string>
}
