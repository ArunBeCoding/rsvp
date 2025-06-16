import type React from "react"
import type { Metadata } from "next"
import { Lexend } from "next/font/google"
import "./globals.css"
import { getDictionary } from "./[lang]/dictionaries"
import { Arima } from 'next/font/google'


const arima = Arima({
  subsets: ['latin', 'tamil'],
  weight: ['200'],
  display: 'swap',
})


const inter = Lexend({
   subsets: ["latin"],
   weight: ['200'] 
  })

export const metadata: Metadata = {
  title: "Meena's & Arun's Wedding",
  description: "Join us for our special day - Sept 4th, 2024",
    generator: 'v0.dev'
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode,
  params: Promise<{ lang: "en" | "ta" }>
}) {
  const { lang } = await params
  const dict = await getDictionary(lang)
  const fontClass = lang === 'ta' ? arima.className : inter.className

  return (
    <html>
      <body className={fontClass} suppressHydrationWarning={true}>{children}</body>
    </html>
  )
}


export { arima, inter }
