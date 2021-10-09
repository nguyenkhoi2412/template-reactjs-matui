import { createSlice } from "@reduxjs/toolkit";

// const { i18n } = useTranslation();
// export const changeLanguage = (language) => {
//   i18n.changeLanguage(language);
// };

export const lang = createSlice({
  name: "lang",
  initialState: {
    code: "en",
    name: "English",
  },
  reducers: {
    CHANGE_LANGUAGES: (state, action) => {
      //changeLanguage(action.payload.language);
      return {
        ...state,
        lang: action.payload,
      };
    },
  },
});

// export actions to use
export const { CHANGE_LANGUAGES } = lang.actions;

//#region The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const langState = (state) => state.lang;
//#endregion

export default lang.reducer;
