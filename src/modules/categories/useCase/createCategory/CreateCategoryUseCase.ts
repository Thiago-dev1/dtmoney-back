import { inject, injectable } from 'tsyringe'
import ICategory from '../../../../models/interfaces/ICategory'
import ICategoryRepository from '../../repositories/ICategoryRepository'

@injectable()
class CreateCategoryUseCase {
	constructor(
		@inject('CategoryRepository')
		private categoryRepository: ICategoryRepository,
	) {}

	async execute(title: string): Promise<ICategory> {
		try {
			const category = await this.categoryRepository.getByTitle(title)

			if (category) return category

			return this.categoryRepository.create(title)
		} catch (error) {
			console.error(`[CreateCategoryUseCase]: ${error}`)
			throw new Error(error)
		}
	}
}

export { CreateCategoryUseCase }
//
