import mongoose from 'mongoose'
import { Transaction } from '../modules/transactions/repositories/ITransactionRepository'

// terá que ser criado um schema para o mongoose, com os mesmos campos do prisma
const schema = new mongoose.Schema({
	title: String,
	amount: Number,
	category: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Category',
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
	type: {
		enum: ['deposit', 'withdraw'],
		type: String,
		required: true,
	},
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
	},
	isRecurrent: {
		type: Boolean,
		default: false,
	},
	dueDate: Date,
})

// o mongoose irá criar uma collection com o nome transactions
const TransactionModel = mongoose.model<Transaction>('Transaction', schema)

// Middleware 'pre' para salvar o amount em centavos
schema.pre('save', function (next) {
	this.amount *= 100 // Multiplica o amount por 100 para converter para centavos
	next()
})

// Middleware 'post' para converter o amount de volta para reais ao buscar
schema.post('find', function (docs) {
	docs.forEach((doc) => {
		doc.amount /= 100 // Converte o amount de volta para reais
	})
})

export { TransactionModel }
//
