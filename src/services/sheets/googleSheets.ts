import { google } from 'googleapis'

class GoogleSheets {
	async authSheets() {
		const auth = new google.auth.GoogleAuth({
			keyFile: 'credentials.json',
			scopes: ['https://www.googleapis.com/auth/spreadsheets'],
		})

		const client = await auth.getClient()

		return google.sheets({ version: 'v4', auth: client })
	}

	async readSheet() {
		const sheets = await this.authSheets()

		const response = await sheets.spreadsheets.values.get({
			// Substitua pelo ID do seu Google Sheets e pelo range que deseja ler
			spreadsheetId: '1Rt8IYf504YoN3oOdGjynDA1-tuxIciygALhja5iCtmQ', // ID da planilha
			range: 'test!A1:C2', // 'test' é o nome da aba e 'A1:C2' é o range
		})

		console.log(response.data)
	}

	async writeSheet(
		data: any[],
		spreadsheetId: string,
		range: string,
		tabName: string,
		valueInputOption: 'RAW' | 'USER_ENTERED' = 'RAW',
	) {
		const sheets = await this.authSheets()

		const values = data

		const resource = {
			values,
		}

		// deverá colocar do A:2 até o tamanho do array e E:2 até o tamanho do array
		// const range = `test!A2:E${length + 1}`

		const response = await sheets.spreadsheets.values.update({
			// Substitua pelo ID do seu Google Sheets e pelo range que deseja escrever
			spreadsheetId: spreadsheetId, // ID da planilha
			range: `${tabName}!${range}`, // 'tabName' é o nome da aba e 'A1:C2' é o range
			valueInputOption,
			requestBody: resource,
		})

		console.log(response.data)
	}
}

export { GoogleSheets }
//
