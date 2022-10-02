import "reflect-metadata"
import { inject, injectable } from "tsyringe"

import { ITransationRepository, ITransactionDTO } from "../../repositories/ITransationRepository"


@injectable()
class CreateTransactionUseCase {
    constructor(
        @inject("TransationRepository")
        private transationRepository: ITransationRepository
    ) {}

    async execute({title, category, amount, type}: ITransactionDTO) {
        await this.transationRepository.create({title, amount, category, type})
    }
}

export { CreateTransactionUseCase }