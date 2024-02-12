import { Router } from 'express'
import { CreateUserController } from '../modules/users/useCase/createUser/CreateUserController'

const createUserController = new CreateUserController()

const userRoutes = Router()

userRoutes.post('/cadastrar', createUserController.handle)

export { userRoutes }
//
