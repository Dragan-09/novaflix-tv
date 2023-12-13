import React, { useContext, useRef, useState } from "react";
import Icon from "../atoms/icon";
import useTheme from "../../hooks/useTheme";
import { useDispatch, useSelector } from "react-redux";
import UserDropdown from "./user-dropdown";
import { authActions } from "../../features/auth/auth-slice";
import OutsideClickHandler from "react-outside-click-handler";

function BottomNavbar() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  // const [showBottomAccount, setShowBottomAccount] = useState(false);
  const showBottomAccount = useSelector(
    (state) => state.auth.showBottomAccount
  );
  const isDarkMode = useSelector((state) => state.mode.isDarkMode);
  const [toggleDarkMode] = useTheme();
  const bottomNavbarRef = useRef(null);
  const dispatch = useDispatch();
  const {
    full_name,
    username,
    plan: current_plan,
  } = useSelector((state) => state.auth.account);

  const navlinks = [
    { name: "home", icon: "home", link: "/" },
    { name: "categories", icon: "categories", link: "/#plans" },
    {
      name: "mode",
      icon: isDarkMode == true ? "light" : "dark",
      onClick: () => toggleDarkMode(),
    },
    {
      name: "signin",
      icon: isLoggedIn ? "user" : "signin",
      link: !isLoggedIn && "/auth/login",
      onClick:
        isLoggedIn &&
        (() => dispatch(authActions.toggleShowAccount({ mobile: true }))),
    },
  ];

  return (
    <>
      <OutsideClickHandler
        onOutsideClick={() =>
          dispatch(authActions.hideAccount({ mobile: true }))
        }
      >
        <div ref={bottomNavbarRef}>
          {showBottomAccount && (
            <UserDropdown
              className={"sm:hidden"}
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
          )}
          <div className="fixed bottom-0 left-0 flex sm:hidden bg-white h-14 w-screen z-20 grid grid-cols-4">
            {navlinks.map((navlink) => {
              return (
                <a
                  className="w-full h-14 flex items-center justify-center p-3"
                  href={navlink.link || null}
                  onClick={navlink.onClick || null}
                  key={navlink.name}
                >
                  <Icon
                    icon={navlink.icon}
                    className="h-full"
                    width={32}
                    color={"#333"}
                  />
                </a>
              );
            })}
          </div>
        </div>
      </OutsideClickHandler>
    </>
  );
}

export default BottomNavbar;
