import React from 'react'
import Navbar from '../components/molecules/navbar'
import Auth from '../components/organisms/auth'

function AuthPage() {
  return (
    <div className="container mx-auto w-full h-screen flex align-center justify-center">
      <Auth />
    </div>
  )
}

export default AuthPage