import { Router } from 'express'

import { ensureAuthenticated } from '../middlewares/ensureAuthenticated'
import { ChartBarController } from '../modules/transactions/useCase/chartBar/ChartBarController'
import { CreateTransactionController } from '../modules/transactions/useCase/createTransaction/CreateTransactionController'
import { ListTransactionController } from '../modules/transactions/useCase/listTransaction/ListTransactionController'
import { SummaryController } from '../modules/transactions/useCase/summary/summaryController'
import { UpdateSheetsController } from '../modules/transactions/useCase/updateSheets/UpdateSheetsController'

const transactionRoutes = Router()

const createTransactionController = new CreateTransactionController()
const listTransactionController = new ListTransactionController()
const summaryController = new SummaryController()
const updateSheetsController = new UpdateSheetsController()

const chartBarController = new ChartBarController()

transactionRoutes.post(
	'/create',
	ensureAuthenticated,
	createTransactionController.handle,
)
transactionRoutes.get(
	'/',
	ensureAuthenticated,
	listTransactionController.handle,
)
transactionRoutes.get('/summary', ensureAuthenticated, summaryController.handle)

transactionRoutes.get(
	'/update-sheets',
	ensureAuthenticated,
	updateSheetsController.handle,
)

transactionRoutes.get(
	'/chart-bar',
	ensureAuthenticated,
	chartBarController.handle,
)

export { transactionRoutes }
//
