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
    <div className={`min-h-screen ${fontClass} text-[#FFFFFF]`}>
      <main className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            {dict.details.title}
          </h1>
          <p className="text-xl text-[#FFFFFF]">{dict.details.subtitle}</p>
        </div>

        {/* Main Grid with Shared Borders */}
        <div className="w-[70%] mx-auto border-4 border-[#FFFFFF] grid grid-cols-1 md:grid-cols-2">
          
          {/* Ceremony & Reception */}
          <div className="p-8 border-b-2 border-[#FFFFFF] md:border-b-4 md:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <MapPin className="h-6 w-6 text-[#FFFFFF]" />
              <h2 className="text-3xl font-bold text-[#FFFFFF]">{dict.details.ceremony}</h2>
            </div>
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-semibold text-[#FFFFFF] mb-2">{dict.home.venueValue}</h3>
                <p className="text-[#FFFFFF] mb-4">{dict.details.venueAddress}</p>
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-[#FFFFFF]" />
                    <span className="font-semibold text-[#FFFFFF]">
                      {dict.details.ceremonyTime}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-[#FFFFFF]" />
                    <span className="font-semibold text-[#FFFFFF]">
                      {dict.details.receptionTime}
                    </span>
                  </div>
                </div>
              </div>
              <p className="text-[#FFFFFF]">{dict.details.venueDescription}</p>
            </div>
          </div>

          {/* Dress Code */}
          <div className="p-8 border-b-2 border-[#FFFFFF] md:border-r-4 md:border-b-4">
            <h2 className="text-3xl font-bold text-[#FFFFFF] mb-6">{dict.details.dressCode}</h2>
            <div className="space-y-4">
              <p className="text-[#FFFFFF] font-semibold text-lg">
                {dict.details.dressCodeType}
              </p>
              <p className="text-[#FFFFFF]">{dict.details.dressCodeDescription}</p>
            </div>
          </div>

          {/* Schedule */}
          <div className="p-8 border-b-2 border-[#FFFFFF] md:border-b-4">
            <div className="flex items-center gap-3 mb-6">
              <Clock className="h-6 w-6 text-[#FFFFFF]" />
              <h2 className="text-3xl font-bold text-[#FFFFFF]">{dict.details.schedule}</h2>
            </div>
            <div className="space-y-3">
              {/* <div className="flex justify-between items-center py-2 border-b-2 border-[#FFFFFF]">
                <span className="font-semibold text-[#FFFFFF]">Sept 3, 6:00PM</span>
                <span className="text-[#FFFFFF]">{dict.details.scheduleItems.arrival}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b-2 border-[#FFFFFF]">
                <span className="font-semibold text-[#FFFFFF]">Sept 3, 6:00PM</span>
                <span className="text-[#FFFFFF]">{dict.details.scheduleItems.ceremony}</span>
              </div> */}
              <div className="flex justify-between items-center py-2 border-b-2 border-[#FFFFFF]">
                <span className="font-semibold text-[#FFFFFF]">Sept 3, 6:00PM</span>
                <span className="text-[#FFFFFF]">{dict.details.scheduleItems.cocktail}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b-2 border-[#FFFFFF]">
                <span className="font-semibold text-[#FFFFFF]">Sept 3, 6:00PM</span>
                <span className="text-[#FFFFFF]">{dict.details.scheduleItems.reception}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b-2 border-[#FFFFFF]">
                <span className="font-semibold text-[#FFFFFF]">Sept 4, 10:00AM</span>
                <span className="text-[#FFFFFF]">{dict.details.scheduleItems.dancing}</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="font-semibold text-[#FFFFFF]">Sept 4, 6:00PM</span>
                <span className="text-[#FFFFFF]">{dict.details.scheduleItems.lastDance}</span>
              </div>
            </div>
          </div>

          {/* Parking */}
          <div className="p-8 border-b-2 border-[#FFFFFF] md:border-r-4 md:border-b-4">
            <div className="flex items-center gap-3 mb-6">
              <Car className="h-6 w-6 text-[#FFFFFF]" />
              <h2 className="text-3xl font-bold text-[#FFFFFF]">{dict.details.parking}</h2>
            </div>
            <p className="text-[#FFFFFF]">{dict.details.parkingDescription}</p>
          </div>

          {/* Accommodations */}
          <div className="p-8 border-b-2 border-[#FFFFFF] md:border-b-4">
            <div className="flex items-center gap-3 mb-6">
              <Bed className="h-6 w-6 text-[#FFFFFF]" />
              <h2 className="text-3xl font-bold text-[#FFFFFF]">{dict.details.accommodations}</h2>
            </div>
            <p className="text-[#FFFFFF]">{dict.details.accommodationsDescription}</p>
          </div>

          {/* Dinner */}
          <div className="p-8 border-b-2 border-[#FFFFFF] md:border-r-4 md:border-b-4">
            <div className="flex items-center gap-3 mb-6">
              <Utensils className="h-6 w-6 text-[#FFFFFF]" />
              <h2 className="text-3xl font-bold text-[#FFFFFF]">{dict.details.dinner}</h2>
            </div>
            <p className="text-[#FFFFFF]">{dict.details.dinnerDescription}</p>
          </div>

          {/* Photography */}
          <div className="p-8 border-b-2 border-[#FFFFFF] md:border-b-4">
            <div className="flex items-center gap-3 mb-6">
              <Camera className="h-6 w-6 text-[#FFFFFF]" />
              <h2 className="text-3xl font-bold text-[#FFFFFF]">{dict.details.photography}</h2>
            </div>
            <p className="text-[#FFFFFF]">{dict.details.photographyDescription}</p>
          </div>

          {/* Contact Questions */}
          <div className="p-8 md:col-span-2">
            <h2 className="text-3xl font-bold text-[#FFFFFF] mb-6 text-center">
              {dict.details.questions}
            </h2>
            <p className="text-[#FFFFFF] text-center">{dict.details.questionsDescription}</p>
          </div>

        </div>
      </main>
    </div>
  )
}