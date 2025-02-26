import { createContext, useEffect, useState } from "react";
import { getLanguageJsonData } from "../services/operations/translation";

const TranslationContext = createContext();

const TranslationContextProvider = ({ children }) => {
  const [lang, setLang] = useState("de");
  const [langJsonData, setLangJsonData] = useState({});

  // function to fetch all liked songs
  const fetchLanguageJsonData = async () => {
    try {
      const result = await getLanguageJsonData(lang);

      if (result) {
        setLangJsonData(result);
      }
    } catch (err) {
      Alert.alert("Error", err.message);
    }
  };

  useEffect(() => {
    fetchLanguageJsonData();
  }, [lang]);
  return (
    <TranslationContext.Provider value={{ lang, setLang, langJsonData }}>
      {children}
    </TranslationContext.Provider>
  );
};

export { TranslationContext, TranslationContextProvider };
