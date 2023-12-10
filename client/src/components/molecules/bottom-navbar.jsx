import React, { useContext } from "react";
import Icon from "../atoms/icon";
import useTheme from "../../hooks/useTheme";
import { ThemeContext } from "../../App";

function BottomNavbar() {
  const [isDarkMode, onToggleTheme] = useContext(ThemeContext);

  const navlinks = [
    { name: "home", icon: "home", link: "/" },
    { name: "categories", icon: "categories", link: "/#plans" },
    { name: "mode", icon: isDarkMode == true ? "light" : "dark" },
    { name: "cuisine", icon: "cuisine", link: "" },
    { name: "signin", icon: "signin", link: "/auth/login" },
  ];

  return (
    <div className="fixed bottom-0 left-0 flex sm:hidden bg-white h-14 w-screen z-20 grid grid-cols-5">
      {navlinks.map((navlink) => {
        return (
          <a
            className="w-full h-14 flex items-center justify-center p-3"
            href={navlink.link || null}
            onClick={
              navlink.name === "mode" ? (_) => onToggleTheme(isDarkMode) : null
            }
            key={navlink.name}
          >
            <Icon icon={navlink.icon} className="h-full" />
          </a>
        );
      })}
    </div>
  );
}

export default BottomNavbar;
