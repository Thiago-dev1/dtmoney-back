declare namespace Express {
	export interface Request {
		userGoogle: {
			name?: string
			email?: string
			picture?: string
			_id?: string
			spreadsheetId?: string
			tabName?: string
		}
	}
}
