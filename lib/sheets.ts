import Papa from "papaparse"
import type { RawEntry, Entry } from "./types"
import { buildFuseIndex, normalizeTitle } from "./fuzzy"

const SHEET_ID = "1R8g89H3iePN92_vHiKWS3DHgqxllHy06G2sHitbXVIo"
const TIDY_GID = "224056819"

const CSV_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/export?format=csv&gid=${TIDY_GID}`

export const REVALIDATE = 86400

async function fetchCsv(): Promise<RawEntry[]> {
  const res = await fetch(CSV_URL, { next: { revalidate: REVALIDATE } })
  if (!res.ok) throw new Error(`Failed to fetch sheet: ${res.status}`)
  const text = await res.text()

  const { data } = Papa.parse<RawEntry>(text, {
    header: true,
    skipEmptyLines: true,
    transformHeader: (h) => h.trim().toLowerCase().replace(/\s+/g, "_"),
  })

  return data
}

export async function getEntries(): Promise<Entry[]> {
  const raw = await fetchCsv()

  const rawTitles = raw.flatMap((r) => (r.titre_jeu?.trim() ? [r.titre_jeu.trim()] : []))
  buildFuseIndex(rawTitles)

  return raw
    .map((r) => {
      const rankMatch = r.top_perso?.match(/\d+/)
      const rank = rankMatch ? Number.parseInt(rankMatch[0], 10) : null
      if (!rank || !r.titre_jeu?.trim() || !r.nom_joueur?.trim()) return null

      return {
        game: normalizeTitle(r.titre_jeu.trim()),
        rank,
        player: r.nom_joueur.trim(),
      } satisfies Entry
    })
    .filter((e): e is Entry => e !== null)
}
