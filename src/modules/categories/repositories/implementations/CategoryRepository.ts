import ICategory from '../../../../models/interfaces/ICategory'
import ICategoryRepository from '../ICategoryRepository'
import categoryRepositoryFactory from './categoryRepositoryFactory'
class CategoryRepository implements ICategoryRepository {
	private repository: ICategoryRepository

	constructor() {
		this.repository = categoryRepositoryFactory.createRepository('mongoose')
	}
	create(title: string): Promise<ICategory> {
		return this.repository.create(title)
	}
	listAll(): Promise<ICategory[]> {
		return this.repository.listAll()
	}

	getByTitle(title: string): Promise<ICategory> {
		return this.repository.getByTitle(title)
	}
}

export { CategoryRepository }
//
