import { inject, injectable } from 'tsyringe'
import { GoogleSheets } from '../../../../services/sheets/googleSheets'
import dateUtil from '../../../../utils/date'
import { ITransactionRepository } from '../../repositories/ITransactionRepository'

@injectable()
class UpdateSheetsUseCase {
	constructor(
		@inject('TransactionRepository')
		private transactionRepository: ITransactionRepository,

		@inject('GoogleSheets')
		private googleSheets: GoogleSheets,
	) {}

	async execute(
		userId: string,
		spreadsheetId: string,
		tabName: string,
		tableShort = { collum: 'createAt', direction: 'asc' },
	) {
		if (!spreadsheetId || !tabName) {
			console.error(
				`[UpdateSheetsUseCase] -> SpreadsheetId e tabName são obrigatórios ${userId}`,
			)
			throw new Error('SpreadsheetId e tabName são obrigatórios')
		}

		const transactions = await this.transactionRepository.list(
			userId,
			tableShort,
		)

		/**
		 * Formatar as transações para o formato do google sheets
		 * primeira linha: Titulo, Valor, Categoria, Data, Tipo
		 */

		const data = transactions.all.map((transaction) => {
			return [
				transaction.title,
				transaction.amount,
				transaction.category.title,
				dateUtil.formatDate(transaction.createdAt),
				transaction.type,
			]
		})

		const range = 'A2:E' + (data.length + 1)

		await this.googleSheets.writeSheet(data, spreadsheetId, range, tabName)
	}
}

export { UpdateSheetsUseCase }
//
