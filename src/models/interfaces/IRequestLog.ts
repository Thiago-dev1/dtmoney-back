export default interface IRequestLog {
	request: 'update-sheets'
	userId: string
	created: Date
	type: 'GET' | 'POST' | 'PUT' | 'DELETE'
}
