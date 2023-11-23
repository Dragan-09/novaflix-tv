import React from 'react'
import Input from '../atoms/input'
import Checkbox from '../atoms/checkbox'
import Button from '../atoms/button'

function LoginForm() {
  return (
    <form className='grid grid-cols-2 gap-x-2 gap-y-4'>
      <div className="col-span-2">
        <Input type="login" placeholder="Username or Email" name="email" color="gray" />
      </div>
      <div className="col-span-2">
        <Input type="password" placeholder="Password" name="password" color="gray" />
      </div>
      <div className='flex ps-3 col-span-2 align-center'>
        <Checkbox name="rememberme" />
        <span className='text-sm ps-3'>Remember me</span>
      </div>
      <div className="submit col-span-2">
        <Button color="primary" size="medium" style="filled" className="w-full">Sign in</Button>
      </div>
      <p className='text-sm col-span-2 text-gray-500 ps-3 text-center'>Don't you have an account? <a href="/auth/register" className='underline text-primary'>Register</a>.</p>
    </form>
  )
}

export default LoginForm