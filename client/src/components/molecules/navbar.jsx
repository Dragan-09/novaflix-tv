import React, { useContext } from 'react'
import Navlink from '../atoms/navlink'
import Button from '../atoms/button'
import Brand from '../atoms/brand'
import { ThemeContext } from '../../App'
import Icon from '../atoms/icon'
import UserDropdown from './user-dropdown'
import { useState } from 'react'
import OutsideClickHandler from 'react-outside-click-handler'

const navlinks = [
  {
    "name": "Home",
    "url": "/"
  },
  {
    "name": "Plans",
    "url": "/#plans"
  },
  {
    "name": "Register",
    "url": "/auth/register"
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
  const [showAccountInfo, setShowAccountInfo] = useState(false)
  const userInfoBoxHandler = currentStatus => setShowAccountInfo(!currentStatus)
  return (
    <div className="navbar hidden md:flex items-center h-[40px] sm:h-[100px] py-0 sm:py-5 ">
      <div className="logo h-full aspect-square ms-5">
        <Brand />
      </div>
      <div className="navlinks hidden md:flex mx-[150px] text-sm grow justify-center uppercase">
        {navlinks.map((navlink, index) => <Navlink key={index} name={navlink.name} url={navlink.url} />)}
      </div>
      <div className="side-item hidden lg:flex">
        {/* Buttons */}
        {/* <Button content="Register" color="primary" size="medium" style="outline" link="/auth/register" className='me-4'>Register</Button> */}
        <OutsideClickHandler onOutsideClick={_ => userInfoBoxHandler(true)}>
          <div className="relative me-4">
            <Button color={"white"} size={"medium"} style={"filled"} className={""} onClick={_ => userInfoBoxHandler(showAccountInfo)}>
              <span>My Account</span>
            </Button>
            {
              showAccountInfo && (
                  <div className="absolute top-full right-0 pt-2">
                    <UserDropdown full_name={'John Smigla'} username={'Johnsm2000'} current_plan={{name: 'Premium', end_date: '2024-04-24'}} />
                  </div>
              )
            }
          </div>
        </OutsideClickHandler>
        <Button color="white" size="medium" style={"filled"} className='me-4' onClick={_ => toggleDarkMode(isDarkMode)}>
          {isDarkMode ? <Icon icon={"light"} className={"h-[20px]"} /> : <Icon icon={"dark"} className={"h-[20px]"} />}
        </Button>
      </div>
    </div>
  )
}

export default Navbar