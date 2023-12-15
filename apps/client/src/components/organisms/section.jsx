import React from 'react'
import Title from '../atoms/section-title'

function Section({title, id, children}) {
  return (
    <div className='w-full py-10 container mx-auto' id={id}>
      <Title title={title}></Title>
      {children}
    </div>
  )
}

export default Section