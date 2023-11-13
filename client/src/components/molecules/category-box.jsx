import React from 'react'
import Icon from '../atoms/icon'

function CategoryCard({name, icon}) {
  return (
    <div className='w-full shadow-lg rounded-2xl bg-white aspect-square p-5 flex flex-wrap content-center justify-center'>
      <div className="cat-icon">
        <Icon 
          icon={icon}
          type="img"
          width="100px"
          className="fill-primary mx-auto"
        />
      </div>
      <div className="cat-name text-center text-primary uppercase text-xl font-medium pt-5 w-full">{name}</div>
    </div>
  )
}

export default CategoryCard