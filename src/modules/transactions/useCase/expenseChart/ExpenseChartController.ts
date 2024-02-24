import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { ExpenseChartUseCase } from './ExpenseChartUseCase'

class ExpenseChartController {
	async handle(request: Request, response: Response): Promise<Response> {
		try {
			const userId = request.userGoogle._id

			const expenseChartUseCase = container.resolve(ExpenseChartUseCase)

			const expenseChart = await expenseChartUseCase.execute(userId)

			return response.status(201).json(expenseChart)
		} catch (error) {
			return response.status(500).json({ error: error.message })
		}
	}
}

export { ExpenseChartController }
//
