import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: false,
    showAccount: false,
    showMobileAccount: false,
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
    toggleShowAccount: (state, action) => {
      if (action.payload.normal) {
        state.showAccount = !state.showAccount;
      }
      if (action.payload.mobile) {
        state.showBottomAccount = !state.showBottomAccount;
      }
    },
    hideAccount: (state, action) => {
      if (state.showAccount && action.payload.normal) {
        state.showAccount = false;
      }
      if (state.showBottomAccount && action.payload.mobile) {
        state.showBottomAccount = false;
      }
    },
    showAccount: (state, action) => {
      if (!state.showAccount && action.payload.normal) {
        state.showAccount = true;
      }
      if (!state.showBottomAccount && action.payload.mobile) {
        state.showBottomAccount = true;
      }
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice;
