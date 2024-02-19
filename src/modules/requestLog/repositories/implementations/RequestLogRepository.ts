import IRequestLog from 'models/interfaces/IRequestLog'
import IRequestLogRepository from '../IRequestLogRepository'
import requestLogRepositoryFactory from './requestLogRepositoryFactory'

class RequestLogRepository implements IRequestLogRepository {
	private repository: IRequestLogRepository

	constructor() {
		this.repository =
			requestLogRepositoryFactory.createRepository('mongoose')
	}
	create(data: Partial<IRequestLog>): Promise<void> {
		return this.repository.create(data)
	}
	list(userId: string): Promise<IRequestLog[]> {
		return this.repository.list(userId)
	}
	findByRequest(request: string, userId: string): Promise<IRequestLog> {
		return this.repository.findByRequest(request, userId)
	}
}
export { RequestLogRepository }
//
