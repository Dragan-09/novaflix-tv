import React from 'react'
import Input from '../atoms/input'
import Button from '../atoms/button'

function ResetForm() {
  return (
    <form className='grid grid-cols-2 gap-x-2 gap-y-4'>
      <div className="col-span-2">
        <Input placeholder={'Your Email'} name={'email'} />
      </div>
      <div className="submit col-span-2">
        <Button color="primary" size="medium" style="filled" className="w-full">Confirm</Button>
      </div>
    </form>
  )
}

export default ResetForm