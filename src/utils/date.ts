// Class que irá conter métodos para manipulação de datas

type ILocale = 'pt-br' | 'en-us' | 'es' | 'fr' | 'de' | 'it'

class DateUtil {
	formatDate(date: Date, locale: ILocale = 'pt-br'): string {
		return new Intl.DateTimeFormat(locale).format(date)
	}
}

export default new DateUtil()
