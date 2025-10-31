import React from "react";
import Card from "../components/Card";
import { useLang } from "../i18n";

export default function FixedDeposit() {
  const { t, currency, exchangeRates } = useLang();
  const rate = exchangeRates[currency];
  return (
    <div>
      <h2>Fixed Deposits</h2>
      <Card>
        <p className="muted">You have 3 active fixed deposits</p>
        <div style={{ display: "flex", gap: 12 }}>
          <div className="fd-card">FD#1 - {(120000*rate).toFixed(currency==="KWD"?2:0)} {currency}</div>
          <div className="fd-card">FD#2 - {(240000*rate).toFixed(currency==="KWD"?2:0)} {currency}</div>
        </div>
      </Card>
    </div>
  );
}
