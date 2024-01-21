
import { container } from "tsyringe"

import IUser from "../../../../models/interfaces/IUser"
import { CreateUserUseCase } from "./CreateUserUseCase"

class CreateUserController {
    async handle({email, name, typeLogin, password, picture}: IUser): Promise<void> {
        try {
            
        const createUserUseCase =  container.resolve(CreateUserUseCase)

        await createUserUseCase.execute({email, name, typeLogin, password, picture})
        } catch (error) {
            console.log(`[CreateUserController] -> [handle] -> ${error}`)  
            
            throw new Error(error)
        }

    }
}

export { CreateUserController }

