import { Router } from "express"

import { ensureAuthenticated } from "../middlewares/ensureAuthenticated"
import { CreateTransactionController } from "../modules/transactions/useCase/createTransaction/CreateTransactionController"
import { ListTransactionController } from "../modules/transactions/useCase/listTransaction/ListTransactionController"
import { SummaryController } from "../modules/transactions/useCase/summary/summaryController"


const transactionRoutes =  Router()

const createTransactionController = new CreateTransactionController()
const listTransactionController =  new ListTransactionController()
const summaryController = new SummaryController()

transactionRoutes.post("/create", ensureAuthenticated, createTransactionController.handle)
transactionRoutes.get("/", listTransactionController.handle)
transactionRoutes.get("/summary", summaryController.handle)

export { transactionRoutes }

