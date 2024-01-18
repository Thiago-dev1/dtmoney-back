
export type Transaction = {
    id: string
    title: string
    amount: number
    category: string
    createAt: Date
  }

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

interface IReponse {
        count: number,
        transaction: Transaction
}

interface ITableShort {
    collum: 'title' | 'amount' | 'category' | 'createAt' 
    direction: 'asc' | 'desc'
}

interface ITransationRepository {
    create({title, amount, category, type}: ITransactionDTO): Promise<void>
    list(tableShort: ITableShort, take?: number, skip?: number)
    summary(): Promise<ISummary>
}

export { IReponse, ISummary, ITableShort, ITransactionDTO, ITransationRepository }

