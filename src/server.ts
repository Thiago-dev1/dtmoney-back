import "reflect-metadata"
import express from "express"
import cors from "cors"

import "./shared/container"

import { router } from "./routes/index"

const app = express()

app.use(express.json())
app.use(cors())

app.use(router)

app.listen("3333", () => console.log("Server ON"))