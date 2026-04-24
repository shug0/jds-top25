import { getEntries } from "@/lib/sheets"
import { computeGameScores } from "@/lib/scoring"
import { MasonryGrid } from "@/components/masonry-grid"

export const revalidate = 3600

export default async function HomePage() {
  const entries = await getEntries()
  const scores = computeGameScores(entries)

  return (
    <main className="page-shell">
      <div className="fade-up">
        <MasonryGrid scores={scores.slice(0, 25)} />
      </div>

      <footer style={{ marginTop: "48px", textAlign: "center", fontSize: "0.75rem", color: "var(--color-text-faint)" }}>
        Données issues d'un{" "}
        <a
          href="https://docs.google.com/spreadsheets/d/1R8g89H3iePN92_vHiKWS3DHgqxllHy06G2sHitbXVIo"
          target="_blank"
          rel="noopener noreferrer"
          style={{ textDecoration: "underline", textUnderlineOffset: "2px", color: "var(--color-text-muted)" }}
        >
          Google Sheets communautaire
        </a>
        {" "}· Par la commu de{" "}
        <a
          href="https://www.youtube.com/@FirstPlayerFr"
          target="_blank"
          rel="noopener noreferrer"
          style={{ textDecoration: "underline", textUnderlineOffset: "2px", color: "var(--color-text-muted)" }}
        >
          First Player
        </a>
        {" "}· Rafraîchi toutes les heures
      </footer>
    </main>
  )
}
