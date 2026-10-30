// Télécharge le CSV du Google Sheet une seule fois par build : lib/sheets.ts le lit
// depuis .sheet/sheet.csv, et public/sheet.sha256 (copié dans out/) permet au workflow
// daily.yml de savoir si le Sheet a changé depuis le dernier déploiement.
import { createHash } from "node:crypto"
import { mkdir, writeFile } from "node:fs/promises"

const SHEET_ID = "1R8g89H3iePN92_vHiKWS3DHgqxllHy06G2sHitbXVIo"
const TIDY_GID = "224056819"
const CSV_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/export?format=csv&gid=${TIDY_GID}`

const res = await fetch(CSV_URL)
if (!res.ok) throw new Error(`Failed to fetch sheet: ${res.status}`)
const csv = Buffer.from(await res.arrayBuffer())

await mkdir(".sheet", { recursive: true })
await writeFile(".sheet/sheet.csv", csv)
await writeFile("public/sheet.sha256", `${createHash("sha256").update(csv).digest("hex")}\n`)
