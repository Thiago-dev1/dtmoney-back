import { container } from 'tsyringe'

import { ITransactionRepository } from '../../modules/transactions/repositories/ITransactionRepository'
import { TransactionRepository } from '../../modules/transactions/repositories/implementations/TransactionRepository'
import { IUserRepository } from '../../modules/users/repositories/IUserRepository'
import { UserRepository } from '../../modules/users/repositories/implementations/UserRepository'

import ICategoryRepository from '../../modules/categories/repositories/ICategoryRepository'
import { CategoryRepository } from '../../modules/categories/repositories/implementations/CategoryRepository'

import IRequestLogRepository from '../../modules/requestLog/repositories/IRequestLogRepository'
import { RequestLogRepository } from '../../modules/requestLog/repositories/implementations/RequestLogRepository'

import { CreateUserValidation } from '../../modules/users/utils/validations/createUser'
import './services/index'

container.registerSingleton<CreateUserValidation>(
	'CreateUserValidation',
	CreateUserValidation,
)

container.registerSingleton<ITransactionRepository>(
	'TransactionRepository',
	TransactionRepository,
)

container.registerSingleton<ICategoryRepository>(
	'CategoryRepository',
	CategoryRepository,
)

container.registerSingleton<IRequestLogRepository>(
	'RequestLogRepository',
	RequestLogRepository,
)

container.registerSingleton<IUserRepository>('UserRepository', UserRepository)
