
import { IUserRepository } from "../IUserRepository";
import { MongooseUserRepository } from "./mongooseUserRepository";


class UserRepositoryFactory {
    static createRepository(type: 'prisma' | 'mongoose'): IUserRepository {
      if (type === 'prisma') {
        // return new PrismaUserRepository();
        console.log('prisma')
        return 
      } else if (type === 'mongoose') {
        return new MongooseUserRepository();
      } else {
        throw new Error("Invalid repository type");
      }
    }
  }

export default UserRepositoryFactory;