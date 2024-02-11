import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { ListAllCategoriesUseCase } from './ListAllCategoriesUseCase'

class ListAllCategoriesController {
	async handle(request: Request, response: Response): Promise<Response> {
		try {
			const listAllCategoriesUseCase = container.resolve(
				ListAllCategoriesUseCase,
			)

			const categories = await listAllCategoriesUseCase.execute()

			return response.status(200).json({ categories })
		} catch (error) {
			return response.status(400).json({ error: error.message })
		}
	}
}

export { ListAllCategoriesController }
//
