import Card from "../components/Card";
import { useLang } from "../i18n";

export default function Dashboard() {
  const { t, currency, exchangeRates } = useLang();

  const user = { name: "Umang Jain", account: "1234 5678 9012" };

  // Account data
  const accounts = [
    { title: "Savings Account", amount: 2456890, sub: "****1234", desc: "Available Balance" },
    { title: "Current Account", amount: 856420, sub: "****5678", desc: "Available Balance" },
    { title: "Fixed Deposits", amount: 5200000, sub: "3 Active FDs", desc: "Total Investment" },
  ];

  // Compute total balance dynamically
  const totalBaseBalance = accounts.reduce((sum, a) => sum + a.amount, 0);

  const rate = exchangeRates[currency] || 1;
  const formatted = (v) =>
    currency === "KWD"
      ? `KD ${(v * rate).toFixed(2)}`
      : currency === "JPY"
      ? `¥${Math.round(v * rate).toLocaleString()}`
      : `₹${(v * rate).toLocaleString("en-IN")}`;

  return (
    <div>
      {/* Header Card */}
      <Card
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 20,
        }}
      >
        <div>
          <h2>
            {t.welcome}, {user.name}
          </h2>
          <p>
            {t.account}: {user.account}
          </p>
        </div>
        <div>
          <h3>
            {t.balance}: {formatted(totalBaseBalance)}
          </h3>
          <div className="muted" style={{ textAlign: "right" }}>
            Total across all accounts
          </div>
        </div>
      </Card>

      {/* Account Overview */}
      <h3>{t.overview}</h3>
      <div className="acct-grid">
        {accounts.map((a) => (
          <div className="acct-card" key={a.title}>
            <div>{a.title}</div>
            <div className="acct-amount">{formatted(a.amount)}</div>
            <div className="muted">{a.sub}</div>
            <div className="muted">{a.desc}</div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <h3 style={{ marginTop: 24 }}>{t.quick}</h3>
      <div className="actions-grid">
        <div className="action action-green">
          {t.transfer}
          <div className="muted">Send to beneficiaries</div>
        </div>
        <div className="action action-purple">
          View Statements
          <div className="muted">Download history</div>
        </div>
        <div className="action action-orange">
          Open Fixed Deposit
          <div className="muted">Start investing</div>
        </div>
        <div className="action action-blue">
          Manage Profile
          <div className="muted">Update details</div>
        </div>
      </div>

      {/* Recent Transactions */}
      <h3 style={{ marginTop: 24 }}>{t.recent}</h3>
      <Card>
        <div className="txn">
          <div>
            <div className="muted">01-Sep-2025</div>
            <div className="muted">Credit</div>
          </div>
          <div style={{ color: "#16a34a", fontWeight: 700 }}>
            {formatted(450000)}
          </div>
        </div>
      </Card>
    </div>
  );
}
