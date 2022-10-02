import { inject, injectable } from "tsyringe"


import { ITransationRepository,ISummary } from "../../repositories/ITransationRepository"



@injectable()
class SummaryUseCase {
    constructor(
        @inject("TransationRepository")
        private transationRepository: ITransationRepository
    ){}

    async execute(): Promise<ISummary> {
        const summary = await this.transationRepository.summary()

        return summary
    }
}


export { SummaryUseCase }