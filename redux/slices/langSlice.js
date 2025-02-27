import { createSlice } from "@reduxjs/toolkit";
import { detectUserLanguage } from "../../utils/getLocalLanguage";
import { getLanguageJsonData } from "../../services/operations/translation";

const detectedLang = detectUserLanguage();

let initialState = {
  lang: detectedLang,
  langJsonData: {},
};

// Fetch language JSON automatically on slice initialization
(async () => {
  try {
    const data = await getLanguageJsonData(detectedLang);

    initialState = { lang: detectedLang, langJsonData: data }; // Set JSON data before slice initializes
  } catch (error) {
    console.error("Failed to fetch language data:", error);
  }
})();

export const langSlice = createSlice({
  name: "lang",
  initialState,
  reducers: {
    setLang: (state, action) => {
      state.lang = action.payload;
    },
    setLangJsonData: (state, action) => {
      state.langJsonData = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setLang, setLangJsonData } = langSlice.actions;

export default langSlice.reducer;
