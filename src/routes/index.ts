import { Router } from "express"

import { authRoutes } from "./auth.routes"
import { transactionRoutes } from "./transaction.routes"

const router = Router()

router.use("/transaction", transactionRoutes)
router.use("/auth", authRoutes)

export { router }

