import 'reflect-metadata'
import { container, inject, injectable } from 'tsyringe'

import { CreateCategoryUseCase } from '../../../categories/useCase/createCategory/CreateCategoryUseCase'
import {
	ITransactionDTO,
	ITransationRepository,
} from '../../repositories/ITransationRepository'

@injectable()
class CreateTransactionUseCase {
	constructor(
		@inject('TransationRepository')
		private transationRepository: ITransationRepository,
	) {}

	async execute({ title, category, amount, type, userId }: ITransactionDTO) {
		const createCategoryUseCase = container.resolve(CreateCategoryUseCase)

		const categoryExists = await createCategoryUseCase.execute(category)

		await this.transationRepository.create({
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
