import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Transactions from "./pages/Transactions";
import Transfer from "./pages/Transfer";
import FixedDeposit from "./pages/FixedDeposit";
import Analytics from "./pages/Analytics";
import Profile from "./pages/Profile";
import Admin from "./pages/Admin";
import { LangCurrencyProvider } from "./i18n";

export default function App() {
  const navigate = useNavigate();
  const [lastActive, setLastActive] = useState(Date.now());

  useEffect(() => {
    const onActivity = () => setLastActive(Date.now());
    window.addEventListener("mousemove", onActivity);
    window.addEventListener("keydown", onActivity);

    const timer = setInterval(() => {
      if (Date.now() - lastActive > 300000) { // 5 minutes
        // Auto-logout
        alert("Session expired due to inactivity.");
        navigate("/login");
      }
    }, 10000);

    return () => {
      window.removeEventListener("mousemove", onActivity);
      window.removeEventListener("keydown", onActivity);
      clearInterval(timer);
    };
  }, [lastActive, navigate]);

  return (
    <LangCurrencyProvider>
      <div className="app-root">
        <Sidebar />
        <div className="main-area">
          <Topbar />
          <div className="page-body">
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/transactions" element={<Transactions />} />
              <Route path="/transfer" element={<Transfer />} />
              <Route path="/fixed-deposit" element={<FixedDeposit />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/admin" element={<Admin />} />
            </Routes>
          </div>
        </div>
      </div>
    </LangCurrencyProvider>
  );
}
