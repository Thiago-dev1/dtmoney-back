import { container } from "tsyringe"
import { Request, Response } from "express"

import { ListTransactionUseCase } from "./ListTransactionUseCase"

class ListTransactionController {

    async handle(request: Request, response: Response): Promise<Response> {

        const type = request.query.type

        const listTransactionController = container.resolve(ListTransactionUseCase)

        const all = await listTransactionController.execute({type: type as string})
        
        return response.status(200).json({transaction: all})
    }
}

export { ListTransactionController }