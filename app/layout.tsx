import type { Metadata } from "next"
import { Analytics } from "@vercel/analytics/next"
import { SiteHeader } from "@/components/site-header"
import "./globals.css"

export const metadata: Metadata = {
  title: "JDS . Le Top 25 de la commu",
  description: "Le classement communautaire des jeux préférés du groupe",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>
        <SiteHeader />
        {children}
        <Analytics />
      </body>
    </html>
  )
}
