import React from 'react'

const varillants = {
  style: {
    outline: "border border-primary rounded-md uppercase",
    filled: "border border-primary bg-primary rounded-md uppercase"
  },
  size: {
    medium: "px-5 py-2 text-sm me-5"
  }
}

function Button(props) {
  return (
    <button className={`hover:bg-white hover:text-primary hover:border-white transition-all ease-in-out ${varillants.style[props.style]} ${props.color} ${varillants.size[props.size]}`}>{props.content}</button>
  )
}

export default Button