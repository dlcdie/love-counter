"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";

function pad2(n: number) {
  return n.toString().padStart(2, "0");
}

function formatBR(dateStr?: string) {
  if (!dateStr) return "";
  // aceita "YYYY-MM-DD"
  const [y, m, d] = dateStr.split("-");
  if (!y || !m || !d) return dateStr;
  return `${d}/${m}/${y}`;
}

export default function CustomPage() {
  const sp = useSearchParams();

  // Params (URL)
  const nomes = sp.get("nomes") || "Nosso Amor";
  const inicio = sp.get("inicio") || "2021-01-01"; // YYYY-MM-DD
  const msg =
    sp.get("msg") ||
    "Uma mensagem especial aparece aqui. 💛";
  const foto = sp.get("foto"); // URL opcional da foto

  const inicioISO = useMemo(() => `${inicio}T00:00:00-03:00`, [inicio]);
  const startDate = useMemo(() => new Date(inicioISO).getTime(), [inicioISO]);

  const [now, setNow] = useState(Date.now());
  useEffect(() => {
    const i = setSystemInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(i as any);
  }, []);

  const diff = Math.max(0, now - startDate);
  const totalSeconds = Math.floor(diff / 1000);

  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return (
    <main style={styles.page}>
      <div style={styles.container}>
        {/* Top bar */}
        <div style={styles.topbar}>
          <div style={styles.brand}>
            <span style={styles.brandDot} />
            <span style={styles.brandText}>Love Counter</span>
          </div>
          <div style={styles.badge}>Página vitalícia</div>
        </div>

        {/* Hero */}
        <section style={styles.hero}>
          <div style={styles.heroLeft}>
            <h1 style={styles.title}>{nomes}</h1>
            <p style={styles.subtitle}>
              Juntos desde <strong>{formatBR(inicio)}</strong>
            </p>

            <div style={styles.counterCard}>
              <div style={styles.counterBig}>
                {days} <span style={styles.counterBigLabel}>dias</span>
              </div>
              <div style={styles.counterSmall}>
                {pad2(hours)}:{pad2(minutes)}:{pad2(seconds)}
              </div>
              <div style={styles.counterHint}>contador ao vivo</div>
            </div>

            <div style={styles.messageCard}>
              <div style={styles.cardTitle}>Mensagem 💛</div>
              <p style={styles.messageText}>{msg}</p>
            </div>

            <div style={styles.ctaRow}>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  navigator?.share?.({
                    title: "Love Counter",
                    text: `Olha nossa página: ${nomes}`,
                    url: window.location.href,
                  });
                }}
                style={styles.ctaPrimary}
              >
                Compartilhar
              </a>
              <button
                onClick={() => navigator.clipboard.writeText(window.location.href)}
                style={styles.ctaSecondary}
              >
                Copiar link
              </button>
            </div>

            <div style={styles.footerMini}>
              Feito para presente • QR Code + NFC • <span style={{ opacity: 0.9 }}>love-counter</span>
            </div>
          </div>

          {/* Foto */}
          <div style={styles.heroRight}>
            <div style={styles.photoCard}>
              {foto ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={foto} alt="Foto do casal" style={styles.photoImg} />
              ) : (
                <div style={styles.photoPlaceholder}>
                  <div style={styles.heart}>❤</div>
                  <div style={styles.photoHint}>
                    Adicione foto pela URL
                    <div style={{ fontSize: 12, opacity: 0.75, marginTop: 6 }}>
                      <code>?foto=https://...</code>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div style={styles.tipsCard}>
              <div style={styles.cardTitle}>Dica rápida</div>
              <div style={styles.tipsText}>
                Para usar na plaquinha: gere um QR para esse link e grave o mesmo link no NFC.
              </div>
            </div>
          </div>
        </section>

        {/* Bottom spacing */}
        <div style={{ height: 24 }} />
      </div>
    </main>
  );
}

