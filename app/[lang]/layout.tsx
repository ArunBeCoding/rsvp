import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "../globals.css"
import Link from "next/link"
import { Heart } from "lucide-react"
import { getDictionary } from "./dictionaries"
import { LanguageSwitcher } from "@/components/language-switcher"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Sarah & Michael's Wedding",
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

  return (
    <>
      <nav className="bg-white/90 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link href={`/${lang}`} className="flex items-center space-x-2">
              <Heart className="h-6 w-6 text-red-500 fill-current" />
              <span className="font-semibold text-gray-900">S & M</span>
            </Link>

            <div className="flex items-center space-x-4">
              <div className="flex space-x-6">
                <Link href={`/${lang}`} className="text-gray-700 hover:text-indigo-600 transition-colors font-medium">
                  {dict.nav.home}
                </Link>
                <Link
                  href={`/${lang}/details`}
                  className="text-gray-700 hover:text-indigo-600 transition-colors font-medium"
                >
                  {dict.nav.details}
                </Link>
                <Link
                  href={`/${lang}/rsvp`}
                  className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors font-medium"
                >
                  {dict.nav.rsvp}
                </Link>
              </div>
              <LanguageSwitcher currentLang={lang} />
            </div>
          </div>
        </div>
      </nav>
      {children}
    </>
  )
}
