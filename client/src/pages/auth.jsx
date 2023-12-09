import React, { useEffect } from "react";
import Navbar from "../components/molecules/navbar";
import Auth from "../components/organisms/auth";
import { useSelector } from "react-redux";

function AuthPage() {
  return (
    <div className="container mx-auto w-full h-screen flex items-center justify-center">
      <Auth />
    </div>
  );
}

export default AuthPage;
