import React from "react";
import { useLang } from "../i18n";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.jpg"; // optional small logo usage if desired

export default function Topbar() {
  const { language, setLanguage, currency, setCurrency, t } = useLang();
  const navigate = useNavigate();
  return (
    <header className="topbar">
      <div className="top-left" style={{ display: "flex", alignItems: "center", gap: 12 }}>
        {/* If you'd like logo in topbar uncomment next line */}
        {/* <img src={logo} alt="logo" style={{height:28}} /> */}
        <div style={{ fontWeight: 700, fontSize: 18 }}>CREDEXA</div>
      </div>
      <div className="top-controls">
        <select value={language} onChange={(e) => setLanguage(e.target.value)} className="select">
          {["English", "Hindi", "Japanese", "French", "Chinese"].map((l) => (
            <option key={l} value={l}>
              {l}
            </option>
          ))}
        </select>
        <select value={currency} onChange={(e) => setCurrency(e.target.value)} className="select">
          {["INR", "JPY", "KWD"].map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        <button className="btn-ghost" onClick={() => navigate("/login")}>
          {t.logout}
        </button>
      </div>
    </header>
  );
}
