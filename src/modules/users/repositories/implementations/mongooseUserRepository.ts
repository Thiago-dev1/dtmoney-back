import IUser from '../../../../models/interfaces/IUser'
import { UserModal } from '../../../../models/user'
import { IUserRepository } from '../IUserRepository'

class MongooseUserRepository implements IUserRepository {
	async findById(id: string): Promise<IUser> {
		const user = await UserModal.findById(id)
		return user
	}
	async create({
		email,
		name,
		typeLogin,
		password,
		picture,
	}: IUser): Promise<IUser> {
		const user = await UserModal.create({
			email,
			name,
			typeLogin,
			password,
			picture,
		})

		return user
	}
	async findByEmail(email: string): Promise<IUser> {
		const userEmail = await UserModal.findOne({ email })
		return userEmail
	}
}

export { MongooseUserRepository }
//
