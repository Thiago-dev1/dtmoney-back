import mongoose from 'mongoose'
import IRequestLog from './interfaces/IRequestLog'

// terá que ser criado um schema para o mongoose, com os mesmos campos do prisma
const schema = new mongoose.Schema({
	request: {
		type: String,
		required: true,
	},
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: 'User', // Assumindo que você tem uma collection 'User'
	},
	created: {
		type: Date,
		default: Date.now, // Define o valor padrão como a data atual
	},
	type: {
		type: String,
		required: true,
	},
})

schema.index({ userId: 1, request: 1 }, { unique: true })

const RequestLogModel = mongoose.model<IRequestLog>('Category', schema)

export { RequestLogModel }
//
