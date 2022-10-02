import { container } from "tsyringe"

import { ITransationRepository } from "../../modules/transactions/repositories/ITransationRepository"
import { TransationRepository } from "../../modules/transactions/repositories/implementations/TransationRepository"

container.registerSingleton<ITransationRepository> (
    "TransationRepository",
    TransationRepository
)