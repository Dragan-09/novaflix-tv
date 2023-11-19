import { useContext, createContext, useState } from 'react'
import HomePage from './pages/home'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import AuthPage from './pages/auth'

export const ThemeContext = createContext()

function App() {
  let [isDarkMode, setIsDarkMode] = useState(localStorage.getItem('dark-mode') === 'dark' ? true : false)
  const onToggleTheme = currentStatus => {
    setIsDarkMode(!currentStatus)
    localStorage.setItem('dark-mode', currentStatus === true ? 'light' : 'dark')
  }
  console.log(isDarkMode)
  isDarkMode === true ? document.documentElement.classList.add('dark') : document.documentElement.classList.remove('dark')
  console.log(isDarkMode)
  return (
    <ThemeContext.Provider value={[isDarkMode, onToggleTheme]}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/auth/:auth" element={<AuthPage />} />
        </Routes>
      </BrowserRouter>
    </ThemeContext.Provider>
  )
}

export default App
