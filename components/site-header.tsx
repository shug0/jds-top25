import Link from "next/link"
import { getEntries } from "@/lib/sheets"
import { computeGameScores } from "@/lib/scoring"

export async function SiteHeader() {
  const entries = await getEntries()
  const scores = computeGameScores(entries)
  const playerCount = new Set(entries.map((e) => e.player)).size

  return (
    <header style={{
      position: "sticky",
      top: 0,
      zIndex: 50,
      background: "rgba(15, 15, 15, 0.85)",
      backdropFilter: "blur(12px)",
      borderBottom: "1px solid var(--color-border)",
    }}>
      <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "0 48px", height: "52px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Link href="/" style={{ textDecoration: "none" }}>
          <span style={{ fontFamily: "var(--font-display)", fontSize: "1.3rem", fontWeight: 700, fontStyle: "italic", color: "var(--color-text)" }}>
            Top 25<span style={{ color: "var(--color-accent)" }}>.</span>
          </span>
        </Link>
        <p style={{ fontSize: "0.8rem", color: "var(--color-label)" }}>
          {playerCount} participants · {scores.length} jeux classés
        </p>
      </div>
    </header>
  )
}
