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
  title: "Meena's and Arun's Wedding"
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
      <header className={`w-[70%] mx-auto text-center py-8 border-b-8 border-[#FFFFFF] ${fontClass}`}>
        <h1 className={`text-4xl md:text-6xl font-bold text-[#FFFFFF] mb-2`}>
          {dict.home.title}
        </h1>
        {/* <p className="text-lg text-[#FFFFFF]">{dict.home.dateValue}</p> */}
      </header>


      {/* Navigation Bar */}
      <nav className={`w-[70%] mx-auto border-b-8 border-[#FFFFFF] ${fontClass}`}>
        <div className="mx-auto">
          <div className="flex items-center justify-center py-4">
            
            {/* Main Navigation Links */}
            <div className="flex items-center space-x-8">
              <Link 
                href={`/${lang}`} 
                className="text-[#FFFFFF] hover:text-[#A98083] transition-colors font-semibold text-lg uppercase tracking-wide"
              >
                {dict.nav.home}
              </Link>
              <Link 
                href={`/${lang}/details`} 
                className="text-[#FFFFFF] hover:text-[#A98083] transition-colors font-semibold text-lg uppercase tracking-wide"
              >
                {dict.nav.details}
              </Link>
              <Link 
                href={`/${lang}/rsvp`} 
                className="text-[#FFFFFF] hover:text-[#A98083] transition-colors font-semibold text-lg uppercase tracking-wide"
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
