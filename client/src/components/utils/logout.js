import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { authActions } from "../../features/auth/auth-slice";

function logoutUtil() {
  const dispatch = useDispatch();

  const logout = () => {
    dispatch(authActions.logout());
    localStorage.removeItem("Authorization");
  };

  return logout;
}

export default logoutUtil;
