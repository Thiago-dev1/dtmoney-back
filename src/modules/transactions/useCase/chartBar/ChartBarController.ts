import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { ChartBarUseCase } from './ChartBarUseCase'

class ChartBarController {
	async handle(request: Request, response: Response): Promise<Response> {
		try {
			const userId = request.userGoogle._id
			const type = request.query.type as 'deposit' | 'withdraw'

			if (type !== 'deposit' && type !== 'withdraw')
				return response.status(400).json({ error: 'Invalid type' })

			const chartBarUseCase = container.resolve(ChartBarUseCase)

			const chartBar = await chartBarUseCase.execute(userId, type)

			return response.status(201).json(chartBar)
		} catch (error) {
			return response.status(500).json({ error: error.message })
		}
	}
}

export { ChartBarController }
//
