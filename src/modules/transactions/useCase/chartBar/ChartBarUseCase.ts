import { inject, injectable } from 'tsyringe'
import { ITransactionRepository } from '../../repositories/ITransactionRepository'

interface ICategoryExpense {
	[category: string]: number
}

@injectable()
class ChartBarUseCase {
	constructor(
		@inject('TransactionRepository')
		private transactionRepository: ITransactionRepository,
	) {}

	async execute(userId: string, type: 'deposit' | 'withdraw') {
		try {
			const transactions = await this.transactionRepository.find({
				userId,
				type: type,
			})

			// Agrupar transações por categoria e somar valores
			const transactionByCategory: ICategoryExpense = transactions.reduce(
				(acc: ICategoryExpense, transaction) => {
					const category = transaction.category
					if (!acc[category.title]) {
						acc[category.title] = 0
					}
					acc[category.title] += transaction.amount
					return acc
				},
				{},
			)

			// Cores para ganhos (deposit) e despesas (withdraw)
			const colors =
				type === 'deposit'
					? ['#4BC0C0', '#7E57C2', '#FFCA28', '#26A69A', '#EC407A'] // Cores para ganhos
					: ['#FF6384', '#FF9F40', '#D32F2F', '#C2185B', '#F57C00'] // Cores para despesas

			// Preparar dados para o gráfico
			const data = {
				labels: Object.keys(transactionByCategory),
				title: type === 'deposit' ? 'Ganhos' : 'Despesas',
				datasets: [
					{
						data: Object.values(transactionByCategory),
						backgroundColor: colors.slice(
							0,
							Object.keys(transactionByCategory).length,
						),
						hoverBackgroundColor: colors.slice(
							0,
							Object.keys(transactionByCategory).length,
						),
					},
				],
			}

			return data
		} catch (error) {
			console.error(`[ChartBarUseCase] - ${error.message}`)
			throw new Error(error)
		}
	}
}

export { ChartBarUseCase }
//
