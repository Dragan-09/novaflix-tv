import React from 'react'

function Icon({height, width, className, icon, type, src}) {
  const icons = {
    scroll_mouse: {
      type: "svg",
      viewBox: "0 0 512.000000 512.000000",
      ratio: "xMidYMid meet",
      children: (<g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)" stroke="none">
        <path d="M2118 5030 c-318 -49 -580 -269 -684 -572 -44 -131 -45 -162 -42 -1133 3 -845 5 -925 21 -979 52 -175 104 -263 232 -391 89 -90 112 -107 205 -153 190 -95 199 -96 690 -97 379 0 433 2 504 18 310 73 545 293 638 597 l23 75 3 945 c3 936 3 946 -18 1038 -70 305 -307 549 -616 634 -75 20 -102 22 -489 24 -225 1 -436 -2 -467 -6z m880 -176 c204 -41 383 -180 477 -369 68 -138 66 -102 63 -1143 l-3 -937 -31 -81 c-80 -207 -229 -350 -439 -422 l-80 -27 -425 0 c-375 0 -432 2 -489 18 -243 67 -430 255 -491 493 -19 74 -20 114 -20 984 0 863 1 910 19 982 67 262 273 454 542 507 24 5 214 9 422 10 307 1 392 -2 455 -15z" />
        <path d="M2513 4220 c-40 -16 -43 -39 -43 -293 0 -242 0 -244 23 -265 32 -30 87 -29 115 1 21 23 22 30 22 269 0 219 -2 248 -17 267 -21 24 -68 35 -100 21z" />
        <path d="M2508 1354 c-16 -8 -29 -16 -30 -17 -2 -1 -5 -228 -8 -505 l-5 -502 -184 160 c-101 89 -192 165 -202 171 -31 16 -60 10 -90 -20 -33 -34 -38 -75 -11 -107 25 -30 499 -446 533 -468 18 -11 38 -16 53 -12 21 5 516 429 559 478 52 61 -24 164 -96 130 -12 -5 -105 -83 -207 -172 l-185 -162 -5 504 c-3 276 -6 504 -8 505 -9 9 -63 33 -74 33 -7 -1 -25 -8 -40 -16z" />
      </g>)
    },
    sport: {
      type: "img",
      src: "images/icons/sport.png",
    },
    cuisine: {
      type: "img",
      src: "images/icons/cuisine.png",
    },
    movies: {
      type: "img",
      src: "images/icons/movies.png",
    },
    documentary: {
      type: "img",
      src: "images/icons/documentary.png",
    },
    news: {
      type: "img",
      src: "images/icons/news.png",
    },
    other: {
      type: "img",
      src: "images/icons/other.png",
    },
    categories: {
      type: "img",
      src: "images/icons/categories.png"
    },
    light: {
      type: "img",
      src: "images/icons/light.png"
    },
    dark: {
      type: "img",
      src: "images/icons/dark.png"
    },
    signin: {
      type: "img",
      src: "images/icons/signin.png"
    },
    home: {
      type: "img",
      src: "images/icons/home.png"
    }
  }
  let _icon = icons[icon]
  console.log(icon)
  switch (_icon.type) {
    case "svg":
      return <svg 
        version="1.0"
        xmlns='http://www.w3.org/2000/svg'
        preserveAspectRatio="xMidYMid meet"
        viewBox={_icon.viewBox}
        width={width}
        height={height}
        className={className}
      >
        {_icon.children}
      </svg>
    case "img":
    default:
      return <img src={_icon.src} width={width} height={height} className={className} alt={icon} />
    }
}

export default Icon