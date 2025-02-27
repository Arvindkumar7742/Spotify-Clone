import { combineReducers, configureStore } from "@reduxjs/toolkit";
import langReducer from "../slices/langSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persistReducer } from "redux-persist";

const rootReducer = combineReducers({
  lang: langReducer,
});

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
};

let persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/REHYDRATE", "persist/PERSIST"],
      },
    }),
});
