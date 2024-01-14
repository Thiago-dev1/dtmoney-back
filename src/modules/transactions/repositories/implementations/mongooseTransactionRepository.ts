
import { TransactionModel } from '../../../../models/transaction'
import { ISummary, ITransactionDTO, ITransationRepository } from "../ITransationRepository"


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
    async list(type?: string, take?: number, skip?: number) {
        const match = {}

        if(type === 'deposit'){
            match['amount'] = {
                $gt: 0
            }
        }

        if(type === 'withdraw'){
            match['amount'] = {
                $lt: 0
            }
        }

        const [count, all] = await Promise.all([
            TransactionModel.countDocuments(match),
            TransactionModel.find(match).sort({createAt: 'desc'}).skip(skip).limit(take).lean()
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

