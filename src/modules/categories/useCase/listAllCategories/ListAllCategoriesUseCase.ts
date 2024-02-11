import { inject, injectable } from 'tsyringe'
import ICategory from '../../../../models/interfaces/ICategory'
import ICategoryRepository from '../../repositories/ICategoryRepository'

@injectable()
class ListAllCategoriesUseCase {
	constructor(
		@inject('CategoryRepository')
		private categoryRepository: ICategoryRepository,
	) {}

	async execute(): Promise<ICategory[]> {
		const categories = await this.categoryRepository.listAll()
		return categories
	}
}

export { ListAllCategoriesUseCase }
//
