import React from 'react'
import Navbar from '../molecules/navbar'
import Button from '../atoms/button'
import Icon from '../atoms/icon'

function Hero() {
  return (
    <div className="hero w-full h-screen bg-primary/90 pt-10 px-5 bg-hero-texture">
      <div className="container mx-auto h-full">
        <Navbar />
        <div className="hero-content w-full h-[calc(100%-100px-60px)] grid grid-cols-2 gap-4 flex content-center">
          <div className="description px-10">
            <p className='capitalize text-7xl text-white font-extralight'>The Future</p>
            <p className='uppercase text-3xl text-white font-light pt-2'>of location <span className='text-primary'>intelligence</span> is here</p>
            <p className='text-gray italic text-sm pt-3 pb-6'>Talk about how it is built for emerging and established brands with a<br />multi-unit footprint</p>
            <div className="flex">
              <Button style="filled" size="medium" color="text-white" content="set in action"/>
              <Button style="outline" size="medium" color="text-primary" content="explore the features"/>
            </div>
          </div>
          <div className="illustration">
            
          </div>
        </div>
        <div className="scroll flex justify-center">
          <a href="#categories">
            <Icon icon="scroll_mouse" type="svg" with="40px" height="40px" className="animate-bounce dark:fill-slate-300 fill-white" />
          </a>
        </div>
      </div>
    </div>
  )
}

export default Hero