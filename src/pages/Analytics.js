import React from "react";
import Card from "../components/Card";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { useLang } from "../i18n";

export default function Analytics() {
  const { t } = useLang();
  const data = [
    { category: "Food", amount: 4000 },
    { category: "Travel", amount: 2500 },
    { category: "Shopping", amount: 3500 },
    { category: "Bills", amount: 2000 },
  ];
  return (
    <div>
      <h2>{t.spending}</h2>
      <Card>
        <div style={{ width: "100%", height: 320 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <XAxis dataKey="category" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="amount" fill="#2b9cdb" radius={[8,8,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
}
