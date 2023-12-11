import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth/auth-slice";
import darkModeSlice from "./dark-mode/dark-mode-slice";

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    mode: darkModeSlice.reducer,
  },
});

export default store;
