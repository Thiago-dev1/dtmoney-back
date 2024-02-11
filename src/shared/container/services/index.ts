import { container } from 'tsyringe'
import { GoogleSheets } from '../../../services/sheets/googleSheets'

container.registerSingleton<GoogleSheets>('GoogleSheets', GoogleSheets)
