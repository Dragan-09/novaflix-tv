import React from "react";

function Button({
  style,
  color,
  size,
  content,
  className,
  link,
  children,
  onClick,
}) {
  const varillants = {
    color: {
      primary: {
        outline: "border-primary text-primary",
        filled: "bg-primary text-white",
      },
      secondary: {
        outline: "border-secondary text-secondary",
        filled: "bg-secondary text-white",
      },
      white: {
        outline: "border-white text-white",
        filled: "bg-white text-primary",
      },
      green: {
        outline: "border-[#57C18A] text-[#57C18A]",
        filled: "bg-[#57C18A] text-white hover:bg-white hover:text-[#57C18A]",
      },
    },
    style: {
      outline: `border rounded-md capitalize font-semibold`,
      filled: `border border-transparent rounded-md capitalize font-semibold`,
      rounded:
        "bg-gradient-to-tl from-secondary to-primary rounded-full uppercase text-white hover:text-white",
    },
    size: {
      medium: "px-5 py-2 text-sm",
      large: "px-8 py-3 text-lg",
    },
  };

  const _style = varillants.style[style],
    _size = varillants.size[size],
    _color = ["outline", "filled"].includes(style)
      ? varillants.color[color][style]
      : "";

  return (
    <button
      className={`hover:bg-white hover:text-primary hover:border-white transition-all ease-in-out shadow inline-flex justify-center items-center ${_color} ${_style} ${_size} ${className}`}
      onClick={onClick}>
      {link ? (
        <a className="w-full" href={link}>
          {children}
        </a>
      ) : (
        children
      )}
    </button>
  );
}

export default Button;
