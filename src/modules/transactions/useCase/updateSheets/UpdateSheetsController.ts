import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { UpdateSheetsUseCase } from './UpdateSheetsUseCase'

class UpdateSheetsController {
	async handle(request: Request, response: Response): Promise<void> {
		response.status(200).send()

		const updateSheetsUseCase = container.resolve(UpdateSheetsUseCase)

		const user = request.userGoogle

		const sheets = await updateSheetsUseCase.execute(user._id)
		console.log(sheets)
	}
}

export { UpdateSheetsController }
//
