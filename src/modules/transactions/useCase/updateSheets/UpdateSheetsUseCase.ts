import { inject, injectable } from 'tsyringe'
import { GoogleSheets } from '../../../../services/sheets/googleSheets'
import { ITransactionRepository } from '../../repositories/ITransactionRepository'

@injectable()
class UpdateSheetsUseCase {
	constructor(
		@inject('TransactionRepository')
		private transactionRepository: ITransactionRepository,

		@inject('GoogleSheets')
		private googleSheets: GoogleSheets,
	) {}

	async execute(userId: string) {
		const transactions = await this.transactionRepository.list(userId, {
			collum: 'createAt',
			direction: 'asc',
		})

		/**
		 * Formatar as transações para o formato do google sheets
		 * primeira linha: Titulo, Valor, Categoria, Data, Tipo
		 */

		const data = transactions.all.map((transaction) => {
			return [
				transaction.title,
				transaction.amount,
				transaction.category.title,
				String(transaction.createdAt),
				transaction.type,
			]
		})

		await this.googleSheets.writeSheet(data)
	}
}

export { UpdateSheetsUseCase }
//
