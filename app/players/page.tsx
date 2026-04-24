import Link from "next/link"
import { getEntries, REVALIDATE } from "@/lib/sheets"
import { getPlayerTops } from "@/lib/scoring"

export const revalidate = REVALIDATE

export default async function PlayersPage() {
  const entries = await getEntries()
  const players = getPlayerTops(entries)

  return (
    <main style={{ minHeight: "100vh", padding: "48px" }}>
      <div style={{ maxWidth: "720px", margin: "0 auto" }}>
        <div style={{ marginBottom: "40px" }} className="fade-up">
          <p style={{ fontSize: "12px", color: "var(--color-label)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "10px" }}>
            {players.length} participants
          </p>
          <h1 style={{ fontFamily: "var(--font-sans)", fontSize: "clamp(1.8rem, 3vw, 2.8rem)", fontWeight: 700, color: "var(--color-text)", lineHeight: 1.1 }}>
            Joueurs
          </h1>
        </div>

        <div className="fade-up" style={{ animationDelay: "80ms", border: "1px solid var(--color-border)" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 5rem", padding: "10px 16px", borderBottom: "1px solid var(--color-border)", background: "var(--color-card-bg)" }}>
            <span style={{ fontSize: "11px", color: "var(--color-label)", textTransform: "uppercase", letterSpacing: "0.08em" }}>Joueur</span>
            <span style={{ fontSize: "11px", color: "var(--color-label)", textTransform: "uppercase", letterSpacing: "0.08em", textAlign: "right" }}>Jeux</span>
          </div>

          {players.map((p, i) => (
            <Link
              key={p.player}
              href={`/players/${encodeURIComponent(p.player)}`}
              className="game-card"
              style={{ display: "grid", gridTemplateColumns: "1fr 5rem", alignItems: "center", padding: "12px 16px", borderBottom: "1px solid var(--color-border)", textDecoration: "none" }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                <span style={{ fontSize: "12px", color: "var(--color-label)", width: "2rem" }}>{i + 1}</span>
                <span style={{ fontSize: "14px", fontWeight: 500, color: "var(--color-text)" }}>{p.player}</span>
              </div>
              <span style={{ fontSize: "13px", color: "var(--color-label)", textAlign: "right" }}>{p.entries.length}</span>
            </Link>
          ))}
        </div>
      </div>
    </main>
  )
}
