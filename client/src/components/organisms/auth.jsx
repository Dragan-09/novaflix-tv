import React, { useEffect, useState } from 'react'
import Brand from '../atoms/brand'
import { useParams } from 'react-router-dom'
import Input from '../atoms/input'

function Auth() {
  const [auth, setAuth] = useState('login')
  const { auth: _auth } = useParams()
  let auths = ['login', 'register']

  useEffect(_ => {
    // console.log(_auth)
    auths.includes(_auth) ? setAuth(_auth) : ''
  }, [])

  return (
    <div className="auth w-[400px] text-white p-10 bg-slate-800 rounded-xl">
      <div className="brand flex justify-center h-12 mb-10">
        <Brand />
      </div>
      <div className="auth-links flex justify-between">
        {auths.map(auth => {
          return <a className={`mx-10 uppercase cursor-pointer ${_auth === auth ? "border-b border-primary dark:border-white" : ""}`}>{auth}</a>
        })}
      </div>
      <form className='pt-10 grid grid-cols-2 gap-x-2 gap-y-4'>
        <div>
          <Input type="text" placeholder="First Name" name="first_name" />
        </div>
        <div>
          <Input type="text" placeholder="Last Name" name="last_name" />
        </div>
        <div className="col-span-2">
          <Input type="text" placeholder="Username" name="username" />
        </div>
        <div className="col-span-2">
          <Input type="text" placeholder="Email" name="email" />
        </div>
        <div className="col-span-2">
          <Input type="password" placeholder="Password" name="password" />
        </div>
        <div className="col-span-2">
          <Input type="password" placeholder="Confirm Password" name="password_confirmation" />
        </div>
      </form>
    </div>
  )
}

export default Auth