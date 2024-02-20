import { ITransactionRepository } from '../ITransactionRepository'
import { MongooseTransactionRepository } from './mongooseTransactionRepository'

class TransactionRepositoryFactory {
	static createRepository(
		type: 'prisma' | 'mongoose',
	): ITransactionRepository {
		if (type === 'prisma') {
			// return new PrismaTransactionRepository()
			console.log('prisma')
		} else if (type === 'mongoose') {
			return new MongooseTransactionRepository()
		} else {
			throw new Error('Invalid repository type')
		}
	}
}

export default TransactionRepositoryFactory
