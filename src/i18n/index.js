import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import fr from "./fr.json";
import en from "./en.json";
import ar from "./ar.json";

i18n.use(initReactI18next).init({
  resources: {
    fr: { translation: fr },
    en: { translation: en },
    ar: { translation: ar }
  },
  lng: "fr", // Default language
  fallbackLng: "fr", // Fallback language if key not found
  interpolation: {
    escapeValue: false // React already escapes by default
  }
});

export default i18n;
