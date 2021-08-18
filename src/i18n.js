import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./locales/en/translation.json"
import ru from "./locales/ru/translation.json"
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
    .use(initReactI18next)
    .use(LanguageDetector)
    .init({
        fallbackLng: "en",
        resources: {
            en: {
                translation: en,
            },
            ru: {
                translation: ru,
            }
        },
        react: {
            useSuspense: false
        }
    });

export default i18n;