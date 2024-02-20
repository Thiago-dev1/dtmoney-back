import { Transaction } from '@prisma/client'
import { inject, injectable } from 'tsyringe'

import {
	ITableShort,
	ITransactionRepository,
} from '../../repositories/ITransactionRepository'

interface IRequest {
	tableShort?: ITableShort
	take?: number
	skip?: number
}

@injectable()
class ListTransactionUseCase {
	constructor(
		@inject('TransactionRepository')
		private transactionRepository: ITransactionRepository,
	) {}

	async execute(
		userId: string,
		{
			tableShort = { collum: 'createAt', direction: 'asc' },
			take,
			skip,
		}: IRequest,
	): Promise<Transaction[]> {
		const all = await this.transactionRepository.list(
			userId,
			tableShort,
			take,
			skip,
		)

		return all
	}
}

export { ListTransactionUseCase }
//
