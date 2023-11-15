import React, { useState } from 'react'

function Checkbox({name}) {
  const [checked, setChecked] = useState(false)

  const checkedHandler = event => {
    const isChecked = event.target.checked
    isChecked === true ? setChecked(true) : setChecked(false)
  }

  return (
    <>
      <label htmlFor='rememberme' className='flex items-center'><img className='w-4 dark:invert' src={`/images/icons/${checked === true ? "checked" : "unchecked"}.png`} alt="" /></label>
      <input type="checkbox" id="rememberme" name={name} style={{display: 'none'}} onChange={checkedHandler} />
    </>
  )
}

export default Checkbox