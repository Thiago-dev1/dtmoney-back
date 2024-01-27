import { Request, Response } from "express"
import { container } from "tsyringe"

import { SummaryUseCase } from "./summaryUseCase"

class SummaryController {
    
    async handle(request: Request, response: Response): Promise<Response> {
        const userId = request.userGoogle._id

        const summaryUseCase = container.resolve(SummaryUseCase)

        const summary = await summaryUseCase.execute(userId)

        return response.status(200).json(summary)
    }
}

export { SummaryController }
