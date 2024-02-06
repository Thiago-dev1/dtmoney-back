import { CategoryModel } from '../../../../models/category'
import ICategory from '../../../../models/interfaces/ICategory'
import ICategoryRepository from '../ICategoryRepository'

class MongooseCategoryRepository implements ICategoryRepository {
	async create(title: string): Promise<void> {
		await CategoryModel.create({ title })
	}
	async list(): Promise<ICategory[]> {
		const categories = await CategoryModel.find()
		return categories
	}
}

export { MongooseCategoryRepository }
//
