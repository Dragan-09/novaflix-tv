import React, { useEffect, useState } from "react"
import axios from "axios"
import Input from "../components/atoms/input"
import Button from "../components/atoms/button"
import { useParams } from "react-router-dom"

function UserCredentials({}) {
  const [sub_username, setUsername] = useState(null)
  const [sub_password, setpassword] = useState(null)
  const [status, setStatus] = useState(false)

  const { subscription_uuid } = useParams()

  useEffect(() => {
    ;(async () => {
      try {
        const getStatus = await axios.get(
          `${
            import.meta.env.VITE_API_URL
          }/subscription/status/${subscription_uuid}`,
          {
            headers: {
              Authorization: localStorage.getItem("Authorization"),
            },
          },
        )

        if (getStatus) setStatus(Boolean(getStatus.data.status))
      } catch (error) {}
    })()
  }, [status])

  const sendData = async e => {
    e.preventDefault()

    try {
      const send = await axios.post(
        `${
          import.meta.env.VITE_API_URL
        }/subscription/credentials/${subscription_uuid}`,
        { sub_username, sub_password },
        { headers: { Authorization: localStorage.getItem("Authorization") } },
      )

      location.href = "/"
    } catch (error) {}
  }

  return (
    <div className="container mx-auto w-full h-screen flex items-center justify-center">
      <div className="auth w-[400px] h-full sm:h-auto text-primary dark:text-white p-10 bg-white dark:bg-slate-800 rounded-xl shadow-xl">
        {status ? (
          <>
            <h2 className="text-center">
              Enter Credentials generated by IPTV control panel
            </h2>
            <form className="grid grid-cols-2 gap-x-2 gap-y-4 mt-5">
              <div className="col-span-2">
                <Input
                  placeholder={"Username"}
                  name={"sub_username"}
                  onChange={e => {
                    setUsername(e.target.value)
                  }}
                />
              </div>
              <div className="col-span-2">
                <Input
                  placeholder={"Password"}
                  name={"sub_password"}
                  onChange={e => {
                    setpassword(e.target.value)
                  }}
                />
              </div>
              <div className="col-span-2">
                <Button
                  size={"medium"}
                  style={"filled"}
                  color={"primary"}
                  className={"mx-auto"}
                  onClick={sendData}>
                  Create
                </Button>
              </div>
            </form>
          </>
        ) : (
          <div className="text-center">Invalid or Expired!</div>
        )}
      </div>
    </div>
  )
}

export default UserCredentials