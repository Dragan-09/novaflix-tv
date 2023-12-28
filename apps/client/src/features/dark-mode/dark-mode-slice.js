import { createSlice } from "@reduxjs/toolkit";

const darkModeSlice = createSlice({
  name: "mode",
  initialState: {
    isDarkMode: true,
  },
  reducers: {
    darkMode: state => {
      state.isDarkMode = true;
    },
    lightMode: state => {
      state.isDarkMode = false;
    },
  },
});

export const darkModeActions = darkModeSlice.actions;
export default darkModeSlice;
