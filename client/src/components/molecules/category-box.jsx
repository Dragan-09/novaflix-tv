import React from 'react'
import Icon from '../atoms/icon'

function CategoryCard({name, icon}) {
  return (
    <div className='w-full shadow-lg rounded-2xl bg-white aspect-square p-5 mb-4 flex flex-wrap content-center justify-center cursor-grab dark:bg-slate-800'>
      <div className="cat-icon">
        <Icon 
          icon={icon}
          type="img"
          width="100px"
          className="fill-primary mx-auto dark:grayscale w-[50px] sm:w-[100px]"
        />
      </div>
      <div className="cat-name text-center text-primary uppercase text-sm sm:text-xl font-medium pt-5 w-full dark:text-white">{name}</div>
    </div>
  )
}

export default CategoryCard