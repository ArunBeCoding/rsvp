import { Button } from "@/components/ui/button"
import { Calendar, MapPin, Clock } from "lucide-react"
import Link from "next/link"
import { getDictionary } from "./dictionaries"

export default async function HomePage({
  params,
}: {
  params: Promise<{ lang: "en" | "ta" }>
}) {
  const { lang } = await params
  const dict = await getDictionary(lang)

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <main className="container mx-auto px-4 py-16">
        <div className="text-center space-y-8">
          <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900">{dict.home.title}</h1>
            <p className="text-xl md:text-2xl text-gray-600 font-light">{dict.home.subtitle}</p>
          </div>

          <div className="max-w-2xl mx-auto space-y-6">
            <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6 shadow-lg">
              <div className="grid md:grid-cols-3 gap-4 text-center">
                <div className="flex flex-col items-center space-y-2">
                  <Calendar className="h-8 w-8 text-indigo-600" />
                  <div>
                    <p className="font-semibold text-gray-900">{dict.home.date}</p>
                    <p className="text-gray-600">{dict.home.dateValue}</p>
                  </div>
                </div>
                <div className="flex flex-col items-center space-y-2">
                  <Clock className="h-8 w-8 text-indigo-600" />
                  <div>
                    <p className="font-semibold text-gray-900">{dict.home.time}</p>
                    <p className="text-gray-600">{dict.home.timeValue}</p>
                  </div>
                </div>
                <div className="flex flex-col items-center space-y-2">
                  <MapPin className="h-8 w-8 text-indigo-600" />
                  <div>
                    <p className="font-semibold text-gray-900">{dict.home.venue}</p>
                    <p className="text-gray-600">{dict.home.venueValue}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <p className="text-lg text-gray-700 leading-relaxed">{dict.home.description}</p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="bg-indigo-600 hover:bg-indigo-700">
                  <Link href={`/${lang}/rsvp`}>{dict.home.rsvpButton}</Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href={`/${lang}/details`}>{dict.home.detailsButton}</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
