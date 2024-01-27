import IUser from "models/interfaces/IUser"
import { IUserRepository } from "../IUserRepository"
import UserRepositoryFactory from "./userRepositoryFactory"

class UserRepository implements IUserRepository {

    private repository: IUserRepository

    constructor() {
        this.repository = UserRepositoryFactory.createRepository('mongoose')
    }
    findById(id: string): Promise<IUser> {
        return this.repository.findById(id)
    }
    async create({ email, name, typeLogin, password, picture, _id }: IUser): Promise<IUser> {
      const user = await this.repository.create({ email, name, typeLogin, password, picture })
        return user
    }
    findByEmail(email: string): Promise<IUser> {
        return this.repository.findByEmail(email)
    }


}
export { UserRepository }

