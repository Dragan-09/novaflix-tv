import React from 'react'
import Icon from '../atoms/icon'

function BottomNavbar() {
  const navlinks = [
    {
      "icon": "home",
      "link": "/"
    }, {
      "icon": "categories",
      "link": "/#categories"
    }, {
      "icon": "light",
      "link": ""
    }, {
      "icon": "cuisine",
      "link": ""
    }, {
      "icon": "signin",
      "link": ""
    }
  ]
  return (
    <div className="fixed bottom-0 flex sm:hidden bg-white h-14 w-screen z-20 grid grid-cols-5">
      {navlinks.map(navlink => {
        return (
          <a className="w-full h-14 flex items-center justify-center p-3" href={navlink.link}>
            <Icon icon={navlink.icon} className="h-full" />
          </a>
        )
      })}
    </div>
  )
}

export default BottomNavbar