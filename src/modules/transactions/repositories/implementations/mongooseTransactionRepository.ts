
import { TransactionModel } from '../../../../models/transaction'
import { ISummary, ITableShort, ITransactionDTO, ITransationRepository } from "../ITransationRepository"


class MongooseTransactionRepository  implements ITransationRepository {
    async create({ title, amount, category, type }: ITransactionDTO): Promise<void> {
        console.log(`[MongooseTransactionRepository] - create - ${title} - ${amount} - ${category} - ${type}`)

       if(type === 'withdraw'){
           await TransactionModel.create({
               title,
               amount: -amount,
               category,
               type
           })
       }
         if(type === 'deposit'){
          await TransactionModel.create({
                title,
                amount,
                category,
                type
          })
         }
    }
    async list(tableShort: ITableShort, take?: number, skip?: number) {
        const sort = {}

        if(tableShort){
            sort[tableShort.collum] = tableShort.direction === 'asc' ? 1 : -1
        }

        const [count, all] = await Promise.all([
            TransactionModel.countDocuments(),
            TransactionModel.find().sort(sort).skip(skip).limit(take).lean()
        ])

        const transaction = {
            count,
            all
        }

        return transaction
        
    }
    async summary(): Promise<ISummary> {
        const deposit = await TransactionModel.aggregate([
            {
                $match: {
                    amount: {
                        $gt: 0
                    }
                }
            },
            {
                $group: {
                    _id: null,
                    total: {
                        $sum: '$amount'
                    }
                }
            }
        ])

        const withdraw = await TransactionModel.aggregate([
            {
                $match: {
                    amount: {
                        $lt: 0
                    }
                }
            },
            {
                $group: {
                    _id: null,
                    total: {
                        $sum: '$amount'
                    }
                }
            }
        ])

        const totalW = withdraw[0]?.total || 0
        const totalD = deposit[0]?.total || 0
        const total = totalD + totalW

        return {
            totalW,
            totalD,
            total
        }
    }

}

export { MongooseTransactionRepository }

