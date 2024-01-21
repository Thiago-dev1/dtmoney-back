import { container } from "tsyringe"

import { ITransationRepository } from "../../modules/transactions/repositories/ITransationRepository"
import { TransationRepository } from "../../modules/transactions/repositories/implementations/TransationRepository"
import { IUserRepository } from "../../modules/users/repositories/IUserRepository"
import { UserRepository } from "../../modules/users/repositories/implementations/UserRepository"

container.registerSingleton<ITransationRepository> (
    "TransationRepository",
    TransationRepository
)


container.registerSingleton<IUserRepository>(
    "UserRepository",
    UserRepository
)