import { ISummary, ITransactionDTO, ITransationRepository } from '../ITransationRepository'
import transactionRepositoryFactory from './transactionRepositoryFactory'



class TransationRepository implements ITransationRepository {

    private repository: ITransationRepository

    constructor() {
        this.repository = transactionRepositoryFactory.createRepository('mongoose')
    }

    async create({ title, amount, category, type }: ITransactionDTO): Promise<void> {
        await this.repository.create({ title, amount, category, type })
    }

    async list(type?: string, take?: number, skip?: number) {
        const all = await this.repository.list(type, take, skip)

        return all
    }

    async summary(): Promise<ISummary> {
        const summary = await this.repository.summary()

        return summary
    }

}
export { TransationRepository }

