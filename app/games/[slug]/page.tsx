import Link from "next/link"
import { notFound } from "next/navigation"
import { getEntries } from "@/lib/sheets"
import { computeGameScores } from "@/lib/scoring"

export const revalidate = 3600

type Props = { params: Promise<{ slug: string }> }

export default async function GamePage({ params }: Props) {
  const { slug } = await params
  const game = decodeURIComponent(slug)

  const entries = await getEntries()
  const scores = computeGameScores(entries)
  const globalRankIdx = scores.findIndex((s) => s.game === game)

  if (globalRankIdx === -1) notFound()

  const score = scores[globalRankIdx]
  const globalRank = globalRankIdx + 1
  const gameEntries = entries
    .filter((e) => e.game === game)
    .sort((a, b) => a.rank - b.rank)

  const avgRank = (gameEntries.reduce((s, e) => s + e.rank, 0) / gameEntries.length).toFixed(1)

  return (
    <main style={{ minHeight: "100vh", padding: "48px" }}>
      <div style={{ maxWidth: "720px", margin: "0 auto" }}>
        <div style={{ marginTop: "0", marginBottom: "40px" }} className="fade-up">
          <p style={{ fontSize: "12px", color: "var(--color-label)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "10px" }}>
            #{globalRank} au classement
          </p>
          <h1 style={{ fontFamily: "var(--font-sans)", fontSize: "clamp(1.8rem, 3vw, 2.8rem)", fontWeight: 700, color: "var(--color-text)", marginBottom: "32px", lineHeight: 1.1 }}>
            {game}
          </h1>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "10px" }}>
            {[
              { label: "Score Borda", value: score.borda },
              { label: "Mentions", value: score.mentions },
              { label: "Rang moyen", value: `#${avgRank}` },
            ].map((stat) => (
              <div key={stat.label} style={{ background: "var(--color-card-bg)", border: "1px solid var(--color-border)", padding: "20px 24px" }}>
                <p style={{ fontSize: "11px", color: "var(--color-label)", marginBottom: "8px" }}>{stat.label}</p>
                <p style={{ fontSize: "1.6rem", fontWeight: 700, color: "var(--color-accent)" }}>{stat.value}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="fade-up" style={{ animationDelay: "100ms" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            {[
              { label: "Top 1", players: gameEntries.filter((e) => e.rank === 1), accent: true },
              { label: "Top 5", players: gameEntries.filter((e) => e.rank >= 2 && e.rank <= 5), accent: false },
              { label: "Top 25", players: gameEntries.filter((e) => e.rank >= 6), accent: false },
            ].filter((group) => group.players.length > 0).map((group) => (
              <div key={group.label}>
                <div style={{ marginBottom: "10px" }}>
                  <p style={{ fontSize: "0.95rem", fontWeight: 700, color: group.accent ? "var(--color-accent)" : "var(--color-label)", letterSpacing: "0.06em", textTransform: "uppercase" }}>
                    {group.label}
                  </p>
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                  {group.players.map((e) => (
                    <Link
                      key={`${group.label}-${e.player}`}
                      href={`/players/${encodeURIComponent(e.player)}`}
                      className="game-card"
                      style={{ padding: "6px 12px", background: "var(--color-card-bg)", border: "1px solid var(--color-border)", textDecoration: "none", fontSize: "13px", fontWeight: 500, color: "var(--color-text)" }}
                    >
                      {e.player}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}
