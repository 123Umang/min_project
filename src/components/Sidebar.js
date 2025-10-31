import React from "react";
import { NavLink } from "react-router-dom";
import logo from "../assets/logo.jpg";   // <-- updated filename
import { useLang } from "../i18n";

export default function Sidebar() {
  const { t } = useLang();
  const menu = [
    { to: "/dashboard", label: t.menuDashboard },
    { to: "/transactions", label: t.menuTransactions },
    { to: "/transfer", label: t.menuTransfer },
    { to: "/profile", label: t.menuSettings },
  ];
  return (
    <aside className="sidebar">
      <div className="sidebar-top">
        <img src={logo} alt="logo" className="logo-sm" />
        <h2>Credexa</h2>
      </div>
      <nav className="sidebar-nav">
        {menu.map((m) => (
          <NavLink
            key={m.to}
            to={m.to}
            className={({ isActive }) => (isActive ? "nav-item active" : "nav-item")}
          >
            {m.label}
          </NavLink>
        ))}
      </nav>
      <div style={{ marginTop: "auto" }} />
    </aside>
  );
}
