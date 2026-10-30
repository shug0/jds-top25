import Link from "next/link"
import type { GameScore } from "@/lib/types"
import { slugify } from "@/lib/utils"

type Props = { scores: GameScore[] }

const s = {
  label: { fontSize: "11px", color: "var(--color-label)" } as const,
  rank: { fontFamily: "var(--font-sans)", fontWeight: 700, color: "var(--color-rank)", lineHeight: 1, flexShrink: 0 } as const,
  value: { fontWeight: 600, color: "var(--color-text)" } as const,
  titleRow: { display: "flex", justifyContent: "space-between", alignItems: "flex-start" } as const,
  card: (padding: string) => ({ padding, background: "var(--color-card-bg)" }),
  border: { border: "1px solid var(--color-border)" } as const,
}

function delay(index: number) {
  return { animationDelay: `${index * 60}ms` }
}

function Stat({ label, value, valueSize }: { label: string; value: number; valueSize: string }) {
  return (
    <div>
      <p style={{ ...s.label, marginBottom: 0 }}>{label}</p>
      <p style={{ ...s.value, fontSize: valueSize }}>{value}</p>
    </div>
  )
}

function HeroCard({ score }: { score: GameScore }) {
  return (
    <Link href={`/games/${slugify(score.game)}`} className="game-card flex flex-col justify-between h-full" style={s.card("24px 28px")}>
      <div style={s.titleRow}>
        <h2 className="font-bold leading-none" style={{ fontFamily: "var(--font-sans)", fontSize: "clamp(1.8rem, 2.8vw, 2.6rem)", color: "var(--color-text)" }}>
          {score.game}
        </h2>
        <p style={{ ...s.rank, fontSize: "clamp(2rem, 3vw, 3rem)", marginLeft: "16px" }}>#1</p>
      </div>
      <div className="hero-stats">
        <Stat label="Score Borda" value={score.borda} valueSize="1.5rem" />
        {score.top1Count > 0 && <Stat label="Votes #1" value={score.top1Count} valueSize="1.5rem" />}
        <Stat label="Dans top 5" value={score.top5Count} valueSize="1.5rem" />
      </div>
    </Link>
  )
}

function SideCard({ score, rank }: { score: GameScore; rank: number }) {
  return (
    <Link href={`/games/${slugify(score.game)}`} className="game-card flex flex-col justify-between h-full" style={s.card("20px 24px")}>
      <div style={s.titleRow}>
        <h3 className="font-bold leading-tight" style={{ fontFamily: "var(--font-sans)", fontSize: "clamp(1.3rem, 1.8vw, 1.7rem)", color: "var(--color-text)" }}>
          {score.game}
        </h3>
        <p style={{ ...s.rank, fontSize: "clamp(1.4rem, 2vw, 2rem)", marginLeft: "12px" }}>#{rank}</p>
      </div>
      <div style={{ display: "flex", gap: "28px", marginTop: "16px" }}>
        <Stat label="Borda" value={score.borda} valueSize="1.1rem" />
        {score.top1Count > 0 && <Stat label="Votes #1" value={score.top1Count} valueSize="1.1rem" />}
        <Stat label="Top 5" value={score.top5Count} valueSize="1.1rem" />
      </div>
    </Link>
  )
}

function SmallCard({ score, rank }: { score: GameScore; rank: number }) {
  return (
    <Link href={`/games/${slugify(score.game)}`} className="game-card flex flex-col justify-between h-full" style={s.card("16px 20px")}>
      <div style={s.titleRow}>
        <h3 className="font-semibold leading-tight" style={{ fontFamily: "var(--font-sans)", fontSize: "1.2rem", color: "var(--color-text)" }}>
          {score.game}
        </h3>
        <p style={{ ...s.rank, fontSize: "1.4rem", marginLeft: "10px" }}>#{rank}</p>
      </div>
      <div style={{ marginTop: "18px", display: "flex", justifyContent: "space-between" }}>
        <span style={{ fontSize: "13px", fontWeight: 500, color: "var(--color-text-muted)" }}>{score.borda} pts</span>
        <span style={{ fontSize: "13px", color: "var(--color-label)" }}>{score.top5Count} top 5</span>
      </div>
    </Link>
  )
}

function TinyCard({ score, rank }: { score: GameScore; rank: number }) {
  return (
    <Link href={`/games/${slugify(score.game)}`} className="game-card flex items-center justify-between h-full" style={s.card("10px 14px")}>
      <div style={{ display: "flex", alignItems: "center", gap: "12px", minWidth: 0 }}>
        <p style={{ ...s.rank, fontSize: "0.95rem", flexShrink: 0 }}>#{rank}</p>
        <h3 className="font-medium leading-tight" style={{ fontFamily: "var(--font-sans)", fontSize: "0.95rem", color: "var(--color-text)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
          {score.game}
        </h3>
      </div>
      <span style={{ fontSize: "12px", color: "var(--color-label)", flexShrink: 0, marginLeft: "12px" }}>{score.borda} pts</span>
    </Link>
  )
}

export function MasonryGrid({ scores }: Props) {
  const [first, second, third, fourth, fifth, sixth, ...rest] = scores
  const mid = rest.slice(0, 4)
  const tail = rest.slice(4)

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      <div className="masonry-top">
        <div className="fade-up" style={{ ...s.border, ...delay(0) }}>
          {first && <HeroCard score={first} />}
        </div>

        <div className="masonry-col-2">
          {second && <div className="fade-up" style={{ ...s.border, flex: 1, ...delay(1) }}><SideCard score={second} rank={2} /></div>}
          {third && <div className="fade-up" style={{ ...s.border, flex: 1, ...delay(2) }}><SideCard score={third} rank={3} /></div>}
        </div>

        <div className="masonry-col-3">
          {fourth && <div className="fade-up" style={{ ...s.border, flex: 1, ...delay(3) }}><SideCard score={fourth} rank={4} /></div>}
          {fifth && <div className="fade-up" style={{ ...s.border, flex: 1, ...delay(4) }}><SideCard score={fifth} rank={5} /></div>}
          {sixth && <div className="fade-up" style={{ ...s.border, flex: 1, ...delay(5) }}><SideCard score={sixth} rank={6} /></div>}
        </div>
      </div>

      {mid.length > 0 && (
        <div className="masonry-mid">
          {mid.map((score, i) => (
            <div key={score.game} className="fade-up" style={{ ...s.border, ...delay(6 + i) }}>
              <SmallCard score={score} rank={i + 7} />
            </div>
          ))}
        </div>
      )}

      {tail.length > 0 && (
        <div className="masonry-tail">
          {tail.map((score, i) => (
            <div key={score.game} className="fade-up" style={{ ...s.border, ...delay(10 + i) }}>
              <TinyCard score={score} rank={i + 11} />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
