import mongoose from "mongoose";

async function main() {
    mongoose.set('strictQuery', false)
    mongoose.set('autoIndex', false)
    await mongoose.connect(process.env.DATABASE_URL)
    console.log('Conectou com Mongoose!')
  }

export default main