import { useContext, createContext, useState } from 'react'
import HomePage from './pages/home'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import AuthPage from './pages/auth'

function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/auth/:auth" element={<AuthPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
