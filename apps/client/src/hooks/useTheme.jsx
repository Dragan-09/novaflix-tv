import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { darkModeActions } from "../features/dark-mode/dark-mode-slice";

function useTheme() {
  const dispatch = useDispatch();
  const currentMode = "dark"; /* localStorage.getItem("dark-mode"); */
  const isDarkMode = useSelector(state => state.mode.isDarkMode);

  const toggleDarkMode = () => {
    if (isDarkMode) {
      dispatch(darkModeActions.lightMode());
      localStorage.setItem("dark-mode", "light");
      document.documentElement.classList.remove("dark");
    } else {
      dispatch(darkModeActions.darkMode());
      localStorage.setItem("dark-mode", "dark");
      document.documentElement.classList.add("dark");
    }
  };

  useEffect(_ => {
    if (currentMode === "dark") {
      dispatch(darkModeActions.darkMode());
      document.documentElement.classList.add("dark");
    } else {
      dispatch(darkModeActions.lightMode());
      document.documentElement.classList.remove("dark");
    }
  }, []);

  return [toggleDarkMode];
}

export default useTheme;
