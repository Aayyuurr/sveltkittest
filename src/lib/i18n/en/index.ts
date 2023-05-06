import type { Translation } from '../i18n-types'
import fr from '../fr'


const en: Translation = {
	// TODO: your translations go here
	...(fr as Translation),

	hi: 'Hi',
}

export default en
