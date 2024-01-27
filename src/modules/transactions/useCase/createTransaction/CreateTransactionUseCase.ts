import "reflect-metadata"
import { inject, injectable } from "tsyringe"

import { ITransactionDTO, ITransationRepository } from "../../repositories/ITransationRepository"


@injectable()
class CreateTransactionUseCase {
    constructor(
        @inject("TransationRepository")
        private transationRepository: ITransationRepository
    ) {}

    async execute({title, category, amount, type, userId}: ITransactionDTO) {
        await this.transationRepository.create({title, amount, category, type, userId})
    }
}

export { CreateTransactionUseCase }
