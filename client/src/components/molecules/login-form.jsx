import React, { useState } from "react";
import Input from "../atoms/input";
import Checkbox from "../atoms/checkbox";
import Button from "../atoms/button";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

function LoginForm() {
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [rememberme, setRememberme] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const API_URL = import.meta.env.VITE_API_URL;
      const login = await axios.post(`${API_URL}/auth/login`, {
        username,
        password,
      });
      localStorage.setItem("Authorization", `Bearer ${login.data.token}`);
      window.location.href = "/";
    } catch (error) {
      toast.error(error.response.data.message, { position: "bottom-center" });
    }
  };

  return (
    <form className="grid grid-cols-2 gap-x-2 gap-y-4">
      <Toaster />
      <div className="col-span-2">
        <Input
          type="login"
          placeholder="Username or Email"
          name="email"
          color="gray"
          onChange={(e) => setUsername(e.target.value)}
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
          onClick={onSubmit}
        >
          Sign in
        </Button>
      </div>
      <p className="text-sm col-span-2 text-gray-500 ps-3 text-center">
        Don't you have an account?{" "}
        <a href="/auth/register" className="underline text-primary">
          Register
        </a>
        .
      </p>
    </form>
  );
}

export default LoginForm;
