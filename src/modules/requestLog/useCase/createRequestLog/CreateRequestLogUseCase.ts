import IRequestLog from 'models/interfaces/IRequestLog'
import IRequestLogRepository from 'modules/requestLog/repositories/IRequestLogRepository'
import 'reflect-metadata'
import { inject, injectable } from 'tsyringe'

@injectable()
class CreateRequestLogUseCase {
	constructor(
		@inject('RequestLogRepository')
		private requestLogRepository: IRequestLogRepository,
	) {}

	async execute(data: Partial<IRequestLog>) {
		try {
			if (!data.request) {
				throw new Error('Request is required')
			}

			if (!data.userId) {
				throw new Error('User is required')
			}

			await this.requestLogRepository.create(data)
		} catch (error) {
			throw new Error(`CreateRequestLogUseCase: ${error}`)
		}
	}
}

export { CreateRequestLogUseCase }
//
