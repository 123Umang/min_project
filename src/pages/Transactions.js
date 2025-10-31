import React from "react";
import Card from "../components/Card";
import { useLang } from "../i18n";

export default function Transactions() {
  const { t, currency, exchangeRates } = useLang();
  const rate = exchangeRates[currency];
  const txns = [
    { id: 1, date: "01-Sep-2025", type: "Credit", amount: 5000 },
    { id: 2, date: "29-Aug-2025", type: "Debit", amount: -2000 },
    { id: 3, date: "27-Aug-2025", type: "Debit", amount: -1500 },
  ];
  const fmt = (v) => (currency === "KWD" ? `KD ${ (v*rate).toFixed(2) }` : currency === "JPY" ? `¥${Math.round(v*rate)}` : `₹${(v*rate).toLocaleString("en-IN")}`);
  return (
    <div>
      <h2>{t.recent}</h2>
      <Card>
        <ul className="txn-list">
          {txns.map((x) => (
            <li key={x.id} className="txn-row">
              <div>
                <div style={{ fontWeight: 700 }}>{x.date}</div>
                <div className="muted">{x.type}</div>
              </div>
              <div style={{ color: x.type === "Credit" ? "#16a34a" : "#dc2626", fontWeight: 700 }}>{fmt(Math.abs(x.amount))}</div>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}
