import React from 'react'
import Input from '../atoms/input'
import Button from '../atoms/button'

function RegisterForm() {
  return (
    <form className='grid grid-cols-2 gap-x-2 gap-y-4'>
      <div>
        <Input type="text" placeholder="First Name" name="first_name" color="gray" />
      </div>
      <div>
        <Input type="text" placeholder="Last Name" name="last_name" color="gray" />
      </div>
      <div className="col-span-2">
        <Input type="text" placeholder="Username" name="username" color="gray" />
      </div>
      <div className="col-span-2">
        <Input type="email" placeholder="Email" name="email" color="gray" />
      </div>
      <div className="col-span-2">
        <Input type="password" placeholder="Password" name="password" color="gray" />
      </div>
      <div className="col-span-2">
        <Input type="password" placeholder="Confirm Password" name="password_confirmation" color="gray" />
      </div>
      {/* <div className='flex ps-3 col-span-2'>
        <Checkbox name="rememberme" /> <span className='text-sm ps-3'>Remember me</span>
      </div> */}
      <div className="submit col-span-2">
        <Button color="primary" size="medium" style="filled" className="w-full">Register</Button>
      </div>
      <p className='text-sm col-span-2 text-gray-500 ps-3 text-center'>Already have an account? <a href="/auth/login" className='underline text-primary'>Sign in</a>.</p>
    </form>
  )
}

export default RegisterForm