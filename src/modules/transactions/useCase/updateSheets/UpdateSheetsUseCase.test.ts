// Importando as dependências necessárias
import 'reflect-metadata'
import { GoogleSheets } from '../../../../services/sheets/googleSheets'
import { ITransactionRepository } from '../../repositories/ITransactionRepository'
import { UpdateSheetsUseCase } from './UpdateSheetsUseCase'

// Criando um mock para a classe GoogleSheets
jest.mock('../../../../services/sheets/googleSheets', () => {
	return {
		GoogleSheets: jest.fn().mockImplementation(() => {
			return {
				writeSheet: jest.fn().mockResolvedValue({
					/* Você pode colocar aqui um valor que represente uma resposta bem-sucedida da API, se necessário */
				}),
			}
		}),
	}
})

// Definindo um bloco de testes para a classe UpdateSheetsUseCase
describe('UpdateSheetsUseCase', () => {
	let updateSheetsUseCase: UpdateSheetsUseCase
	let transactionRepositoryMock: jest.Mocked<ITransactionRepository>
	let googleSheetsMock: GoogleSheets

	// Antes de cada teste, criamos novas instâncias dos mocks e da classe UpdateSheetsUseCase
	beforeEach(() => {
		transactionRepositoryMock = {
			create: jest.fn().mockResolvedValue(undefined),
			list: jest.fn().mockResolvedValueOnce({
				all: [
					{
						title: 'transaction1',
						amount: 100,
						category: { title: 'Category 1', _id: '1' },
						createdAt: new Date('2021-01-01 00:00:00'),
						type: 'withdraw',
						userId: '1',
						_id: '1',
					},
				],
				count: 1,
			}),
			summary: jest.fn().mockResolvedValue(undefined),
			find: jest.fn().mockResolvedValue([]),
		} as jest.Mocked<ITransactionRepository>

		googleSheetsMock = new GoogleSheets()

		updateSheetsUseCase = new UpdateSheetsUseCase(
			transactionRepositoryMock,
			googleSheetsMock,
		)
	})

	// Teste para verificar se a planilha é atualizada com sucesso
	it('should successfully update the sheet', async () => {
		const userId = 'user1'
		const spreadsheetId = 'spreadsheet1'
		const tabName = 'tab1'

		const result = await updateSheetsUseCase.execute(
			userId,
			spreadsheetId,
			tabName,
		)

		// Verificando se o resultado é o esperado
		expect(result).toEqual([
			['transaction1', 100, 'Category 1', '01/01/2021', 'withdraw'],
		])
		// Verificando se o método list foi chamado com os argumentos corretos
		expect(transactionRepositoryMock.list).toHaveBeenCalledWith(userId, {
			collum: 'createAt',
			direction: 'asc',
		})
		// Verificando se o método writeSheet foi chamado com os argumentos corretos
		expect(googleSheetsMock.writeSheet).toHaveBeenCalledWith(
			[['transaction1', 100, 'Category 1', '01/01/2021', 'withdraw']],
			spreadsheetId,
			'A2:E2',
			tabName,
		)
	})

	// Teste para verificar se um erro é lançado quando o spreadsheetId ou tabName não são fornecidos
	it('should throw an error if spreadsheetId or tabName is not provided', async () => {
		await expect(
			updateSheetsUseCase.execute('user1', '', ''),
		).rejects.toThrow('SpreadsheetId e tabName são obrigatórios')
	})
})
