import { Request, Response } from "express"
import { container } from "tsyringe"

import { ListTransactionUseCase } from "./ListTransactionUseCase"

class ListTransactionController {

    async handle(request: Request, response: Response): Promise<Response> {

        const type = request.query.type 
        const take = request.query.take ? Number(request.query.take) : 10
        let skip = request.query.skip ? Number(request.query.skip ): 0

        
        
        const listTransactionController = container.resolve(ListTransactionUseCase)

        const all = await listTransactionController.execute({
            type: type as string, 
            take: Number(take), 
            skip: Number(skip)
        })

        
        return response.status(200).json(all)
    }
}

export { ListTransactionController }

