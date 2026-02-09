"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";

function formatBR(dateStr?: string) {
  if (!dateStr) return "";
  // aceita "YYYY-MM-DD"
  const [y, m, d] = dateStr.split("-");
  if (!y || !m || !d) return dateStr;
  return `${d}/${m}/${y}`;
}

export default function CustomPage() {
  const sp = useSearchParams();
  const nomes = sp.get("nomes") || "Nosso Amor";
  const inicio = sp.get("inicio") || "2021-01-01";
  const msg =
    sp.get("msg") ||
    "Uma mensagem especial aparece aqui. 💛";
  const youtube = sp.get("yt"); // opcional

  const inicioISO = useMemo(() => `${inicio}T00:00:00-03:00`, [inicio]);
  const startDate = useMemo(() => new Date(inicioISO).getTime(), [inicioISO]);

  const [now, setNow] = useState(Date.now());
  useEffect(() => {
    const i = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(i);
  }, []);

  const diff = Math.max(0, now - startDate);
  const totalSeconds = Math.floor(diff / 1000);

  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return (
    <main style={{ minHeight: "100vh", display: "grid", placeItems: "center", padding: 24 }}>
      <div style={{ maxWidth: 560, width: "100%", textAlign: "center" }}>
        <h1 style={{ fontSize: 42, marginBottom: 8 }}>{nomes}</h1>
        <p style={{ opacity: 0.7, marginBottom: 20 }}>Juntos desde {formatBR(inicio)}</p>

        <div style={{ border: "1px solid #eee", borderRadius: 18, padding: 20, marginBottom: 20 }}>
          <div style={{ fontSize: 56, fontWeight: 700 }}>{days} dias</div>
          <div style={{ marginTop: 10, fontSize: 18, opacity: 0.9 }}>
            {hours.toString().padStart(2, "0")}:
            {minutes.toString().padStart(2, "0")}:
            {seconds.toString().padStart(2, "0")}
          </div>
        </div>

        <div style={{ background: "#fafafa", borderRadius: 18, padding: 20, lineHeight: 1.6 }}>
          <h2 style={{ marginBottom: 8 }}>Mensagem 💛</h2>
          <p>{msg}</p>

          {youtube ? (
            <p style={{ marginTop: 12, fontSize: 13, opacity: 0.75 }}>
              Música: {youtube}
            </p>
          ) : null}
        </div>

        <p style={{ marginTop: 20, fontSize: 12, opacity: 0.5 }}>
          love-counter • página vitalícia
        </p>
      </div>
    </main>
  );
}
