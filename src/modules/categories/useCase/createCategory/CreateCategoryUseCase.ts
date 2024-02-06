import { inject, injectable } from 'tsyringe'
import ICategoryRepository from '../../repositories/ICategoryRepository'

@injectable()
class CreateCategoryUseCase {
	constructor(
		@inject('CategoryRepository')
		private categoryRepository: ICategoryRepository,
	) {}

	async execute(title: string): Promise<void> {
		try {
			await this.categoryRepository.create(title)
		} catch (error) {
			console.error(`[CreateCategoryUseCase]: ${error}`)
			throw new Error(error)
		}
	}
}

export { CreateCategoryUseCase }
//
