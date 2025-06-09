import { MapPin, Clock, Camera, Utensils, Car, Bed } from "lucide-react"
import { getDictionary } from "../dictionaries"
import { arima } from '@/app/layout'
import { inter } from "@/app/layout"

export default async function DetailsPage({
  params,
}: {
  params: Promise<{ lang: "en" | "ta" }>
}) {
  const { lang } = await params
  const dict = await getDictionary(lang)
  const fontClass = lang === 'ta' ? arima.className : inter.className

  return (
    <div className={`min-h-screen bg-white ${fontClass} text-[#830065]`}>
      <main className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            {dict.details.title}
          </h1>
          <p className="text-xl text-[#830065]">{dict.details.subtitle}</p>
        </div>

        {/* Main Grid with Shared Borders */}
        <div className="w-[70%] mx-auto border-4 border-[#830065] grid grid-cols-1 md:grid-cols-2">
          
          {/* Ceremony & Reception */}
          <div className="p-8 bg-white border-b-2 border-[#830065] md:border-b-4 md:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <MapPin className="h-6 w-6 text-[#830065]" />
              <h2 className="text-3xl font-bold text-[#830065]">{dict.details.ceremony}</h2>
            </div>
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-semibold text-[#830065] mb-2">{dict.home.venueValue}</h3>
                <p className="text-[#830065] mb-4">{dict.details.venueAddress}</p>
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-[#830065]" />
                    <span className="font-semibold text-[#830065]">
                      {dict.details.ceremonyTime}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-[#830065]" />
                    <span className="font-semibold text-[#830065]">
                      {dict.details.receptionTime}
                    </span>
                  </div>
                </div>
              </div>
              <p className="text-[#830065]">{dict.details.venueDescription}</p>
            </div>
          </div>

          {/* Dress Code */}
          <div className="p-8 bg-white border-r-2 border-b-2 border-[#830065] md:border-r-4 md:border-b-4">
            <h2 className="text-3xl font-bold text-[#830065] mb-6">{dict.details.dressCode}</h2>
            <div className="space-y-4">
              <p className="text-[#830065] font-semibold text-lg">
                {dict.details.dressCodeType}
              </p>
              <p className="text-[#830065]">{dict.details.dressCodeDescription}</p>
            </div>
          </div>

          {/* Schedule */}
          <div className="p-8 bg-white border-b-2 border-[#830065] md:border-b-4">
            <div className="flex items-center gap-3 mb-6">
              <Clock className="h-6 w-6 text-[#830065]" />
              <h2 className="text-3xl font-bold text-[#830065]">{dict.details.schedule}</h2>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center py-2 border-b-2 border-[#830065]">
                <span className="font-semibold text-[#830065]">3:30 PM</span>
                <span className="text-[#830065]">{dict.details.scheduleItems.arrival}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b-2 border-[#830065]">
                <span className="font-semibold text-[#830065]">4:00 PM</span>
                <span className="text-[#830065]">{dict.details.scheduleItems.ceremony}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b-2 border-[#830065]">
                <span className="font-semibold text-[#830065]">4:30 PM</span>
                <span className="text-[#830065]">{dict.details.scheduleItems.cocktail}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b-2 border-[#830065]">
                <span className="font-semibold text-[#830065]">6:00 PM</span>
                <span className="text-[#830065]">{dict.details.scheduleItems.reception}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b-2 border-[#830065]">
                <span className="font-semibold text-[#830065]">8:00 PM</span>
                <span className="text-[#830065]">{dict.details.scheduleItems.dancing}</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="font-semibold text-[#830065]">11:00 PM</span>
                <span className="text-[#830065]">{dict.details.scheduleItems.lastDance}</span>
              </div>
            </div>
          </div>

          {/* Parking */}
          <div className="p-8 bg-white border-r-2 border-b-2 border-[#830065] md:border-r-4 md:border-b-4">
            <div className="flex items-center gap-3 mb-6">
              <Car className="h-6 w-6 text-[#830065]" />
              <h2 className="text-3xl font-bold text-[#830065]">{dict.details.parking}</h2>
            </div>
            <p className="text-[#830065]">{dict.details.parkingDescription}</p>
          </div>

          {/* Accommodations */}
          <div className="p-8 bg-white border-b-2 border-[#830065] md:border-b-4">
            <div className="flex items-center gap-3 mb-6">
              <Bed className="h-6 w-6 text-[#830065]" />
              <h2 className="text-3xl font-bold text-[#830065]">{dict.details.accommodations}</h2>
            </div>
            <p className="text-[#830065]">{dict.details.accommodationsDescription}</p>
          </div>

          {/* Dinner */}
          <div className="p-8 bg-white border-r-2 border-b-2 border-[#830065] md:border-r-4 md:border-b-4">
            <div className="flex items-center gap-3 mb-6">
              <Utensils className="h-6 w-6 text-[#830065]" />
              <h2 className="text-3xl font-bold text-[#830065]">{dict.details.dinner}</h2>
            </div>
            <p className="text-[#830065]">{dict.details.dinnerDescription}</p>
          </div>

          {/* Photography */}
          <div className="p-8 bg-white border-b-2 border-[#830065] md:border-b-4">
            <div className="flex items-center gap-3 mb-6">
              <Camera className="h-6 w-6 text-[#830065]" />
              <h2 className="text-3xl font-bold text-[#830065]">{dict.details.photography}</h2>
            </div>
            <p className="text-[#830065]">{dict.details.photographyDescription}</p>
          </div>

          {/* Contact Questions */}
          <div className="p-8 bg-white md:col-span-2">
            <h2 className="text-3xl font-bold text-[#830065] mb-6 text-center">
              {dict.details.questions}
            </h2>
            <p className="text-[#830065] text-center">{dict.details.questionsDescription}</p>
          </div>

        </div>
      </main>
    </div>
  )
}