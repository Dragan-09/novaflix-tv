import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: false,
    full_name: null,
    username: null,
    plans: null,
  },
  reducers: {
    login: (state, action) => {
      const { first_name, last_name, plans, username } = action.payload;
      state.isLoggedIn = true;
      state.full_name = `${first_name} ${last_name}`;
      state.username = username;
      state.plans = plans;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.full_name = null;
      state.username = null;
      state.plans = null;
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice;
