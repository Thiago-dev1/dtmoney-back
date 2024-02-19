import IRequestLogRepository from '../IRequestLogRepository'
import { MongooseRequestLogRepository } from './mongooseRequestLogRepository'

class RequestLogRepositoryFactory {
	static createRepository(
		type: 'prisma' | 'mongoose',
	): IRequestLogRepository {
		if (type === 'prisma') {
			// return new PrismaRequestLogRepository()
			console.log('prisma')
		} else if (type === 'mongoose') {
			return new MongooseRequestLogRepository()
		} else {
			throw new Error('Invalid repository type')
		}
	}
}

export default RequestLogRepositoryFactory
