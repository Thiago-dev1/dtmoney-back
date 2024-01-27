import cors from "cors"
import express from "express"
import "reflect-metadata"

import "./shared/container"

import { router } from "./routes/index"

const app = express()


// const userRepository = container.resolve(UserRepository);

app.use(express.json())
app.use(cors())

app.use(router)

export default app