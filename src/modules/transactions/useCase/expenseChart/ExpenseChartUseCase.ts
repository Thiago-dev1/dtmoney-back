import { inject, injectable } from 'tsyringe'
import { ITransactionRepository } from '../../repositories/ITransactionRepository'

interface ICategoryExpense {
	[category: string]: number
}

@injectable()
class ExpenseChartUseCase {
	constructor(
		@inject('TransactionRepository')
		private transactionRepository: ITransactionRepository,
	) {}

	async execute(userId: string) {
		try {
			const transactions = await this.transactionRepository.find({
				userId,
				type: 'withdraw',
			})

			// Agrupar transações por categoria e somar valores
			const expensesByCategory: ICategoryExpense = transactions.reduce(
				(acc: ICategoryExpense, transaction) => {
					const category = transaction.category
					if (!acc[category.title]) {
						acc[category.title] = 0
					}
					acc[category.title] += transaction.amount // Assumindo que `transaction.amount` é o valor da transação
					return acc
				},
				{},
			)

			// Preparar dados para o gráfico
			const data = {
				labels: Object.keys(expensesByCategory),
				title: 'Despesas',
				datasets: [
					{
						data: Object.values(expensesByCategory),
						backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
						hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
					},
				],
			}

			return data
		} catch (error) {
			console.error(`[ExpenseChartUseCase] - ${error.message}`)
			throw new Error(error)
		}
	}
}

export { ExpenseChartUseCase }
//
