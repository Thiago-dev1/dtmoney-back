import { FilterQuery } from 'mongoose'

export type Transaction = {
	_id: string
	title: string
	amount: number
	category: {
		_id: string
		title: string
	}
	createdAt: Date
	type: 'deposit' | 'withdraw'
	userId: string
}

interface ITransactionDTO {
	title: string
	amount: number
	category: string
	type: string
	userId: string
	isRecurrent?: boolean
	installments?: number
	dueDate?: Date
}

interface ISummary {
	totalW: number
	totalD: number
	total: number
}

interface IReponse {
	count: number
	transaction: Transaction
}

interface ITableShort {
	collum: 'title' | 'amount' | 'category' | 'createAt'
	direction: 'asc' | 'desc'
}

interface IResponseList {
	all: Transaction[]
	count: number
}

interface ITransactionRepository {
	create({
		title,
		amount,
		category,
		type,
		userId,
	}: ITransactionDTO): Promise<void>
	list(
		userId: string,
		tableShort: ITableShort,
		take?: number,
		skip?: number,
	): Promise<IResponseList>
	summary(userId: string): Promise<ISummary>
	find(filter: FilterQuery<Transaction>): Promise<Transaction[]>
}

export {
	IReponse,
	ISummary,
	ITableShort,
	ITransactionDTO,
	ITransactionRepository,
}
//
