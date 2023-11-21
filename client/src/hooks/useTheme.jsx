import React, { useEffect, useState } from 'react'

function useTheme() {
  let [isDarkMode, setIsDarkMode] = useState(localStorage.getItem('dark-mode') === 'dark' ? true : false)

  const toggleDarkMode = currentStatus => {
    setIsDarkMode(!currentStatus)
    localStorage.setItem('dark-mode', currentStatus === true ? 'light' : 'dark')
  }

  useEffect(_ => {
    isDarkMode === true ? document.documentElement.classList.add('dark') : document.documentElement.classList.remove('dark')
  }, [isDarkMode])

  return [isDarkMode, toggleDarkMode]
}

export default useTheme