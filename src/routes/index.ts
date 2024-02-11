import { Router } from 'express'

import { authRoutes } from './auth.routes'
import { categoryRoutes } from './category.routes'
import { transactionRoutes } from './transaction.routes'

const router = Router()

router.use('/transaction', transactionRoutes)
router.use('/auth', authRoutes)
router.use('/category', categoryRoutes)

export { router }
//
