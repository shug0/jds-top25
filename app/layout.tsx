import type { Metadata } from "next"
import { SiteHeader } from "@/components/site-header"
import "./globals.css"

export const metadata: Metadata = {
  title: "Top 25 — Jeux de société",
  description: "Le classement communautaire des jeux préférés du groupe",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>
        <SiteHeader />
        {children}
      </body>
    </html>
  )
}
