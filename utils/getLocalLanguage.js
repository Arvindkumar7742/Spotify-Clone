import * as Localization from "expo-localization";

export const detectUserLanguage = () => {
  const deviceLang = Localization.locale.split("-")[0];
  const supportedLanguages = ["en", "hi", "de"];

  if (supportedLanguages.includes(deviceLang)) {
    return deviceLang;
  }
  return "en";
};
