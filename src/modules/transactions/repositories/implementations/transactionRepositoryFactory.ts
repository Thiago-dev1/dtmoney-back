import { ITransationRepository } from '../ITransationRepository';
import { MongooseTransactionRepository } from './mongooseTransactionRepository';
import { PrismaTransactionRepository } from "./prismaTransactionRepository ";

class TransactionRepositoryFactory {
    static createRepository(type: 'prisma' | 'mongoose'): ITransationRepository {
      if (type === 'prisma') {
        return new PrismaTransactionRepository();
      } else if (type === 'mongoose') {
        return new MongooseTransactionRepository();
      } else {
        throw new Error("Invalid repository type");
      }
    }
  }

export default TransactionRepositoryFactory;