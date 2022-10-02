import { inject, injectable } from "tsyringe"
import { Transaction } from "@prisma/client"

import { ITransationRepository } from "../../repositories/ITransationRepository"

interface IRequest {
    type?: string,
}

@injectable()
class ListTransactionUseCase {
    constructor(
        @inject("TransationRepository")
        private transationRepository: ITransationRepository
    ) {}

    async execute({type}:IRequest): Promise<Transaction[]> {
        const all = await this.transationRepository.list(type)

        return all
    }
}

export { ListTransactionUseCase }