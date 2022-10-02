import { container } from "tsyringe"
import { Request, Response } from "express"

import { SummaryUseCase } from "./summaryUseCase"

class SummaryController {
    
    async handle(request: Request, response: Response): Promise<Response> {
        
        const summaryUseCase = container.resolve(SummaryUseCase)

        const summary = await summaryUseCase.execute()

        return response.status(200).json(summary)
    }
}

export { SummaryController }