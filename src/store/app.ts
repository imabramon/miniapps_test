import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Lang } from "../types";
import { RootState } from ".";
import { useDispatch, useSelector } from "react-redux";

interface AppState {
  language: Lang;
}

// Начальное состояние
const initialState: AppState = {
  language: "en", // по умолчанию, например, 'en'
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setLanguage(state, action: PayloadAction<Lang>) {
      state.language = action.payload;
    },
  },
});

export const selectLanguage = (state: RootState): Lang => state.app.language;

export const { setLanguage } = appSlice.actions;

export const useLanguage = (): [Lang, (language: Lang) => void] => {
  const dispatch = useDispatch();
  const language = useSelector(selectLanguage);
  const updateLanguage = (newLanguage: Lang) =>
    dispatch(setLanguage(newLanguage));
  return [language, updateLanguage];
};

export default appSlice.reducer;
