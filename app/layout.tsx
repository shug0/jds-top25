import type { Metadata } from "next"
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
        <script defer src="https://umami.namastourte.synology.me:8443/script.js" data-website-id="c317e3ab-8380-43b5-bdce-2a1c38ba7ebb" data-domains="top25.needacoffee.fr" />
        <SiteHeader />
        {children}
      </body>
    </html>
  )
}
