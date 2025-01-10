import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import enTranslations from './locales/en.json';
import ltTranslations from './locales/lt.json';
import lvTranslations from './locales/lv.json';
import etTranslations from './locales/et.json';
import frTranslations from './locales/fr.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: enTranslations,
      },
      lt: {
        translation: ltTranslations,
      },
      lv: {
        translation: lvTranslations,
      },
      et: {
        translation: etTranslations,
      },
      fr: {
        translation: frTranslations,
      },
    },
    fallbackLng: 'en',
    debug: process.env.NODE_ENV === 'development',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;