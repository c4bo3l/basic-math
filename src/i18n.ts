import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enUS from './translations/enUS';
import idID from './translations/idID';

const resources = {
  enUS: {
    translation: enUS
  },
  idID: {
    translation: idID
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'idID',
    fallbackLng: 'idID',
    interpolation: {
      escapeValue: false
    }
  });
