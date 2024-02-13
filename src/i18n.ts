import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "./locales/en.json";
import de from "./locales/de.json";
import fr from "./locales/fr.json";
import es from "./locales/es.json";
import it from "./locales/it.json";
import nl from "./locales/nl.json";
import ro from "./locales/ro.json";
import pt from "./locales/pt.json";
import tr from "./locales/tr.json";
import ko from "./locales/ko.json";
import zh from "./locales/zh.json";
import ru from "./locales/ru.json";

export const languages: Language[] = [
  { name: "English", code: "en" },
  { name: "German", code: "de" },
  { name: "French", code: "fr" },
  { name: "Spanish", code: "es" },
  { name: "Italian", code: "it" },
  { name: "Dutch", code: "nl" },
  { name: "Romanian", code: "ro" },
  { name: "Portuguese", code: "pt" },
  { name: "Turkish", code: "tr" },
  { name: "Korean", code: "ko" },
  { name: "Chinese", code: "zh" },
  { name: "Russian", code: "ru" },
];

// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
export const resources = {
  en: { translation: en },
  de: { translation: de },
  fr: { translation: fr },
  es: { translation: es },
  it: { translation: it },
  nl: { translation: nl },
  ro: { translation: ro },
  pt: { translation: pt },
  tr: { translation: tr },
  ko: { translation: ko },
  zh: { translation: zh },
  ru: { translation: ru },
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: "en", // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
    // you can use the i18n.changeLanguage function to change the language manually: https://www.i18next.com/overview/api#changelanguage
    // if you're using a language detector, do not define the lng option
    fallbackLng: "en",
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
