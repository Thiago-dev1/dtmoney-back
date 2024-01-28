import IUser from '../../../models/interfaces/IUser'

interface IUserRepository {
	create({ email, name, typeLogin, password, picture }: IUser): Promise<IUser>
	findByEmail(email: string): Promise<IUser>
	findById(id: string): Promise<IUser>
}

export { IUserRepository }
//
