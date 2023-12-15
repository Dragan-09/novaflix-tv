import { useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import React from "react";
import { authActions } from "../features/auth/auth-slice";

export default function useAuth() {
  const dispatch = useDispatch();
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("Authorization");
      if (!token) dispatch(authActions.logout());
      try {
        const user = await axios.get(
          `${import.meta.env.VITE_API_URL}/user/account`,
          {
            headers: {
              Authorization: token,
            },
          }
        );
        if (user) dispatch(authActions.login(user.data.data));
      } catch (error) {
        dispatch(authActions.logout());
      }
    };
    checkAuth();
  }, []);
}
