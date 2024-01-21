import IUser from "models/interfaces/IUser"
import { IUserRepository } from "../IUserRepository"
import UserRepositoryFactory from "./userRepositoryFactory"

class UserRepository implements IUserRepository {

    private repository: IUserRepository

    constructor() {
        this.repository = UserRepositoryFactory.createRepository('mongoose')
    }
    async create({ email, name, typeLogin, password, picture }: IUser): Promise<void> {
        await this.repository.create({ email, name, typeLogin, password, picture })
    }
    findByEmail(email: string): Promise<IUser> {
        return this.repository.findByEmail(email)
    }


}
export { UserRepository }

