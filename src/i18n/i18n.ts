import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import Home_En from '../locales/en/home.json'
import Home_vi from '../locales/vi/home.json'

export const locales = {
  en: 'EngLish',
  vi: 'Việt Nam'
}

const resources = {
  en: {
    home: Home_En
  },
  vi: {
    home: Home_vi
  }
}

i18n.use(initReactI18next).init({
  resources,
  lng: 'vi',
  fallbackLng: 'vi',
  ns: ['home'],
  interpolation: {
    escapeValue: false
  }
})
