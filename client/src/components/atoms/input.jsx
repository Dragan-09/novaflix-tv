import React from 'react'

function Input({placeholder, width}) {
  return (
    <input type="text" className='outline-none px-5 py-2 text-sm rounded-md bg-transparent border border-white me-2 text-white' placeholder={placeholder} style={{width}} />
  )
}

export default Input