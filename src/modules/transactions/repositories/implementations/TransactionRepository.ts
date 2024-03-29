import { FilterQuery } from 'mongoose'
import {
	ISummary,
	ITableShort,
	ITransactionDTO,
	ITransactionRepository,
	Transaction,
} from '../ITransactionRepository'
import transactionRepositoryFactory from './transactionRepositoryFactory'

class TransactionRepository implements ITransactionRepository {
	private repository: ITransactionRepository

	constructor() {
		this.repository =
			transactionRepositoryFactory.createRepository('mongoose')
	}
	async find(filter: FilterQuery<Transaction>): Promise<Transaction[]> {
		return this.repository.find(filter)
	}

	async create({
		title,
		amount,
		category,
		type,
		userId,
	}: ITransactionDTO): Promise<void> {
		await this.repository.create({ title, amount, category, type, userId })
	}

	async list(
		userId: string,
		tableShort: ITableShort,
		take?: number,
		skip?: number,
	) {
		const all = await this.repository.list(userId, tableShort, take, skip)

		return all
	}

	async summary(userId: string): Promise<ISummary> {
		const summary = await this.repository.summary(userId)

		return summary
	}
}
export { TransactionRepository }
//
