import React, { useContext, useEffect, useState } from 'react'

function useTheme() {
  const [isDarkMode, setIsDarkMode] = useState(localStorage.getItem('darkMode'))

  const toggleDarkMode = _ => {
    setIsDarkMode(prevMode => {
      localStorage.setItem('darkMode', !prevMode)
      return !prevMode  
    })
  }

  useEffect(_ => {
    console.log(isDarkMode)
    if (isDarkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [isDarkMode])

  return [isDarkMode, toggleDarkMode]
}

export default useTheme