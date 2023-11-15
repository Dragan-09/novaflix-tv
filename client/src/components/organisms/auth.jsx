import React, { useEffect, useState } from 'react'
import Brand from '../atoms/brand'
import { useParams } from 'react-router-dom'
import RegisterForm from '../molecules/register-form'
import LoginForm from '../molecules/login-form'

function Auth() {
  const [auth, setAuth] = useState('login')
  const { auth: _auth } = useParams()
  let auths = ['login', 'register']

  useEffect(_ => {
    // console.log(_auth)
    auths.includes(_auth) ? setAuth(_auth) : ''
  }, [])

  const authFormHandler = _ => {
    
  }

  return (
    <div className="auth w-[400px] text-primary dark:text-white p-10 bg-white dark:bg-slate-800 rounded-xl shadow-xl">
      <div className="brand flex justify-center h-12 mb-10">
        <a href="/"><Brand /></a>
      </div>
      <div className="auth-links flex justify-between">
        {auths.map(auth => {
          return <a href={`${auth}`} className={`mx-10 uppercase cursor-pointer ${_auth === auth ? "border-b border-primary dark:border-white" : ""}`}>{auth}</a>
        })}
      </div>
      {auth === 'register' ? <RegisterForm /> : <LoginForm />}
    </div>
  )
}

export default Auth