/** ✅ sem libs: só estilos inline premium */
const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: "100vh",
    background:
      "radial-gradient(1200px 600px at 20% 10%, rgba(255, 105, 180, 0.18), transparent 60%)," +
      "radial-gradient(900px 500px at 80% 20%, rgba(255, 215, 0, 0.16), transparent 55%)," +
      "linear-gradient(180deg, #0b0b10 0%, #0f1020 100%)",
    color: "#fff",
    padding: 22,
  },
  container: {
    maxWidth: 1080,
    margin: "0 auto",
  },
  topbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 12,
    marginBottom: 18,
  },
  brand: {
    display: "flex",
    alignItems: "center",
    gap: 10,
  },
  brandDot: {
    width: 10,
    height: 10,
    borderRadius: 999,
    background: "linear-gradient(180deg, #ff4d9d, #ffcc00)",
    boxShadow: "0 0 18px rgba(255, 105, 180, 0.35)",
  },
  brandText: {
    fontWeight: 700,
    letterSpacing: 0.3,
    opacity: 0.95,
  },
  badge: {
    fontSize: 12,
    padding: "8px 10px",
    borderRadius: 999,
    background: "rgba(255,255,255,0.10)",
    border: "1px solid rgba(255,255,255,0.18)",
    backdropFilter: "blur(10px)",
    opacity: 0.9,
  },
  hero: {
    display: "grid",
    gridTemplateColumns: "1.2fr 0.8fr",
    gap: 18,
  },
  heroLeft: {
    display: "flex",
    flexDirection: "column",
    gap: 14,
  },
  heroRight: {
    display: "flex",
    flexDirection: "column",
    gap: 14,
  },
  title: {
    fontSize: 44,
    lineHeight: 1.05,
    margin: 0,
    letterSpacing: -0.5,
  },
  subtitle: {
    margin: 0,
    opacity: 0.85,
  },
  counterCard: {
    borderRadius: 22,
    padding: 18,
    border: "1px solid rgba(255,255,255,0.16)",
    background: "rgba(255,255,255,0.08)",
    backdropFilter: "blur(10px)",
    boxShadow: "0 18px 40px rgba(0,0,0,0.35)",
  },
  counterBig: {
    fontSize: 54,
    fontWeight: 800,
    letterSpacing: -0.8,
  },
  counterBigLabel: {
    fontSize: 16,
    fontWeight: 600,
    opacity: 0.85,
  },
  counterSmall: {
    marginTop: 8,
    fontSize: 20,
    opacity: 0.9,
    letterSpacing: 1,
  },
  counterHint: {
    marginTop: 10,
    fontSize: 12,
    opacity: 0.65,
  },
  messageCard: {
    borderRadius: 22,
    padding: 18,
    border: "1px solid rgba(255,255,255,0.16)",
    background: "rgba(255,255,255,0.06)",
    backdropFilter: "blur(10px)",
  },
  cardTitle: {
    fontSize: 13,
    fontWeight: 700,
    opacity: 0.9,
    marginBottom: 10,
    letterSpacing: 0.2,
  },
  messageText: {
    margin: 0,
    lineHeight: 1.7,
    opacity: 0.9,
  },
  ctaRow: {
    display: "flex",
    gap: 12,
    flexWrap: "wrap",
    marginTop: 2,
  },
  ctaPrimary: {
    textDecoration: "none",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "12px 14px",
    borderRadius: 14,
    background: "linear-gradient(180deg, #ff4d9d, #ffcc00)",
    color: "#101018",
    fontWeight: 800,
    border: "none",
    cursor: "pointer",
    minWidth: 140,
  },
  ctaSecondary: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "12px 14px",
    borderRadius: 14,
    background: "rgba(255,255,255,0.10)",
    color: "#fff",
    fontWeight: 700,
    border: "1px solid rgba(255,255,255,0.18)",
    cursor: "pointer",
    minWidth: 140,
  },
  footerMini: {
    marginTop: 4,
    fontSize: 12,
    opacity: 0.65,
  },
  photoCard: {
    borderRadius: 22,
    overflow: "hidden",
    border: "1px solid rgba(255,255,255,0.16)",
    background: "rgba(255,255,255,0.06)",
    minHeight: 320,
    boxShadow: "0 18px 40px rgba(0,0,0,0.35)",
  },
  photoImg: {
    width: "100%",
    height: 360,
    objectFit: "cover",
    display: "block",
  },
  photoPlaceholder: {
    height: 360,
    display: "grid",
    placeItems: "center",
    padding: 18,
  },
  heart: {
    fontSize: 46,
    textShadow: "0 10px 30px rgba(255, 77, 157, 0.35)",
    marginBottom: 10,
  },
  photoHint: {
    textAlign: "center",
    opacity: 0.85,
    lineHeight: 1.5,
  },
  tipsCard: {
    borderRadius: 22,
    padding: 18,
    border: "1px solid rgba(255,255,255,0.16)",
    background: "rgba(255,255,255,0.06)",
    backdropFilter: "blur(10px)",
  },
  tipsText: {
    fontSize: 14,
    lineHeight: 1.6,
    opacity: 0.85,
  },
};

// Pequena compatibilidade (alguns ambientes reclamam do type)
function setSystemInterval(fn: () => void, ms: number) {
  return setInterval(fn, ms);
}
