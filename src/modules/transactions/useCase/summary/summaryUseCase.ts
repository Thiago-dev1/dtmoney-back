import { inject, injectable } from 'tsyringe'

import {
	ISummary,
	ITransactionRepository,
} from '../../repositories/ITransactionRepository'

@injectable()
class SummaryUseCase {
	constructor(
		@inject('TransactionRepository')
		private transactionRepository: ITransactionRepository,
	) {}

	async execute(userId: string): Promise<ISummary> {
		const summary = await this.transactionRepository.summary(userId)

		return summary
	}
}

export { SummaryUseCase }
//
