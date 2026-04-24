import Fuse from "fuse.js"

const MANUAL_OVERRIDES: Record<string, string> = {
  "brass lancs": "Brass: Lancashire",
  "brass lancashire": "Brass: Lancashire",
  brass: "Brass: Lancashire",
  "dune insurrection": "Dune Imperium: Insurrection",
  "dune imperium insurrection": "Dune Imperium: Insurrection",
  "châteaux de bourgogne": "Les Châteaux de Bourgogne",
  "les chateaux de bourgogne": "Les Châteaux de Bourgogne",
  "chateaux de bourgogne": "Les Châteaux de Bourgogne",
  "horreur a arkham jce": "Horreur à Arkham JCE",
  "horreur à arkham jce": "Horreur à Arkham JCE",
  "tzol'kin": "Tzolk'in",
  tzolkin: "Tzolk'in",
  "great western trail": "Great Western Trail",
  gwt: "Great Western Trail",
  "projet gaia": "Projet Gaïa",
  "project gaia": "Projet Gaïa",
}

let fuse: Fuse<string> | null = null
let canonical: string[] = []

export function buildFuseIndex(titles: string[]) {
  canonical = [...new Set(titles)]
  fuse = new Fuse(canonical, { threshold: 0.3, distance: 100 })
}

export function normalizeTitle(raw: string): string {
  const key = raw.toLowerCase().trim()

  if (MANUAL_OVERRIDES[key]) return MANUAL_OVERRIDES[key]

  if (fuse && canonical.length) {
    const results = fuse.search(raw)
    if (results.length && results[0].score !== undefined && results[0].score < 0.25) {
      return results[0].item
    }
  }

  return raw
}
