import { TransactionModel } from '../../../../models/transaction'
import {
	ISummary,
	ITableShort,
	ITransactionDTO,
	ITransationRepository,
} from '../ITransationRepository'

class MongooseTransactionRepository implements ITransationRepository {
	async create({
		title,
		amount,
		category,
		type,
		userId,
	}: ITransactionDTO): Promise<void> {
		console.log(
			`[MongooseTransactionRepository] - create - ${title} - ${amount} - ${category} - ${type}`,
		)

		const transaction = {
			title,
			amount: type === 'withdraw' ? -amount : amount,
			category,
			type,
			userId,
		}

		await TransactionModel.create(transaction)
	}
	async list(
		userId: string,
		tableShort: ITableShort,
		take?: number,
		skip?: number,
	) {
		const sort = {}

		if (tableShort) {
			sort[tableShort.collum] = tableShort.direction === 'asc' ? 1 : -1
		}

		const [count, all] = await Promise.all([
			TransactionModel.countDocuments(),
			TransactionModel.find({
				userId,
			})
				.sort(sort)
				.skip(skip)
				.limit(take)
				.populate('category', 'title')
				.lean(),
		])

		const transaction = {
			count,
			all,
		}

		return transaction
	}
	async summary(userId: string): Promise<ISummary> {
		const deposit = await TransactionModel.aggregate([
			{
				$match: {
					userId,
					amount: {
						$gt: 0,
					},
				},
			},
			{
				$group: {
					_id: null,
					total: {
						$sum: '$amount',
					},
				},
			},
		])

		const withdraw = await TransactionModel.aggregate([
			{
				$match: {
					userId,
					amount: {
						$lt: 0,
					},
				},
			},
			{
				$group: {
					_id: null,
					total: {
						$sum: '$amount',
					},
				},
			},
		])

		const totalW = withdraw[0]?.total || 0
		const totalD = deposit[0]?.total || 0
		const total = totalD + totalW

		return {
			totalW,
			totalD,
			total,
		}
	}
}

export { MongooseTransactionRepository }
//
