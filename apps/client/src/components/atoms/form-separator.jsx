import React from "react"

function FormSeparator({ text }) {
  return (
    <div className="w-full block col-span-2 flex items-center justify-center">
      <span className="text-center text-primary dark:text-gray-500 text-sm px-2 relative bg-white dark:bg-slate-800 before:h-[1px] before:bg-primary before:dark:bg-gray-500 before:w-[40px] before:absolute before:top-1/2 before:-left-1/3 after:h-[1px] after:bg-primary after:dark:bg-gray-500 after:w-[40px] after:absolute after:top-1/2 after:-right-1/3">
        {text}
      </span>
    </div>
  )
}

export default FormSeparator
