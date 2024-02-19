import { container } from 'tsyringe'

import { ITransationRepository } from '../../modules/transactions/repositories/ITransationRepository'
import { TransationRepository } from '../../modules/transactions/repositories/implementations/TransationRepository'
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

container.registerSingleton<ITransationRepository>(
	'TransationRepository',
	TransationRepository,
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
