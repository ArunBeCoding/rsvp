import { Button } from "@/components/ui/button"
import Link from "next/link"
import { getDictionary } from "./dictionaries"
import { Great_Vibes } from 'next/font/google'
import CountdownTimer from "@/components/countdown"
import { arima } from '@/app/layout'
import { inter } from "@/app/layout"
import Image from "next/image";

const elegantFont = Great_Vibes({subsets: ['latin'],weight: '400'})

export default async function HomePage({
  params,
}: {
  params: Promise<{ lang: "en" | "ta" }>
}) {
  const { lang } = await params
  const dict = await getDictionary(lang)
  const fontClass = lang === 'ta' ? arima.className : inter.className

  return (
    <div className={`min-h-screen ${fontClass}`}>
      <main className="container mx-auto px-4 pb-16">
        {/* Main Grid with Shared Borders */}
        <div className="w-[70%] mx-auto border-[#FFFFFF] grid grid-cols-1 md:grid-cols-2">
          {/* Large Initials Container */}
          <div className="p-8 flex items-center justify-center md:border-r-8 border-b-8 border-[#FFFFFF] md:border-b-8">
            <div className=" border-8 border-[#FFFFFF]">
              {/* <div className="text-center">
                <div className={`text-4xl md:text-7xl mr-40 font-bold text-[#FFFFFF] leading-none ${elegantFont.className}`}>
                  M
                </div>
                <div className={`text-4xl md:text-7xl font-bold text-[#FFFFFF] leading-none ${elegantFont.className}`}>
                  &
                </div>
                <div className={`text-4xl md:text-7xl ml-40 font-bold text-[#FFFFFF] leading-none ${elegantFont.className}`}>
                  A
                </div>
              </div> */}
              <Image
                src="/logo-1.png"
                alt={dict.home.photoPlaceholder || "Wedding Photo"}
                width={500}
                height={500}
                priority
              />
            </div>
          </div>

          {/* Photo Placeholder Container */}
          <div className="border-b-8 border-[#FFFFFF] md:border-b-8">
            <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
              {/* <span className="text-[#FFFFFF] text-lg font-medium">
                {dict.home.photoPlaceholder || "Wedding Photo"}
              </span> */}
              <Image
                src="/wedding_photo.jpeg"
                alt={dict.home.photoPlaceholder || "Wedding Photo"}
                width={500}
                height={500}
                priority
              />
            </div>
          </div>

          {/* Call to Action Container */}
          <div className="p-8 text-center border-b-8 border-[#FFFFFF] md:border-r-8 md:border-b-8">
            <h2 className="text-3xl md:text-4xl font-bold text-[#FFFFFF] mb-6 leading-tight">
              {dict.home.missthis}
            </h2>
            <Button 
              asChild 
              className="hover:bg-[#FFFFFF] hover:text-[#C19894] rounded-none text-[#FFFFFF] border-2 ext-[#FFFFFF] px-8 py-3 text-lg font-medium border-[#FFFFFF]"
              style={{
                boxShadow: '4px 4px 0px rgba(0, 0, 0, 1)'
              }}
            >
              <Link href={`/${lang}/details`}>
                {dict.nav.details}
              </Link>
            </Button>
          </div>

          {/* Countdown Container */}
          <div className="p-8 text-center border-b-8 border-[#FFFFFF] md:border-b-8">
            <CountdownTimer targetDate="2025-09-03T22:00:00" dict={dict}/>
          </div>

          {/* RSVP Container */}
          <div className="p-8 text-center border-b-8 border-[#FFFFFF] md:border-b-8 md:col-span-2">
            <h2 className="text-3xl md:text-5xl font-bold text-[#FFFFFF] mb-6">
              {dict.home.areYouComing}
            </h2>
            <Button 
              asChild 
              className="hover:bg-[#FFFFFF] hover:text-[#C19894] rounded-none text-[#FFFFFF] px-12 py-4 text-xl font-medium border-2 border-[#FFFFFF]"
              style={{
                boxShadow: '4px 4px 0px rgba(0, 0, 0, 1)'
              }}
            >
              <Link href={`/${lang}/rsvp`}>
                {dict.nav.rsvp}
              </Link>
            </Button>
          </div>

        </div>
      </main>
    </div>
  )
}