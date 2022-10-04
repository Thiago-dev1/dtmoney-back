import { inject, injectable } from "tsyringe"
import { Transaction } from "@prisma/client"

import { ITransationRepository } from "../../repositories/ITransationRepository"

interface IRequest {
    type?: string,
    take?: number,
    skip?: number
}

@injectable()
class ListTransactionUseCase {
    constructor(
        @inject("TransationRepository")
        private transationRepository: ITransationRepository
    ) {}

    async execute({type, take, skip}:IRequest): Promise<Transaction[]> {
        const all = await this.transationRepository.list(type, take, skip)

        return all
    }
}

export { ListTransactionUseCase }   