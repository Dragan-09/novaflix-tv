import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth-slice";

const authStore = configureStore({
  reducer: {
    auth: authSlice.reducer,
  },
});

export default authStore;
