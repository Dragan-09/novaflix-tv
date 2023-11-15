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
    "name": "Products",
    "url": "https://something.com"
  },
  {
    "name": "Features",
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
    <div className="navbar flex items-center uppercase h-[100px] py-5">
      <div className="logo grow h-full ps-5">
        <Brand />
      </div>
      <div className="navlinks flex me-[150px] text-sm">
        {navlinks.map((navlink, index) => <Navlink key={index} name={navlink.name} url={navlink.url} />)}
      </div>
      <div className="side-item">
        {/* Buttons */}
        <Button content="Register" color="white" size="medium" style="outline" />
        <Button content="Free Trial 24h" color="primary" size="medium" style="filled" />
      </div>
    </div>
  )
}

export default Navbar