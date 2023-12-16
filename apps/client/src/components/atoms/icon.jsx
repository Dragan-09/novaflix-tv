import React from "react";
import { IoHome, IoSunny } from "react-icons/io5";
import { BiSolidCategory } from "react-icons/bi";
import { HiUserCircle } from "react-icons/hi";
import { HiHome } from "react-icons/hi";
import { WiMoonAltFirstQuarter } from "react-icons/wi";
import { GiPriceTag } from "react-icons/gi";
import { VscSignIn } from "react-icons/vsc";
import { PiEyeClosedLight } from "react-icons/pi";
import { VscEye } from "react-icons/vsc";

function Icon({ height, width, className, icon, type, src, color }) {
  const icons = {
    sport: {
      type: "img",
      src: "/images/icons/sport.png",
    },
    cuisine: {
      type: "img",
      src: "/images/icons/cuisine.png",
    },
    movies: {
      type: "img",
      src: "/images/icons/movies.png",
    },
    documentary: {
      type: "img",
      src: "/images/icons/documentary.png",
    },
    news: {
      type: "img",
      src: "/images/icons/news.png",
    },
    other: {
      type: "img",
      src: "/images/icons/other.png",
    },
    categories: {
      // component: <BiSolidCategory size={width} color={color} />,
      component: <GiPriceTag size={width} color={color} />,
    },
    light: {
      component: <IoSunny size={width} color={color} />,
    },
    dark: {
      component: <WiMoonAltFirstQuarter size={width} color={color} />,
    },
    signin: {
      component: <VscSignIn size={width} color={color} />,
    },
    home: {
      component: <HiHome size={width} color={color} />,
    },
    user: {
      component: <HiUserCircle size={width} color={color} />,
    },
    "closed-eye": {
      component: <PiEyeClosedLight size={width} color={color} />,
    },
    "opened-eye": {
      component: <VscEye size={width} color={color} />,
    },
  };
  let _icon = icons[icon];
  switch (_icon.type) {
    case "svg":
      return (
        <svg
          version="1.0"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid meet"
          viewBox={_icon.viewBox}
          width={width}
          height={height}
          className={className}
        >
          {_icon.children}
        </svg>
      );
    case "img":
      return (
        <img
          src={_icon.src}
          width={width}
          height={height}
          className={className}
          alt={icon}
        />
      );
    default:
      return _icon.component;
  }
}

export default Icon;