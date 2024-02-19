import IRequestLog from '../../../models/interfaces/IRequestLog'

export default interface IRequestLogRepository {
	create(data: Partial<IRequestLog>): Promise<void>
	list(userId: string): Promise<IRequestLog[]>
	findByRequest(request: string, userId: string): Promise<IRequestLog>
}
