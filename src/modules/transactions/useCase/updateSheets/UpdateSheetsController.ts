import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { UpdateSheetsUseCase } from './UpdateSheetsUseCase'

class UpdateSheetsController {
	async handle(request: Request, response: Response): Promise<void> {
		response.status(200).send()

		const updateSheetsUseCase = container.resolve(UpdateSheetsUseCase)

		const sheets = await updateSheetsUseCase.execute()
		console.log(sheets)
	}
}

export { UpdateSheetsController }
//
