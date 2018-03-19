import {en} from './default/en'
import {vi} from './default/vi'

function getLanguage() {
    switch (process.env.REACT_APP_PROJECT) {
        case "DMC":
            return {
                en: en,
                vi: vi
            }
        default: 
            return {
                en,
                vi
            }
    }
}

export const translations = getLanguage();