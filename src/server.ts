import app from './app'
import conn from './database/mongodb/conn'

if (process.env.DATA_BASE === 'mongoose') {
	conn()
		.then(async () => {
			app.emit('pronto')
		})
		.catch((err) => console.log(err))
	app.on('pronto', () => {
		console.log('Conectou com Mongoose!')
		app.listen(3333, () => console.log('Server is running!'))
	})
} else {
	// vai ser o prisma aqui que está utilizando sqlite
	app.listen(3333, () => console.log('Server is running!'))
}
