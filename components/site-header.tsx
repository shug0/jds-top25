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
      <div className="header-shell">
        <Link href="/" style={{ textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "0.35em", lineHeight: 1 }}>
            <span style={{ fontFamily: "var(--font-display)", fontSize: "1.25rem", fontWeight: 700, fontStyle: "italic", color: "var(--color-text)" }}>
              JDS
            </span>
            <span
              aria-hidden="true"
              style={{
                width: "0.3em",
                height: "0.3em",
                borderRadius: "999px",
                background: "var(--color-accent)",
              }}
            />
            <span style={{ fontFamily: "var(--font-sans)", fontSize: "1rem", fontWeight: 800, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--color-text)" }}>
              TOP 25
            </span>
          <span style={{ fontFamily: "var(--font-display)", fontSize: "0.85rem", color: "var(--color-text-muted)", transform: "translateY(0.04em)" }}>
            de la commu
          </span>
        </Link>
        <p style={{ fontSize: "0.8rem", color: "var(--color-label)" }}>
          {playerCount} participants · {scores.length} jeux classés
        </p>
      </div>
    </header>
  )
}
