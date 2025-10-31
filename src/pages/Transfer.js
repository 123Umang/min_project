import React, { useState, useEffect } from "react";
import Card from "../components/Card";
import { useLang } from "../i18n";

export default function Transfer() {
  const { t, currency, exchangeRates } = useLang();

  // Simulated logged-in user
  const user = { name: "Umang Jain", account: "123456789012" };

  // Load balance from localStorage or use default
  const [balance, setBalance] = useState(() => {
    const saved = localStorage.getItem("balance");
    return saved ? Number(saved) : 850000;
  });

  // Load stored transactions or empty list
  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem("transactions");
    return saved ? JSON.parse(saved) : [];
  });

  // Form fields and messages
  const [to, setTo] = useState("");
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");

  // Currency rate and formatter
  const rate = exchangeRates[currency] || 1;
  const fmt = (v) =>
    currency === "KWD"
      ? `KD ${(v * rate).toFixed(2)}`
      : currency === "JPY"
      ? `¥${Math.round(v * rate).toLocaleString()}`
      : `₹${(v * rate).toLocaleString("en-IN")}`;

  // Save balance persistently
  useEffect(() => {
    localStorage.setItem("balance", balance);
  }, [balance]);

  // Save transactions persistently
  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions]);

  // Ensure balance syncs on page reload or navigation back
  useEffect(() => {
    const saved = localStorage.getItem("balance");
    if (saved) setBalance(Number(saved));
  }, []);

  const submit = (e) => {
    e.preventDefault();
    setMessage("");

    // Validate account number
    if (!to || !/^\d{12}$/.test(to)) {
      setMessage("❌ Invalid account number. Must be 12 digits.");
      return;
    }

    // Validate amount
    const amt = Number(amount);
    if (isNaN(amt) || amt <= 0) {
      setMessage("❌ Please enter a valid transfer amount.");
      return;
    }

    const date = new Date().toLocaleString();

    // ✅ Self-transfer logic (add balance)
    if (to === user.account) {
      const newBal = balance + amt;
      setBalance(newBal);
      localStorage.setItem("balance", newBal); // persist immediately
      setTransactions((prev) => [
        ...prev,
        { type: "Self Transfer", to, amount: amt, date },
      ]);
      setMessage(`✅ Self-transfer successful. New balance: ${fmt(newBal)}`);
      return;
    }

    // ✅ Regular transfer (no subtraction)
    setTransactions((prev) => [
      ...prev,
      { type: "Transfer", to, amount: amt, date },
    ]);
    setMessage(`✅ Transferred ${fmt(amt)} to Account ${to}.`);
  };

  return (
    <div>
      <h2>{t.transfer}</h2>

      <Card>
        {/* Account Info */}
        <div style={{ marginBottom: 10 }}>
          <b>Your Account:</b> {user.account} <br />
          <b>Balance:</b> {fmt(balance)}
        </div>

        {/* Transfer Form */}
        <form
          onSubmit={submit}
          style={{ display: "flex", flexDirection: "column", gap: 10 }}
        >
          <input
            placeholder={t.recipient}
            value={to}
            onChange={(e) => setTo(e.target.value)}
          />
          <input
            placeholder={t.amount}
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <button className="btn" type="submit">
            {t.send}
          </button>
        </form>

        {/* Status Message */}
        {message && (
          <div
            style={{
              marginTop: 10,
              color: message.startsWith("❌") ? "red" : "green",
              fontWeight: 600,
            }}
          >
            {message}
          </div>
        )}
      </Card>

      {/* Transaction History */}
      <h3 style={{ marginTop: 24 }}>Transaction History</h3>
      <Card>
        {transactions.length === 0 ? (
          <div className="muted">No transactions yet.</div>
        ) : (
          <div>
            {transactions
              .slice()
              .reverse()
              .map((tx, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    borderBottom: "1px solid #eee",
                    padding: "6px 0",
                  }}
                >
                  <div>
                    <div>
                      <b>{tx.type}</b> → {tx.to}
                    </div>
                    <div className="muted">{tx.date}</div>
                  </div>
                  <div
                    style={{
                      color:
                        tx.type === "Self Transfer" ? "#16a34a" : "#2563eb",
                      fontWeight: 700,
                    }}
                  >
                    {fmt(tx.amount)}
                  </div>
                </div>
              ))}
          </div>
        )}
      </Card>
    </div>
  );
}
