import { useContext, createContext, useState } from 'react'
import HomePage from './pages/home'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import AuthPage from './pages/auth'
import useTheme from './hooks/useTheme'

export const ThemeContext = createContext()

function App() {
  let [isDarkMode, onToggleTheme] = useTheme()
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
