import React, { useState } from "react"
import Input from "../../atoms/input"
import Checkbox from "../../atoms/checkbox"
import Button from "../../atoms/button"
import axios from "axios"
import toast, { Toaster } from "react-hot-toast"
import { GoogleLogin } from "@react-oauth/google"

function LoginForm() {
  const [username, setUsername] = useState(null)
  const [password, setPassword] = useState(null)
  const [rememberme, setRememberme] = useState(false)

  const onSubmit = async e => {
    e.preventDefault()
    try {
      const API_URL = import.meta.env.VITE_API_URL
      const login = await axios.post(`${API_URL}/auth/login`, {
        username,
        password,
      })
      localStorage.setItem("Authorization", `Bearer ${login.data.token}`)
      window.location.href = "/"
    } catch (error) {
      error.response.data.messages.map(message =>
        toast.error(message, {
          position: "bottom-center",
          style: { textAlign: "center" },
        }),
      )
    }
  }

  const googleAuth = async credentialsResponse => {
    try {
      const user = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/google`,
        {
          credential: credentialsResponse.credential,
        },
        {
          headers: {
            Authorization: localStorage.getItem("Authorization"),
            Accept: "application/json",
          },
        },
      )

      localStorage.setItem("Authorization", `Bearer ${user.data.token}`)
      location.href = "/"
    } catch (error) {
      toast.error("Something went wrong!")
    }
  }

  return (
    <form className="grid grid-cols-2 gap-x-2 gap-y-4">
      <Toaster />
      <div className="col-span-2">
        <Input
          type="login"
          placeholder="Username or Email"
          name="email"
          color="gray"
          onChange={e => setUsername(e.target.value)}
        />
      </div>
      <div className="col-span-2">
        <Input
          type="password"
          placeholder="Password"
          name="password"
          color="gray"
          onChange={e => setPassword(e.target.value)}
        />
      </div>
      <div className="flex ps-3 col-span-2 align-center">
        <Checkbox name="rememberme" />
        <span className="text-sm ps-3">Remember me</span>
      </div>
      <div className="submit col-span-2">
        <Button
          color="primary"
          size="medium"
          style="filled"
          className="w-full"
          onClick={onSubmit}>
          Sign in
        </Button>
      </div>
      <GoogleLogin
        width={"318"}
        login_uri={`http://localhost:3307/api/auth/google`}
        text="signup_with"
        size="large"
        logo_alignment="center"
        onSuccess={googleAuth}
        onError={() => toast.error("Something went wrong!")}
      />
      <p className="text-sm col-span-2 text-gray-500 ps-3 text-center">
        Don't you have an account?{" "}
        <a href="/auth/register" className="underline text-primary">
          Register
        </a>
        .
      </p>
    </form>
  )
}

export default LoginForm
