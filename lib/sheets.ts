import { readFile } from "node:fs/promises"
import Papa from "papaparse"
import { buildFuseIndex, normalizeTitle } from "./fuzzy"
import type { Entry, RawEntry } from "./types"

// Écrit par scripts/fetch-sheet.mjs, lancé avant `next build` et `next dev`.
async function readCsv(): Promise<RawEntry[]> {
  const text = await readFile(".sheet/sheet.csv", "utf8")

  const { data } = Papa.parse<RawEntry>(text, {
    header: true,
    skipEmptyLines: true,
    transformHeader: (h) => h.trim().toLowerCase().replace(/\s+/g, "_"),
  })

  return data
}

async function loadEntries(): Promise<Entry[]> {
  const raw = await readCsv()

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

// Chaque page du build appelle getEntries : le CSV n'est lu et indexé qu'une fois par processus.
let entries: Promise<Entry[]> | undefined

export function getEntries(): Promise<Entry[]> {
  entries ??= loadEntries()
  return entries
}
