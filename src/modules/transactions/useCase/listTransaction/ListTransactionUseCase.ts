import { Transaction } from "@prisma/client"
import { inject, injectable } from "tsyringe"

import { ITableShort, ITransationRepository } from "../../repositories/ITransationRepository"

interface IRequest {
    tableShort?: ITableShort,
    take?: number,
    skip?: number
}

@injectable()
class ListTransactionUseCase {
    constructor(
        @inject("TransationRepository")
        private transationRepository: ITransationRepository
    ) {}

    async execute(userId: string, {tableShort = {collum: 'createAt', direction: 'asc'}, take, skip}:IRequest): Promise<Transaction[]> {
        const all = await this.transationRepository.list(userId, tableShort, take, skip)

        return all
    }
}

export { ListTransactionUseCase }

