import React from 'react'
import Navbar from '../molecules/navbar'
import Button from '../atoms/button'
import Icon from '../atoms/icon'

function Hero() {
  return (
    <div className="hero w-full h-screen bg-primary/90 pt-10 px-5 bg-hero-texture relative">
      <div className="w-full h-full absolute bg-gradient-to-b from-transparent via-slate-500 dark:via-transparent to-slate-100 dark:to-slate-950 top-0 left-0 z-0"></div>
      <div className="container mx-auto h-full z-10 relative">
        <Navbar />
        <div className="hero-content w-full h-[calc(100%-100px-60px)] grid grid-cols-1 text-center gap-4 flex content-center">
          <div className="description px-10">
            <p className='capitalize text-7xl text-white font-light'>The Future</p>
            <p className='uppercase text-3xl text-white font-medium pt-2'>of location <span className='text-primary'>intelligence</span> is here</p>
            <p className='dark:text-gray italic text-sm pt-3 pb-6'>Talk about how it is built for emerging and established brands with a<br />multi-unit footprint</p>
            <div className="flex justify-center">
              <Button style="filled" size="medium" color="primary" content="set in action"/>
              <Button style="outline" size="medium" color="white" content="explore the features"/>
            </div>
          </div>
          <div className="illustration">
            
          </div>
        </div>
        <div className="scroll flex justify-center">
          <a href="#categories">
            <Icon icon="scroll_mouse" type="svg" with="40px" height="40px" className="animate-bounce fill-primary dark:fill-slate-300" />
          </a>
        </div>
      </div>
    </div>
  )
}

export default Hero