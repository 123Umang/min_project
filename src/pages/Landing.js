import React from "react";
import { useLang } from "../i18n";
import { Link } from "react-router-dom";

export default function Landing() {
  const { t } = useLang();
  return (
    <div className="page center">
      <div style={{ maxWidth: 900 }}>
        <h1 style={{ fontSize: 28 }}>{t.landingTitle}</h1>
        <p style={{ color: "#6b7280" }}>A neat banking UI prototype built with React.</p>
        <div style={{ marginTop: 20 }}>
          <Link to="/login" className="btn">Get started</Link>
          <Link to="/register" className="btn btn-ghost" style={{ marginLeft: 12 }}>Register</Link>
        </div>
      </div>
    </div>
  );
}
