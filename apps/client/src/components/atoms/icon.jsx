import React from "react";
import { IoHome, IoSunny } from "react-icons/io5";
import { BiSolidCategory } from "react-icons/bi";
import { HiUserCircle, HiHome } from "react-icons/hi";
import { WiMoonAltFirstQuarter } from "react-icons/wi";
import { GiPriceTag } from "react-icons/gi";
import { VscSignIn } from "react-icons/vsc";
import { PiEyeClosedLight } from "react-icons/pi";
import { VscEye } from "react-icons/vsc";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";
import { VscFeedback } from "react-icons/vsc";
import { BiSupport } from "react-icons/bi";
import { TbProgressHelp } from "react-icons/tb";
import { RxUpdate } from "react-icons/rx";
import { MdOutlineSecurity, MdOutlineHighQuality } from "react-icons/md";
import { GiCheckMark } from "react-icons/gi";
import { FaWhatsapp } from "react-icons/fa";
import { FaCreditCard } from "react-icons/fa";
import { FaPaypal } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaEnvelope } from "react-icons/fa";

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
    basic: {
      type: "img",
      src: "/images/icons/basic.png",
    },
    standard: {
      type: "img",
      src: "/images/icons/standard.png",
    },
    premium: {
      type: "img",
      src: "/images/icons/premium.png",
    },
    categories: {
      // component: <BiSolidCategory size={width} color={color} />,
      component: (
        <GiPriceTag size={width} color={color} className={className} />
      ),
    },
    light: {
      component: <IoSunny size={width} color={color} className={className} />,
    },
    dark: {
      component: (
        <WiMoonAltFirstQuarter
          size={width}
          color={color}
          className={className}
        />
      ),
    },
    signin: {
      component: <VscSignIn size={width} color={color} className={className} />,
    },
    home: {
      component: <HiHome size={width} color={color} className={className} />,
    },
    user: {
      component: (
        <HiUserCircle size={width} color={color} className={className} />
      ),
    },
    "closed-eye": {
      component: (
        <PiEyeClosedLight size={width} color={color} className={className} />
      ),
    },
    "opened-eye": {
      component: <VscEye size={width} color={color} className={className} />,
    },
    right: {
      component: (
        <FaChevronRight size={width} color={color} className={className} />
      ),
    },
    left: {
      component: (
        <FaChevronLeft size={width} color={color} className={className} />
      ),
    },
    support: {
      component: <BiSupport size={width} color={color} className={className} />,
    },
    help: {
      component: (
        <TbProgressHelp size={width} color={color} className={className} />
      ),
    },
    update: {
      component: <RxUpdate size={width} color={color} className={className} />,
    },
    payment: {
      component: (
        <MdOutlineSecurity size={width} color={color} className={className} />
      ),
    },
    quality: {
      component: (
        <MdOutlineHighQuality
          size={width}
          color={color}
          className={className}
        />
      ),
    },
    feedback: {
      component: (
        <VscFeedback size={width} color={color} className={className} />
      ),
    },
    check: {
      component: (
        <GiCheckMark size={width} color={color} className={className} />
      ),
    },
    whatsapp: {
      component: (
        <FaWhatsapp size={width} color={color} className={className} />
      ),
    },
    cart: {
      component: (
        <FaCreditCard size={width} color={color} className={className} />
      ),
    },
    paypal: {
      component: <FaPaypal size={width} color={color} className={className} />,
    },
    instagram: {
      component: (
        <FaFacebook size={width} color={color} className={className} />
      ),
    },
    facebook: {
      component: (
        <FaInstagram size={width} color={color} className={className} />
      ),
    },
    envelope: {
      component: (
        <FaEnvelope size={width} color={color} className={className} />
      ),
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
          className={className}>
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
