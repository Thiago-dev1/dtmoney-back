import 'reflect-metadata'
import { container, inject, injectable } from 'tsyringe'

import { CreateCategoryUseCase } from '../../../categories/useCase/createCategory/CreateCategoryUseCase'
import {
	ITransactionDTO,
	ITransactionRepository,
} from '../../repositories/ITransactionRepository'

@injectable()
class CreateTransactionUseCase {
	constructor(
		@inject('TransactionRepository')
		private transactionRepository: ITransactionRepository,
	) {}

	async execute({ title, category, amount, type, userId }: ITransactionDTO) {
		const createCategoryUseCase = container.resolve(CreateCategoryUseCase)

		const categoryExists = await createCategoryUseCase.execute(category)

		await this.transactionRepository.create({
			title,
			amount,
			category: categoryExists._id,
			type,
			userId,
		})
	}
}

export { CreateTransactionUseCase }
//
