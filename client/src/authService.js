import { loginSuccess, logoutSuccess } from "./authSlicer";
import axios from "axios";

export const authService = {
  async login(userData) {
    const login = await axios.post(
      `${import.meta.env.VITE_API_URL}/auth/login`
    );
    const token = login.data.token;
    localStorage.setItem("Authorization", `Bearer ${token}`);
    store.dispatch(loginSuccess(token));
    return token;
  },

  async logout() {
    localStorage.removeItem("Authorization");
    store.dispatch(logoutSuccess());
  },
};
