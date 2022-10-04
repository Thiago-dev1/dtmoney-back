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

        if (type === "deposit") {
            await prisma.transaction.create({
                data: {
                    title,
                    amount,
                    category
                }
            })
        }

    }

    async list(type?: string, take?: number, skip?: number) {

        if (type === "deposit") {
            const [count, all] = await prisma.$transaction([
                prisma.transaction.count({
                    where: {
                        amount: {
                            gt: 0
                        }
                    },
                }), prisma.transaction.findMany({
                    take,
                    skip,
                    where: {
                        amount: {
                            gt: 0
                        }
                    },
                    orderBy: {
                        createAt: 'desc'
                    },
                })])

            const transaction = {
                count,
                all
            }

            return transaction
        } else if (type === "withdraw") {
            const [count, all] = await prisma.$transaction([
                prisma.transaction.count({
                    where: {
                        amount: {
                            lt: 0
                        }
                    },
                }), prisma.transaction.findMany({
                    take,
                    skip,
                    where: {
                        amount: {
                            lt: 0
                        }
                    },
                    orderBy: {
                        createAt: "desc"
                    }
                })])

            const transaction = {
                count,
                all
            }

            return transaction
        }

        const [count, all] = await prisma.$transaction([prisma.transaction.count(), prisma.transaction.findMany({
            take,
            skip
        })])

        const transaction = {
            count,
            all
        }

        return transaction
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