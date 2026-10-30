export type RawEntry = {
  titre_jeu: string
  top_perso: string
  nom_joueur: string
}

export type Entry = {
  game: string
  rank: number
  player: string
}

export type GameScore = {
  game: string
  borda: number
  mentions: number
  top1Count: number
  top5Count: number
  players: string[]
}

export type PlayerTop = {
  player: string
  entries: Entry[]
}
