import app from "./app";
import conn from "./database/mongodb/conn";

if(process.env.DATA_BASE === 'mongoose') {
    conn()
    .then(() => {
        app.emit('pronto')
    })
    .catch((err) => console.log(err))
    app.on('pronto', () => {
        app.listen(3333, () => console.log('Server is running!'))
    })
} else {
    // vai ser o prisma aqui que está utilizando sqlite
    app.listen(3333, () => console.log('Server is running!'))
}