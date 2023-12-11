import { createContext, useEffect } from "react";
import HomePage from "./pages/home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthPage from "./pages/auth";
import useTheme from "./hooks/useTheme";
import useAuth from "./hooks/useAuth";

function App() {
  let [onToggleTheme] = useTheme();
  useAuth();
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/auth/:auth" element={<AuthPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
