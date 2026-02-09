"use client";

import { useEffect, useMemo, useState } from "react";
import { getCasalBySlug } from "../../casais";

export default function CasalPage({ params }: { params: { slug: string } }) {
  const casal = useMemo(() => getCasalBySlug(params.slug), [params.slug]);

  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    const interval = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(interval);
  }, []);

  if (!casal) {
    return (
      <main style={{ minHeight: "100vh", display: "grid", placeItems: "center", padding: 24 }}>
        <div style={{ textAlign: "center" }}>
          <h1 style={{ fontSize: 28, marginBottom: 8 }}>Página não encontrada</h1>
          <p style={{ opacity: 0.7 }}>
            Esse casal ainda não foi cadastrado.
          </p>
        </div>
      </main>
    );
  }

  const startDate = new Date(casal.inicioISO).getTime();
  const diff = Math.max(0, now - startDate);
  const totalSeconds = Math.floor(diff / 1000);

  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return (
    <main style={{ minHeight: "100vh", display: "grid", placeItems: "center", padding: 24 }}>
      <div style={{ maxWidth: 560, width: "100%", textAlign: "center" }}>
        <h1 style={{ fontSize: 42, marginBottom: 8 }}>{casal.nomes}</h1>
        <p style={{ opacity: 0.7, marginBottom: 20 }}>Juntos desde {casal.dataCurta}</p>

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
          <p>{casal.mensagem}</p>
        </div>

        <p style={{ marginTop: 20, fontSize: 12, opacity: 0.5 }}>
          love-counter • página vitalícia
        </p>
      </div>
    </main>
  );
}
