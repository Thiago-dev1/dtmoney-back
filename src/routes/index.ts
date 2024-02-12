import { Router } from 'express'

import { authRoutes } from './auth.routes'
import { categoryRoutes } from './category.routes'
import { transactionRoutes } from './transaction.routes'
import { userRoutes } from './user.routes'

const router = Router()

router.use('/transaction', transactionRoutes)
router.use('/auth', authRoutes)
router.use('/category', categoryRoutes)
router.use('/user', userRoutes)

export { router }
//
