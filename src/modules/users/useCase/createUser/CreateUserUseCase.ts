import "reflect-metadata"
import { inject, injectable } from "tsyringe"
import IUser from "../../../../models/interfaces/IUser"
import { IUserRepository } from "../../../../modules/users/repositories/IUserRepository"

@injectable()
class CreateUserUseCase {
    constructor(
        @inject("UserRepository")
        private userRepository: IUserRepository
    ) { }

    async execute({ email, name, typeLogin, password, picture }: IUser) {
        try {
            const userAlreadyExists = await this.userRepository.findByEmail(email)

            if (userAlreadyExists) {
                return userAlreadyExists
            }

          const user =  await this.userRepository.create({ email, name, typeLogin, password, picture })
          return user
        } catch (error) {
            console.log(`[CreateUserUseCase] -> [execute] -> ${error}`)  
             throw new Error(error)
        }
    }
}

export { CreateUserUseCase }

