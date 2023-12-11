import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: false,
    account: {
      full_name: null,
      username: null,
      plan: null,
    },
  },
  reducers: {
    login: (state, action) => {
      const { first_name, last_name, plan, username } = action.payload;
      state.isLoggedIn = true;
      state.account = {
        full_name: `${first_name} ${last_name}`,
        username: username,
        plan: plan,
      };
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.account = {
        full_name: null,
        username: null,
        plan: null,
      };
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice;
