import React from 'react'

function Button({style, color, size, content, className, reversed}) {
  const varillants = {
    style: {
      outline: `border rounded-md uppercase ${reversed ? "border-white" : "border-primary"}`,
      filled: `border border-primary rounded-md uppercase ${reversed ? "bg-white" : "bg-primary"}`,
      rounded: "bg-gradient-to-tl from-primary to-[#94bfff] rounded-full uppercase hover:text-white"
    },
    size: {
      medium: "px-5 py-2 text-sm me-5",
      large: "px-8 py-4 text-xl"
    }
  }

  return (
    <button className={`hover:bg-white hover:text-primary hover:border-white transition-all ease-in-out ${varillants.style[style]} ${color} ${varillants.size[size]} ${className}`}>{content}</button>
  )
}

export default Button