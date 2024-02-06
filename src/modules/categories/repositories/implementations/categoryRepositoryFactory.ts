import ICategoryRepository from '../ICategoryRepository'
import { MongooseCategoryRepository } from './mongooseCategoryRepository'

class CategoryRepositoryFactory {
	static createRepository(type: 'prisma' | 'mongoose'): ICategoryRepository {
		if (type === 'prisma') {
			// return new PrismaTransactionRepository()
			console.log('prisma')
		} else if (type === 'mongoose') {
			return new MongooseCategoryRepository()
		} else {
			throw new Error('Invalid repository type')
		}
	}
}

export default CategoryRepositoryFactory
