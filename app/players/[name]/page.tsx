import Link from "next/link"
import { notFound } from "next/navigation"
import { computeGameScores, getPlayerTops } from "@/lib/scoring"
import { getEntries } from "@/lib/sheets"
import { slugify } from "@/lib/utils"

export const dynamicParams = false

export async function generateStaticParams() {
  const entries = await getEntries()
  const players = getPlayerTops(entries)
  return players.map((p) => ({ name: slugify(p.player) }))
}

type Props = { params: Promise<{ name: string }> }

export default async function PlayerPage({ params }: Props) {
  const { name } = await params

  const entries = await getEntries()
  const playerEntries = entries.filter((e) => slugify(e.player) === name).sort((a, b) => a.rank - b.rank)

  if (!playerEntries.length) notFound()

  const player = playerEntries[0].player
  const scores = computeGameScores(entries)

  return (
    <main style={{ minHeight: "100vh", padding: "48px" }}>
      <div style={{ maxWidth: "720px", margin: "0 auto" }}>
        <div style={{ marginBottom: "40px" }} className="fade-up">
          <p style={{ fontSize: "12px", color: "var(--color-label)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "10px" }}>Profil joueur</p>
          <h1 style={{ fontFamily: "var(--font-sans)", fontSize: "clamp(1.8rem, 3vw, 2.8rem)", fontWeight: 700, color: "var(--color-text)", marginBottom: "32px", lineHeight: 1.1 }}>{player}</h1>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "10px" }}>
            {[
              { label: "Jeux classés", value: playerEntries.length },
              { label: "Top 1 obtenus", value: playerEntries.filter((e) => e.rank === 1).length },
            ].map((stat) => (
              <div key={stat.label} style={{ background: "var(--color-card-bg)", border: "1px solid var(--color-border)", padding: "20px 24px" }}>
                <p style={{ fontSize: "11px", color: "var(--color-label)", marginBottom: "8px" }}>{stat.label}</p>
                <p style={{ fontSize: "1.6rem", fontWeight: 700, color: "var(--color-accent)" }}>{stat.value}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="fade-up" style={{ animationDelay: "100ms" }}>
          <p style={{ fontSize: "12px", color: "var(--color-label)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "12px" }}>Top {playerEntries.length} personnel</p>

          <div style={{ border: "1px solid var(--color-border)" }}>
            <div style={{ display: "grid", gridTemplateColumns: "3.5rem 1fr 5rem", padding: "10px 16px", borderBottom: "1px solid var(--color-border)", background: "var(--color-card-bg)" }}>
              <span style={{ fontSize: "11px", color: "var(--color-label)", textTransform: "uppercase", letterSpacing: "0.08em" }}>Pos.</span>
              <span style={{ fontSize: "11px", color: "var(--color-label)", textTransform: "uppercase", letterSpacing: "0.08em" }}>Jeu</span>
              <span style={{ fontSize: "11px", color: "var(--color-label)", textTransform: "uppercase", letterSpacing: "0.08em", textAlign: "right" }}>Rng global</span>
            </div>

            {playerEntries.map((e) => {
              const idx = scores.findIndex((s) => s.game === e.game)
              const globalRank = idx !== -1 ? idx + 1 : null

              return (
                <div key={e.rank} style={{ display: "grid", gridTemplateColumns: "3.5rem 1fr 5rem", alignItems: "center", padding: "12px 16px", borderBottom: "1px solid var(--color-border)" }}>
                  <span style={{ fontSize: "13px", fontWeight: 600, color: e.rank <= 3 ? "var(--color-accent)" : "var(--color-label)" }}>#{e.rank}</span>
                  <Link
                    href={`/games/${slugify(e.game)}`}
                    style={{ fontSize: "14px", color: "var(--color-text)", textDecoration: "none", fontWeight: 500, paddingRight: "16px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}
                  >
                    {e.game}
                  </Link>
                  <span style={{ fontSize: "13px", color: globalRank && globalRank <= 10 ? "var(--color-accent)" : "var(--color-label)", textAlign: "right" }}>{globalRank ? `#${globalRank}` : "—"}</span>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </main>
  )
}
