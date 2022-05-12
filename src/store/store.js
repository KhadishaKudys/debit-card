import { configureStore } from "@reduxjs/toolkit";
import paymentsReducer from "./paymentsSlice";

export const store = configureStore({
  reducer: {
    payments: paymentsReducer,
  },
});
