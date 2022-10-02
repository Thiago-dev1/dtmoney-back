import { Transaction } from "@prisma/client"
import { prisma } from "../../../../database/prismaClient/index"

import { ITransactionDTO, ITransationRepository, ISummary } from "../ITransationRepository"


class TransationRepository implements ITransationRepository {

    async create({ title, amount, category, type }: ITransactionDTO): Promise<void> {
        if (type === 'withdraw') {
            await prisma.transaction.create({
                data: {
                    title,
                    amount: -amount,
                    category
                }
            })
        }

        if(type === "deposit") {
            await prisma.transaction.create({
                data: {
                    title,
                    amount,
                    category
                }
            })
        }

    }

    async list(type?: string): Promise<Transaction[]> {

        if (type === "deposit") {
            const all = await prisma.transaction.findMany({
                where: {
                     amount:{
                        gt: 0
                     }
                },
                orderBy: {
                    createAt: 'desc'
                }
            })

            return all
        }else if(type === "withdraw") {
            const all = await prisma.transaction.findMany({
                where: {
                    amount: {
                        lt: 0
                    }
                },
                orderBy: {
                    createAt: "desc"
                }
            })

            return all
        }

        const all = await prisma.transaction.findMany({
            orderBy: {
                createAt: "desc"
            }
        })

        return all
    }

    async summary(): Promise<ISummary> {
        const withdraw = await prisma.transaction.findMany({
            where: {
                amount: {
                    lt: 0
                }
            },
        })

        const deposit = await prisma.transaction.findMany({
            where: {
                amount: {
                    gt: 0
                }
            },
        })

        const totalW = withdraw.map(w => w.amount).reduce((prev, curr) => prev + curr, 0)

        const totalD = deposit.map(d => d.amount).reduce((prev, curr) => prev + curr, 0)

        const total = totalD + totalW

        const summary = {
                totalW,
                totalD,
                total
        }

        return summary
    }
}

export { TransationRepository }