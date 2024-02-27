// Class que irá conter métodos para manipulação de datas

type ILocale = 'pt-br' | 'en-us' | 'es' | 'fr' | 'de' | 'it'

class DateUtil {
	formatDate(date: Date, locale: ILocale = 'pt-br'): string {
		// Converte a data para UTC
		// Converte a data para UTC
		const utcDate = new Date(
			Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()),
		)
		return new Intl.DateTimeFormat(locale, { timeZone: 'UTC' }).format(
			utcDate,
		)
	}
}

export default new DateUtil()
