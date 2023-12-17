import React, { useState } from "react";
import Input from "../../atoms/input";
import Button from "../../atoms/button";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { redirect } from "react-router-dom";

function RegisterForm() {
  const [first_name, setFirstname] = useState(null);
  const [last_name, setLastname] = useState(null);
  const [username, setUsername] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [password_confirmation, setPasswordConfirmation] = useState(null);

  const onSubmit = async (e) => {
    e.preventDefault();
    const API_URL = import.meta.env.VITE_API_URL;
    try {
      const register = await axios.post(`${API_URL}/auth/register`, {
        username,
        first_name,
        last_name,
        email,
        password,
        password_confirmation,
      });
      location.href = "/auth/link-sent";
    } catch (error) {
      console.log(error.response.data.messages);
      error.response.data.messages.map((message) =>
        toast.error(message, {
          position: "bottom-center",
          style: { textAlign: "center" },
        })
      );
    }
  };
  return (
    <form className="grid grid-cols-2 gap-x-2 gap-y-4">
      <Toaster />
      <div>
        <Input
          type="text"
          placeholder="First Name"
          name="first_name"
          color="gray"
          onChange={(e) => setFirstname(e.target.value)}
        />
      </div>
      <div>
        <Input
          type="text"
          placeholder="Last Name"
          name="last_name"
          color="gray"
          onChange={(e) => setLastname(e.target.value)}
        />
      </div>
      <div className="col-span-2">
        <Input
          type="text"
          placeholder="Username"
          name="username"
          color="gray"
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className="col-span-2">
        <Input
          type="email"
          placeholder="Email"
          name="email"
          color="gray"
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="col-span-2">
        <Input
          type="password"
          placeholder="Password"
          name="password"
          color="gray"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="col-span-2">
        <Input
          type="password"
          placeholder="Confirm Password"
          name="password_confirmation"
          color="gray"
          onChange={(e) => setPasswordConfirmation(e.target.value)}
        />
      </div>
      <div className="submit col-span-2">
        <Button
          color="primary"
          size="medium"
          style="filled"
          className="w-full"
          onClick={onSubmit}
        >
          Register
        </Button>
      </div>
      <p className="text-sm col-span-2 text-gray-500 ps-3 text-center">
        Already have an account?{" "}
        <a href="/auth/login" className="underline text-primary">
          Sign in
        </a>
        .
      </p>
    </form>
  );
}

export default RegisterForm;
