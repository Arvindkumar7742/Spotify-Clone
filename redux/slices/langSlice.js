import { createSlice } from "@reduxjs/toolkit";
import { detectUserLanguage } from "../../utils/getLocalLanguage";

const initialState = {
  lang: detectUserLanguage(),
  langJsonData: {},
};

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
