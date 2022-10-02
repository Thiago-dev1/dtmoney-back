import { Transaction } from "@prisma/client"

interface ITransactionDTO {
    title: string,
    amount: number,
    category: string,
    type: string
}

interface ISummary {
        totalW: number,
        totalD: number,
        total: number
}

interface ITransationRepository {
    create({title, amount, category, type}: ITransactionDTO): Promise<void>
    list(type?: string): Promise<Transaction[]>
    summary(): Promise<ISummary>
}

export { ITransationRepository, ITransactionDTO, ISummary }