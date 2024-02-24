import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { UpdateSheetsUseCase } from './UpdateSheetsUseCase'

class UpdateSheetsController {
	async handle(request: Request, response: Response): Promise<void> {
		response.status(200).send()
		const collum = request.query.collum
			? String(request.query.collum)
			: 'createAt'
		const direction = request.query.direction
			? String(request.query.direction)
			: 'asc'

		const tableShort = {
			collum,
			direction,
		}

		const updateSheetsUseCase = container.resolve(UpdateSheetsUseCase)

		const user = request.userGoogle

		const sheets = await updateSheetsUseCase.execute(
			user._id,
			user.spreadsheetId,
			user.tabName,
			tableShort,
		)
		console.log(sheets)
	}
}

export { UpdateSheetsController }
//
