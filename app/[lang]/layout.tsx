import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "../globals.css"
import Link from "next/link"
import { Heart } from "lucide-react"
import { getDictionary } from "./dictionaries"
import { LanguageSwitcher } from "@/components/language-switcher"
import { arima } from '@/app/layout'
import { inter } from '@/app/layout'

export const metadata: Metadata = {
  title: "Meena's and Arun's Wedding",
  description: "Join us for our special day - June 15, 2024",
}

export async function generateStaticParams() {
  return [{ lang: "en" }, { lang: "ta" }]
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ lang: "en" | "ta" }>
}) {
  const { lang } = await params
  const dict = await getDictionary(lang)
  const fontClass = lang === 'ta' ? arima.className : inter.className

  return (
    <>
      {/* Header with Title */}
      <header className={`bg-white w-[70%] mx-auto text-center py-8 border-b-8 border-[#830065] ${fontClass}`}>
        <h1 className={`text-4xl md:text-6xl font-bold text-[#830065] mb-2`}>
          {dict.home.title}
        </h1>
        <p className="text-lg text-[#830065]">{dict.home.dateValue}</p>
      </header>


      {/* Navigation Bar */}
      <nav className={`bg-white w-[70%] mx-auto border-b-8 border-[#830065] ${fontClass}`}>
        <div className="mx-auto">
          <div className="flex items-center justify-center py-4">
            
            {/* Main Navigation Links */}
            <div className="flex items-center space-x-8">
              <Link 
                href={`/${lang}`} 
                className="text-[#830065] hover:text-[#a3d5ff] transition-colors font-semibold text-lg uppercase tracking-wide"
              >
                {dict.nav.home}
              </Link>
              <Link 
                href={`/${lang}/details`} 
                className="text-[#830065] hover:text-[#a3d5ff] transition-colors font-semibold text-lg uppercase tracking-wide"
              >
                {dict.nav.details}
              </Link>
              <Link 
                href={`/${lang}/rsvp`} 
                className="text-[#830065] hover:text-[#a3d5ff] transition-colors font-semibold text-lg uppercase tracking-wide"
              >
                {dict.nav.rsvp}
              </Link>
              {/* Language Switcher */}
              <div className="ml-auto">
                <LanguageSwitcher currentLang={lang} />
              </div>
            </div>
          </div>
        </div>
      </nav>

      {children}
    </>
  )
}
