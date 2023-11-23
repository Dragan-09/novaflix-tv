import React from 'react'
import Input from '../atoms/input'
import Button from '../atoms/button'

function NewPasswordForm() {
  return (
    <form className='grid grid-cols-2 gap-x-2 gap-y-4'>
      <div className="col-span-2">
        <Input type="password" placeholder="New Password" name="password" color="gray" />
      </div>
      <div className="col-span-2">
        <Input type="password" placeholder="Confirm New Password" name="password_confirmation" color="gray" />
      </div>
      <div className="submit col-span-2">
        <Button color="primary" size="medium" style="filled" className="w-full">Confirm</Button>
      </div>
    </form>
  )
}

export default NewPasswordForm