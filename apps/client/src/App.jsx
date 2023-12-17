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

function App() {
  useAuth();
  useTheme();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        {!isLoggedIn && <Route path="/auth/:auth" element={<AuthPage />} />}
        <Route path="*" element={<NotFound />} />
        <Route
          path="/auth/confirm/:encrypted_string"
          element={<EmailConfirmPage />}
        />
        <Route path="/auth/link-sent" element={<EmailSent />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
