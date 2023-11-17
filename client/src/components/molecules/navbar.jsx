import React from 'react'
import Navlink from '../atoms/navlink'
import Button from '../atoms/button'
import Brand from '../atoms/brand'

const navlinks = [
  {
    "name": "Home",
    "url": "https://something.com"
  },
  {
    "name": "Categories",
    "url": "https://something.com"
  },
  {
    "name": "Plans",
    "url": "https://something.com"
  },
  {
    "name": "Contact",
    "url": "https://something.com"
  },
  {
    "name": "About",
    "url": "https://something.com"
  },
]

function Navbar() {
  return (
    <div className="navbar hidden md:flex items-center uppercase h-[40px] sm:h-[100px] py-0 sm:py-5 ">
      <div className="logo grow h-full ps-5">
        <Brand />
      </div>
      <div className="navlinks hidden md:flex me-[150px] text-sm ">
        {navlinks.map((navlink, index) => <Navlink key={index} name={navlink.name} url={navlink.url} />)}
      </div>
      <div className="side-item hidden lg:block">
        {/* Buttons */}
        <Button content="Register" color="primary" size="medium" style="outline" link="/auth/register" className='me-5'  />
        <Button content="Free Trial 24h" color="primary" size="medium" style="filled"/>
      </div>
    </div>
  )
}

export default Navbar