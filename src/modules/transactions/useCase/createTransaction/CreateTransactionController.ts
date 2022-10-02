import { container } from "tsyringe"
import { Request, Response } from "express"

import { CreateTransactionUseCase } from "./CreateTransactionUseCase"

class CreateTransactionController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { title, amount, category, type } = request.body

        const createTransactionUseCase =  container.resolve(CreateTransactionUseCase)

        await createTransactionUseCase.execute({title, amount, category, type})

        return response.status(201).send()
    }
}

export { CreateTransactionController }