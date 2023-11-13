import React from 'react'

const varillants = {
  style: {
    outline: "border border-primary rounded-md uppercase",
    filled: "border border-primary bg-primary rounded-md uppercase",
    rounded: "bg-gradient-to-tl from-primary to-[#94bfff] rounded-full uppercase hover:text-white"
  },
  size: {
    medium: "px-5 py-2 text-sm me-5",
    large: "px-8 py-4 text-xl"
  }
}

function Button(props) {
  return (
    <button className={`hover:bg-white hover:text-primary hover:border-white transition-all ease-in-out ${varillants.style[props.style]} ${props.color} ${varillants.size[props.size]} ${props.extraClassNames}`}>{props.content}</button>
  )
}

export default Button