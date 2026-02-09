"use client";

import { useEffect, useState } from "react";

export default function Page() {
  const startDate = new Date("2021-03-12T00:00:00-03:00").getTime();
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    const interval = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(interval);
  }, []);

  const diff = Math.max(0, now - startDate);
  const totalSeconds = Math.floor(diff / 1000);

  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return (
    <main style={{ minHeight: "100vh", display: "grid", placeItems: "center", padding: 24 }}>
      <div style={{ maxWidth: 520, width: "100%", textAlign: "center" }}>
        <h1 style={{ fontSize: 42, marginBottom: 8 }}>Ana & Diego</h1>
        <p style={{ opacity: 0.7, marginBottom: 20 }}>Juntos há</p>

        <div style={{ border: "1px solid #eee", borderRadius: 18, padding: 20, marginBottom: 20 }}>
          <div style={{ fontSize: 56, fontWeight: 700 }}>{days} dias</div>
          <div style={{ marginTop: 10, fontSize: 18 }}>
            {hours.toString().padStart(2, "0")}:
            {minutes.toString().padStart(2, "0")}:
            {seconds.toString().padStart(2, "0")}
          </div>
        </div>

        <div style={{ background: "#fafafa", borderRadius: 18, padding: 20, lineHeight: 1.6 }}>
          <h2>Nossa história 💛</h2>
          <p>
            Tudo começou de um jeito simples, mas se transformou em algo
            que hoje faz todo sentido.
          </p>
        </div>
      </div>
    </main>
  );
}
