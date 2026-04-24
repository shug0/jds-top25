import { getEntries, REVALIDATE } from "@/lib/sheets"
import { computeGameScores } from "@/lib/scoring"
import { MasonryGrid } from "@/components/masonry-grid"

export const revalidate = REVALIDATE

export default async function HomePage() {
  const entries = await getEntries()
  const scores = computeGameScores(entries)

  return (
    <main style={{ maxWidth: "1400px", margin: "0 auto", padding: "40px 48px" }}>
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
        {" "}· Rafraîchi toutes les heures
      </footer>
    </main>
  )
}
