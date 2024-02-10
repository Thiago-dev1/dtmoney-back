import { CategoryModel } from '../../../../models/category'
import ICategory from '../../../../models/interfaces/ICategory'
import ICategoryRepository from '../ICategoryRepository'

class MongooseCategoryRepository implements ICategoryRepository {
	create(title: string): Promise<ICategory> {
		return CategoryModel.create({ title })
	}

	getByTitle(title: string): Promise<ICategory> {
		return CategoryModel.findOne({ title })
	}

	list(): Promise<ICategory[]> {
		return CategoryModel.find()
	}
}

export { MongooseCategoryRepository }
//
