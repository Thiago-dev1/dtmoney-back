import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { ListTransactionUseCase } from './ListTransactionUseCase'

class ListTransactionController {
	async handle(request: Request, response: Response): Promise<Response> {
		const userId = request.userGoogle._id
		const take = request.query.take ? Number(request.query.take) : 10
		const collum = request.query.collum ? request.query.collum : 'createAt'
		const direction = request.query.direction
			? request.query.direction
			: 'asc'
		const skip = request.query.skip ? Number(request.query.skip) : 0

		const tableShort = {
			collum,
			direction,
		}

		const listTransactionController = container.resolve(
			ListTransactionUseCase,
		)

		const all = await listTransactionController.execute(userId, {
			tableShort,
			take: Number(take),
			skip: Number(skip),
		})

		return response.status(200).json(all)
	}
}

export { ListTransactionController }
//
