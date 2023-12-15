import React, { useEffect, useState } from "react";
import Brand from "../atoms/brand";
import { useParams, redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  RegisterForm,
  LoginForm,
  ResetForm,
  NewPasswordForm,
} from "../molecules/auth/";

function Auth() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const [loading, setLoading] = useState(true);
  const [auth, setAuth] = useState("login");
  const { auth: _auth } = useParams();
  const auths = ["login", "register"];
  const [authForm, setAuthForm] = useState(null);

  useEffect(() => {
    auths.includes(_auth) ? setAuth(_auth) : "";

    switch (_auth) {
      case "login":
        setAuthForm(<LoginForm />);
        break;
      case "reset":
        setAuthForm(<ResetForm />);
        break;
      case "new-password":
        setAuthForm(<NewPasswordForm />);
        break;
      case "register":
        setAuthForm(<RegisterForm />);
        break;
    }

    setLoading(false);
  }, [isLoggedIn]);

  return !loading && !isLoggedIn ? (
    <div className="auth w-[400px] h-full sm:h-auto text-primary dark:text-white p-10 bg-white dark:bg-slate-800 rounded-xl shadow-xl">
      <div className="brand flex justify-center h-12 mb-10">
        <a href="/">
          <Brand />
        </a>
      </div>
      {auths.includes(_auth) && (
        <div className="auth-links flex justify-between pb-7">
          {auths.map((auth, index) => {
            return (
              <a
                key={index}
                href={`${auth}`}
                className={`mx-10 uppercase cursor-pointer ${
                  _auth === auth
                    ? "border-b border-primary dark:border-white"
                    : ""
                }`}
              >
                {auth}
              </a>
            );
          })}
        </div>
      )}
      {authForm}
    </div>
  ) : null;
}

export default Auth;
