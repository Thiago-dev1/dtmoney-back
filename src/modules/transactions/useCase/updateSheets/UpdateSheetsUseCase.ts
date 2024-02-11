import { inject, injectable } from 'tsyringe'
import { GoogleSheets } from '../../../../services/sheets/googleSheets'
import { ITransationRepository } from '../../repositories/ITransationRepository'

@injectable()
class UpdateSheetsUseCase {
	constructor(
		@inject('TransationRepository')
		private transationRepository: ITransationRepository,

		@inject('GoogleSheets')
		private googleSheets: GoogleSheets,
	) {}

	async execute() {
		const userId = '65b647d4ade91310cc6cdd61' // id do usuário logado, colocar como parâmetro

		const transactions = await this.transationRepository.list(userId, {
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