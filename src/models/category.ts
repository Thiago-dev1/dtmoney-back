import mongoose from 'mongoose'
import ICategory from './interfaces/ICategory'

// terá que ser criado um schema para o mongoose, com os mesmos campos do prisma
const schema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
			unique: true,
		},
	},
	{
		timestamps: true,
	},
)

// o mongoose irá criar uma collection com o nome transactions
const CategoryModel = mongoose.model<ICategory>('Category', schema)

export { CategoryModel }
//
