import mongoose from 'mongoose'
import { Transaction } from '../modules/transactions/repositories/ITransationRepository'

// terá que ser criado um schema para o mongoose, com os mesmos campos do prisma
const schema = new mongoose.Schema({
	title: String,
	amount: Number,
	category: String,
	createdAt: {
		type: Date,
		default: Date.now,
	},
	type: String,
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
	},
})

// o mongoose irá criar uma collection com o nome transactions
const TransactionModel = mongoose.model<Transaction>('Transaction', schema)

export { TransactionModel }
//
