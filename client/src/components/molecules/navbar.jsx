import React, { useContext } from 'react'
import Navlink from '../atoms/navlink'
import Button from '../atoms/button'
import Brand from '../atoms/brand'
import { ThemeContext } from '../../App'
import Icon from '../atoms/icon'

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
  const [isDarkMode, toggleDarkMode] = useContext(ThemeContext)
  return (
    <div className="navbar hidden md:flex items-center uppercase h-[40px] sm:h-[100px] py-0 sm:py-5 ">
      <div className="logo h-full ps-5">
        <Brand />
      </div>
      <div className="navlinks hidden md:flex mx-[150px] text-sm grow justify-center">
        {navlinks.map((navlink, index) => <Navlink key={index} name={navlink.name} url={navlink.url} />)}
      </div>
      <div className="side-item hidden lg:flex">
        {/* Buttons */}
        <Button content="Register" color="primary" size="medium" style="outline" link="/auth/register" className='me-4'>Register</Button>
        <Button content="Free Trial 24h" color="primary" size="medium" style="filled" className='me-4'>Free Trial 24h</Button>
        <Button color="white" size="medium" style={"filled"} onClick={_ => toggleDarkMode(isDarkMode)}>
          {isDarkMode ? <Icon icon={"light"} className={"h-[20px]"} /> : <Icon icon={"dark"} className={"h-[20px]"} />}
        </Button>
      </div>
    </div>
  )
}

export default Navbar