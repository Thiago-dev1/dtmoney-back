import { Router } from 'express'

import { ensureAuthenticated } from '../middlewares/ensureAuthenticated'
import { ListAllCategoriesController } from '../modules/categories/useCase/listAllCategories/ListAllCategoriesController'

const categoryRoutes = Router()

const listAllCategoriesController = new ListAllCategoriesController()

categoryRoutes.get('/', ensureAuthenticated, listAllCategoriesController.handle)

export { categoryRoutes }
//
