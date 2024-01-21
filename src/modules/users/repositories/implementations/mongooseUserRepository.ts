
import IUser from '../../../../models/interfaces/IUser'
import { UserModal } from '../../../../models/user'
import { IUserRepository } from '../IUserRepository'

class MongooseUserRepository  implements IUserRepository {
    async create({ email, name, typeLogin, password, picture }: IUser): Promise<void> {
        await UserModal.create({ email, name, typeLogin, password, picture })
    }
    async findByEmail(email: string): Promise<IUser> {
        const userEmail = UserModal.findOne({ email })
        return userEmail
    }

}

export { MongooseUserRepository }

