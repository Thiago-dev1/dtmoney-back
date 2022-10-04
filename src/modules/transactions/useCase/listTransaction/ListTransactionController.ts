import { container } from "tsyringe"
import { Request, Response } from "express"

import { ListTransactionUseCase } from "./ListTransactionUseCase"

class ListTransactionController {

    async handle(request: Request, response: Response): Promise<Response> {

        const type = request.query.type
        const take = request.query.take
        // const skip = request.query.skip
        const page = request.query.page

        

        if(Number(page) > 1 ) {
            const skip = (Number(page) -1 ) * Number(take)

            const listTransactionController = container.resolve(ListTransactionUseCase)

            const all = await listTransactionController.execute({
                type: type as string, 
                take: Number(take), 
                skip: Number(skip)
            })
    
            
            return response.status(200).json(all)
        }

        const skip = 0
        
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