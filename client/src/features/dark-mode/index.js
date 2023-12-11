import { configureStore } from "@reduxjs/toolkit";
import darkModeSlice from "./dark-mode-slice";

const darkModeStore = configureStore({
  reducer: {
    mode: darkModeSlice.reducer,
  },
});

export default darkModeStore;
