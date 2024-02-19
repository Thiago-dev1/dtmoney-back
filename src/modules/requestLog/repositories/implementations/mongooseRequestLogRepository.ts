import IRequestLog from 'models/interfaces/IRequestLog'
import { RequestLogModel } from '../../../../models/requestLog'
import IRequestLogRepository from '../IRequestLogRepository'

class MongooseRequestLogRepository implements IRequestLogRepository {
	async create(data: Partial<IRequestLog>): Promise<void> {
		console.log(
			`[MongooseRequestLogRepository] - create - ${data.request} - ${data.userId}`,
		)

		await RequestLogModel.create(data)
	}
	list(userId: string): Promise<IRequestLog[]> {
		return RequestLogModel.find({ userId })
	}
	findByRequest(request: string, userId: string): Promise<IRequestLog> {
		return RequestLogModel.findOne({ request, userId })
	}

	async delete(request: string, userId: string): Promise<void> {
		await RequestLogModel.deleteOne({ request, userId })
	}
}

export { MongooseRequestLogRepository }
//
