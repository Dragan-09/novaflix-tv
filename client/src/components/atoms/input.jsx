import React from 'react'

function Input({placeholder, type, name}) {
  return (
    <div className='relative w-full h-full'>
      {type === 'password' ? <span className='absolute h-full right-0 text-sm px-2 bg-white text-primary text-align leading-8 font-medium rounded-e-md'>Show</span> : ''}
      <input type={type} name={name} className="outline-none px-5 py-2 text-sm rounded-md bg-transparent border border-white me-2 text-white w-full" placeholder={placeholder} />
    </div>
  )
}

export default Input