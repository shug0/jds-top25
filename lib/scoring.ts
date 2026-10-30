import type { Entry, GameScore, PlayerTop } from "./types"

const BORDA_MAX = 25

export function computeGameScores(entries: Entry[]): GameScore[] {
  const map = new Map<string, GameScore>()

  for (const entry of entries) {
    const points = BORDA_MAX - entry.rank + 1
    const existing = map.get(entry.game)

    if (existing) {
      existing.borda += points
      existing.mentions += 1
      if (entry.rank === 1) existing.top1Count += 1
      if (entry.rank <= 5) existing.top5Count += 1
      if (!existing.players.includes(entry.player)) {
        existing.players.push(entry.player)
      }
    } else {
      map.set(entry.game, {
        game: entry.game,
        borda: points,
        mentions: 1,
        top1Count: entry.rank === 1 ? 1 : 0,
        top5Count: entry.rank <= 5 ? 1 : 0,
        players: [entry.player],
      })
    }
  }

  return [...map.values()].sort((a, b) => b.borda - a.borda)
}

export function getPlayerTops(entries: Entry[]): PlayerTop[] {
  const map = new Map<string, Entry[]>()

  for (const entry of entries) {
    const list = map.get(entry.player) ?? []
    list.push(entry)
    map.set(entry.player, list)
  }

  return [...map.entries()]
    .map(([player, entries]) => ({
      player,
      entries: entries.sort((a, b) => a.rank - b.rank),
    }))
    .sort((a, b) => a.player.localeCompare(b.player))
}
