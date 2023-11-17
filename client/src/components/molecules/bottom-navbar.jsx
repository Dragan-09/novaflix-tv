import React, {useContext} from 'react'
import Icon from '../atoms/icon'
import useTheme from '../../hooks/useTheme'

function BottomNavbar() {
  const [isDarkMode, toggleDarkMode] = useTheme()
  console.log(isDarkMode)
  
  const navlinks = [
    { name:"home", icon: "home", link: "/" },
    { name:"categories", icon: "categories", "link": "/#plans" },
    { name:"mode", icon: "light" },
    { name:"cuisine", icon: "cuisine", link: "" },
    { name:"signin", icon: "signin", link: "/auth/login" }
  ]

  return (
    <div className="fixed bottom-0 left-0 flex sm:hidden bg-white h-14 w-screen z-20 grid grid-cols-5">
      {navlinks.map(navlink => {
        return (
          <a className="w-full h-14 flex items-center justify-center p-3" href={navlink.link || null} onClick={navlink.name === 'mode' ? toggleDarkMode : null} key={navlink.name}>
            <Icon icon={navlink.icon} className="h-full" />
          </a>
        )
      })}
    </div>
  )
}

export default BottomNavbar