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
        <Link href="/" style={{ textDecoration: "none" }}>
          <span style={{ fontFamily: "var(--font-display)", fontSize: "1.3rem", fontWeight: 700, fontStyle: "italic", color: "var(--color-text)" }}>
            JDS{" "}
            <span
              aria-hidden="true"
              style={{
                display: "inline-block",
                width: "0.32em",
                height: "0.32em",
                borderRadius: "999px",
                background: "var(--color-accent)",
                verticalAlign: "middle",
                margin: "0 0.35em",
                transform: "translateY(-0.04em)",
              }}
            />
            {" "}TOP 25
          </span>
        </Link>
        <p style={{ fontSize: "0.8rem", color: "var(--color-label)" }}>
          {playerCount} participants · {scores.length} jeux classés
        </p>
      </div>
    </header>
  )
}
