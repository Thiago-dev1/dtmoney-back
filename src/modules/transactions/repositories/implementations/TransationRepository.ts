import { ISummary, ITableShort, ITransactionDTO, ITransationRepository } from '../ITransationRepository'
import transactionRepositoryFactory from './transactionRepositoryFactory'



class TransationRepository implements ITransationRepository {

    private repository: ITransationRepository

    constructor() {
        this.repository = transactionRepositoryFactory.createRepository('mongoose')
    }

    async create({ title, amount, category, type, userId }: ITransactionDTO): Promise<void> {
        await this.repository.create({ title, amount, category, type, userId })
    }

    async list(userId: string, tableShort: ITableShort, take?: number, skip?: number) {
        const all = await this.repository.list(userId, tableShort, take, skip)

        return all
    }

    async summary(userId: string): Promise<ISummary> {
        const summary = await this.repository.summary(userId)

        return summary
    }

}
export { TransationRepository }

