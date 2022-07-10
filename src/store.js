import { configureStore } from "@reduxjs/toolkit";
import hoursReducer from "./features/hours/hoursSlice";

export const store = configureStore({
  reducer: {
    hours: hoursReducer
  },
  devTools: process.env.NODE_ENV !== "production"
});
