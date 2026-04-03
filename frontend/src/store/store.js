import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth.store";
import tripReducer from "./trip.store";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    stepper: tripReducer,
  },
});
