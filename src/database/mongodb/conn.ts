import mongoose from 'mongoose'

async function main() {
	await mongoose.connect(process.env.DATABASE_URL)
	console.log('Conectou com Mongoose!')
}

export default main
