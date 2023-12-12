import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: false,
    showAccount: false,
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
    toggleShowAccount: (state) => {
      state.showAccount = !state.showAccount;
    },
    hideAccount: (state) => {
      if (state.showAccount) {
        state.showAccount = false;
      }
    },
    showAccount: (state) => {
      if (!state.showAccount) {
        state.showAccount = true;
      }
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice;
