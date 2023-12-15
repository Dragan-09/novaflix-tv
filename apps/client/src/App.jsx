import { createContext, useEffect } from "react";
import HomePage from "./pages/home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthPage from "./pages/auth";
import useTheme from "./hooks/useTheme";
import useAuth from "./hooks/useAuth";
import { useSelector } from "react-redux";
import NotFound from "./pages/404";

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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
