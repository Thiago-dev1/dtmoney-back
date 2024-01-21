import mongoose from "mongoose";
import IUser from './interfaces/IUser';

// terá que ser criado um schema para o mongoose, com os mesmos campos do prisma
const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String, 
        required: true,
        unique: true
    },
    picture: {
        type: String,
        required: false
    },
    typeLogin: {
        enum: ['google', 'email', 'github', 'facebook', 'twitter', 'linkedin'],
        type: String,
        required: true
    },
    password: {
        type: String,
        required: false
    },
})

// o mongoose irá criar uma collection com o nome transactions
const UserModal = mongoose.model<IUser>('User', schema)

export { UserModal };

