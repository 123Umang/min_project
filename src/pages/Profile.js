import React from "react";
import Card from "../components/Card";
import { useLang } from "../i18n";

export default function Profile() {
  const { t } = useLang();
  return (
    <div>
      <h2>{t.manage}</h2>
      <Card>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          <input placeholder="Full name" />
          <input placeholder="Phone" />
          <input placeholder="Address" />
          <input placeholder="City" />
        </div>
        <div style={{ marginTop: 12 }}>
          <button className="btn">Save</button>
        </div>
      </Card>
    </div>
  );
}
