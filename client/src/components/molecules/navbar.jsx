import React, { useContext } from "react";
import Navlink from "../atoms/navlink";
import Button from "../atoms/button";
import Brand from "../atoms/brand";
import { ThemeContext } from "../../App";
import Icon from "../atoms/icon";
import UserDropdown from "./user-dropdown";
import { useState } from "react";
import OutsideClickHandler from "react-outside-click-handler";
import { useSelector } from "react-redux";
import { current } from "@reduxjs/toolkit";

const navlinks = [
  {
    name: "Home",
    url: "/",
  },
  {
    name: "Plans",
    url: "/#plans",
  },
  {
    name: "Register",
    url: "/auth/register",
  },
  {
    name: "Contact",
    url: "https://something.com",
  },
  {
    name: "About",
    url: "https://something.com",
  },
];

function Navbar() {
  const [isDarkMode, toggleDarkMode] = useContext(ThemeContext);
  const [showAccountInfo, setShowAccountInfo] = useState(false);
  const userInfoBoxHandler = (currentStatus) =>
    setShowAccountInfo(!currentStatus);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const full_name = useSelector((state) => state.auth.full_name);
  const username = useSelector((state) => state.auth.username);
  const current_plan = useSelector((state) => state.auth.plan);
  console.log(current_plan);
  return (
    <div className="navbar hidden md:flex items-center h-[40px] sm:h-[100px] py-0 sm:py-5 ">
      <div className="logo h-full aspect-square ms-5">
        <Brand />
      </div>
      <div className="navlinks hidden md:flex mx-[150px] text-sm grow justify-center uppercase">
        {navlinks.map((navlink, index) => (
          <Navlink key={index} name={navlink.name} url={navlink.url} />
        ))}
      </div>
      <div className="side-item hidden lg:flex">
        {!isLoggedIn ? (
          <>
            {/* Buttons */}
            <Button
              content="Register"
              color="primary"
              size="medium"
              style="outline"
              link="/auth/login"
              className="me-4"
            >
              Sign in
            </Button>
          </>
        ) : (
          <OutsideClickHandler onOutsideClick={(_) => userInfoBoxHandler(true)}>
            <div className="relative me-4">
              <Button
                color={"white"}
                size={"medium"}
                style={"filled"}
                className={""}
                onClick={(_) => userInfoBoxHandler(showAccountInfo)}
              >
                <span>My Account</span>
              </Button>
              {showAccountInfo && (
                <div className="absolute top-full right-0 pt-2">
                  <UserDropdown
                    full_name={full_name}
                    username={username}
                    current_plan={
                      current_plan && {
                        name: current_plan.name,
                        end_date: current_plan.ends_at.split("T")[0],
                        status: current_plan.status,
                      }
                    }
                  />
                </div>
              )}
            </div>
          </OutsideClickHandler>
        )}
        <Button
          color="white"
          size="medium"
          style={"filled"}
          className="me-4"
          onClick={(_) => toggleDarkMode(isDarkMode)}
        >
          {isDarkMode ? (
            <Icon icon={"light"} className={"h-[20px]"} />
          ) : (
            <Icon icon={"dark"} className={"h-[20px]"} />
          )}
        </Button>
      </div>
    </div>
  );
}

export default Navbar;
