import { inject, injectable } from 'tsyringe'

import {
	ISummary,
	ITransationRepository,
} from '../../repositories/ITransationRepository'

@injectable()
class SummaryUseCase {
	constructor(
		@inject('TransationRepository')
		private transationRepository: ITransationRepository,
	) {}

	async execute(userId: string): Promise<ISummary> {
		const summary = await this.transationRepository.summary(userId)

		return summary
	}
}

export { SummaryUseCase }
//
