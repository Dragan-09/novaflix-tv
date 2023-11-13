import React from 'react'
import Brand from '../atoms/brand'
import Button from '../atoms/button'
import Input from '../atoms/input'

function Footer() {
  const date = new Date().getFullYear()
  return (
    <div className="footer p-10 bg-primary text-center px-20 dark:bg-slate-950 border-t border-white">
      <div className="footer-brand h-[50px] flex justify-center mb-5">
        <Brand />
      </div>
      <p className='text-3xl text-white font-semibold mb-5'>Unlimited email design.<br/>One low-priced subscription.</p>
      <p className='text-slate-300 text-xs'>Join the limitless newsletter to get updates, tips and excecutive<br/>deals available only to subscribers.</p>
      <div className="email-subscription pt-3">
        <Button size="medium" style="filled" content="Register" reversed />
      </div>
      <hr className='my-5 border-white'/>
      <div className='flex px-10 flex text-slate-300'>
        <p className=' grow text-left'>All rights reserved &copy; {date}</p>
        <p>Made with love by <b>Pipas</b>.</p>
      </div>
    </div>
  )
}

export default Footer