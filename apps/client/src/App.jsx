import { createContext, useEffect } from "react";
import HomePage from "./pages/home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthPage from "./pages/auth";
import useTheme from "./hooks/useTheme";
import useAuth from "./hooks/useAuth";
import { useSelector } from "react-redux";
import NotFound from "./pages/404";
import EmailConfirmPage from "./pages/email-confirm";
import EmailSent from "./pages/email-sent";
import UserCredentials from "./pages/user-credentials";
import { GoogleOAuthProvider } from "@react-oauth/google";
import CheckoutPage from "./pages/checkout";

function App() {
  useAuth();
  useTheme();
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
  const role = useSelector(state => state.auth.account.role);
  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_API_CLIENT_ID}>
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<NotFound />} />
          <Route path="/" element={<HomePage />} />
          {!isLoggedIn && <Route path="/auth/:auth" element={<AuthPage />} />}
          <Route
            path="/auth/confirm/:encrypted_string"
            element={<EmailConfirmPage />}
          />
          <Route path="/auth/link-sent" element={<EmailSent />} />
          {isLoggedIn && role == "ADMIN" && (
            <Route
              path="/admin/user/credentials/:subscription_uuid"
              element={<UserCredentials />}
            />
          )}
          <Route path="/checkout/:plan" element={<CheckoutPage />} />
        </Routes>
      </BrowserRouter>
    </GoogleOAuthProvider>
  );
}

export default App;
