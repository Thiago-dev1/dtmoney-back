import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { CreateTransactionUseCase } from './CreateTransactionUseCase'

class CreateTransactionController {
	async handle(request: Request, response: Response): Promise<Response> {
		const { title, amount, category, type, installments, isRecurrent } = request.body
		const userId = request.userGoogle._id

		const createTransactionUseCase = container.resolve(
			CreateTransactionUseCase,
		)

		await createTransactionUseCase.execute({
			title,
			amount,
			category,
			type,
			userId,
			installments,
			isRecurrent,
		})

		return response.status(201).send()
	}
}

export { CreateTransactionController }
//
