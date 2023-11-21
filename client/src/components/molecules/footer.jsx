import React from 'react'
import Brand from '../atoms/brand'
import Button from '../atoms/button'
import Input from '../atoms/input'

function Footer() {
  const date = new Date().getFullYear()
  return (
    <div className="footer p-10 bg-primary text-center px-5 sm:px-20 mb-14 sm:mb-0 dark:bg-slate-950 border-t border-white">
      <div className="footer-brand h-[50px] flex justify-center mb-5">
        <Brand />
      </div>
      <p className='text-2xl sm:text-3xl text-white font-semibold mb-5'>Unlimited email design.<br/>One low-priced subscription.</p>
      <p className='text-slate-300 text-xs'>Join the limitless newsletter to get updates, tips and excecutive deals available only to subscribers.</p>
      <div className="email-subscription pt-3">
        <Button size="medium" style="filled" color="white" link="/auth/register">Register</Button>
      </div>
      <hr className='my-5 border-white/50'/>
      <div className='flex px-10 text-slate-300 grid grid-cols-2'>
        <p className='text-center sm:text-left col-span-2 sm:col-span-1'>All rights reserved &copy; {date}</p>
        <p className='text-center sm:text-right col-span-2 sm:col-span-1'>Made with love by <b>Pipas</b></p>
      </div>
    </div>
  )
}

export default Footer