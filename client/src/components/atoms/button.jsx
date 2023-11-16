import React from 'react'

function Button({style, color, size, content, className, link}) {
  const varillants = {
    color: {
      primary: {
        outline: "border-primary text-primary",
        filled: "bg-primary text-white"
      },
      white: {
        outline: "border-white text-white",
        filled: "bg-white text_white"
      }
    },
    style: {
      outline: `border rounded-md uppercase`,
      filled: `border border-primary rounded-md uppercase`,
      rounded: "bg-gradient-to-tl from-secondary to-primary rounded-full uppercase text-white hover:text-white"
    },
    size: {
      medium: "px-5 py-2 text-sm me-5",
      large: "px-8 py-4 text-xl"
    }
  }

  const _style = varillants.style[style],
        _size = varillants.size[size],
        _color = ["outline", "filled"].includes(style) ? varillants.color[color][style] : ""

  return (
    <button className={`hover:bg-white hover:text-primary hover:border-white transition-all ease-in-out ${_color} ${_style} ${_size} ${className}`}>
      {link ? <a href={link}>{content}</a> : content}
    </button>
  )
}

export default Button