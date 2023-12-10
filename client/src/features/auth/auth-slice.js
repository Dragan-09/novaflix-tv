import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: false,
    full_name: null,
    username: null,
    plan: null,
  },
  reducers: {
    login: (state, action) => {
      const { first_name, last_name, plan, username } = action.payload;
      state.isLoggedIn = true;
      state.full_name = `${first_name} ${last_name}`;
      state.username = username;
      state.plan = plan;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.full_name = null;
      state.username = null;
      state.plan = null;
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice;
