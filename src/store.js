import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import hoursReducer from "./features/hours/hoursSlice";

// REDUX-PERSIST
import autoMergeLevel1 from "redux-persist/lib/stateReconciler/autoMergeLevel1";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web

import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE
} from "redux-persist";

// persist config obj
// blacklist a store attribute using it's reducer name. Blacklisted attributes will not persist. (I did not find a way to blacklist specific values)
const persistConfig = {
  key: "AdzUp-Calc",
  version: 1,
  storage: storage
  // stateReconciler: autoMergeLevel1
};

const persistedReducer = persistReducer(persistConfig, hoursReducer);

const store = configureStore({
  reducer: {
    hours: persistedReducer
  },
  devTools: process.env.NODE_ENV !== "production"
});

export const persistor = persistStore(store);
export default store;
