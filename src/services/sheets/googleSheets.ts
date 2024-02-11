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

	async writeSheet(data: any[]) {
		const sheets = await this.authSheets()

		const values = data

		const resource = {
			values,
		}

		// fazer o range ser dinâmico para sempre escrever o tamanho correto

		const length = data.length

		// deverá colocar do A:2 até o tamanho do array e E:2 até o tamanho do array
		const range = `test!A2:E${length + 1}`

		const response = await sheets.spreadsheets.values.update({
			// Substitua pelo ID do seu Google Sheets e pelo range que deseja escrever
			spreadsheetId: '1Rt8IYf504YoN3oOdGjynDA1-tuxIciygALhja5iCtmQ', // ID da planilha
			range: range, // 'test' é o nome da aba e 'A1:C2' é o range
			valueInputOption: 'RAW',
			requestBody: resource,
		})

		console.log(response.data)
	}
}

export { GoogleSheets }
//
