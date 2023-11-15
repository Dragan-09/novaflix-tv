import React, { useEffect, useState } from 'react'

function Input({placeholder, type, name, color}) {
  const [show, setShow] = useState(true)

  useEffect(_ => {
    switch (type) {
      case 'password':
        setShow(false)
        break
      case 'text':
      default:
        setShow(true)
    }
  }, [])

  const showHandler = _ => {
    setShow(!show)
  }

  const variants = {
    color: {
      primary: "text-primary border-primary",
      white: "text-white border-white",
      gray: "text-primary border-gray"
    }
  }

  return (
    <div className={`relative w-full h-full text-sm rounded-md border flex overflow-hidden ${variants.color[color]} dark:text-white dark:border-white`}>
      <input type={show === true ? "text" : "password"} name={name} className="outline-none px-5 py-2 bg-transparent w-full" placeholder={placeholder} />
      {type === 'password' ? <span className='h-full px-2 bg-slate-100 cursor-pointer flex items-center' onClick={showHandler}>
        <img className='w-[20px]' src={`/images/icons/${show === true ? "show.png" : "hide.png"}`} />
      </span> : ''}
    </div>
  )
}

export default Input