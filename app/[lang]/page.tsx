// import { Button } from "@/components/ui/button"
// import { Calendar, MapPin, Clock } from "lucide-react"
// import Link from "next/link"
// import { getDictionary } from "./dictionaries"

// export default async function HomePage({
//   params,
// }: {
//   params: Promise<{ lang: "en" | "ta" }>
// }) {
//   const { lang } = await params
//   const dict = await getDictionary(lang)

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
//       <main className="container mx-auto px-4 py-16">
//         <div className="text-center space-y-8">
//           <div className="space-y-4">
//             <h1 className="text-5xl md:text-7xl font-bold text-gray-900">{dict.home.title}</h1>
//             <p className="text-xl md:text-2xl text-gray-600 font-light">{dict.home.subtitle}</p>
//           </div>

//           <div className="max-w-2xl mx-auto space-y-6">
//             <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6 shadow-lg">
//               <div className="grid md:grid-cols-3 gap-4 text-center">
//                 <div className="flex flex-col items-center space-y-2">
//                   <Calendar className="h-8 w-8 text-indigo-600" />
//                   <div>
//                     <p className="font-semibold text-gray-900">{dict.home.date}</p>
//                     <p className="text-gray-600">{dict.home.dateValue}</p>
//                   </div>
//                 </div>
//                 <div className="flex flex-col items-center space-y-2">
//                   <Clock className="h-8 w-8 text-indigo-600" />
//                   <div>
//                     <p className="font-semibold text-gray-900">{dict.home.time}</p>
//                     <p className="text-gray-600">{dict.home.timeValue}</p>
//                   </div>
//                 </div>
//                 <div className="flex flex-col items-center space-y-2">
//                   <MapPin className="h-8 w-8 text-indigo-600" />
//                   <div>
//                     <p className="font-semibold text-gray-900">{dict.home.venue}</p>
//                     <p className="text-gray-600">{dict.home.venueValue}</p>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             <div className="space-y-4">
//               <p className="text-lg text-gray-700 leading-relaxed">{dict.home.description}</p>

//               <div className="flex flex-col sm:flex-row gap-4 justify-center">
//                 <Button asChild size="lg" className="bg-indigo-600 hover:bg-indigo-700">
//                   <Link href={`/${lang}/rsvp`}>{dict.home.rsvpButton}</Link>
//                 </Button>
//                 <Button asChild variant="outline" size="lg">
//                   <Link href={`/${lang}/details`}>{dict.home.detailsButton}</Link>
//                 </Button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </main>
//     </div>
//   )
// }


// CLAUDE AI CODE

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { getDictionary } from "./dictionaries"
import { Great_Vibes } from 'next/font/google'

const elegantFont = Great_Vibes({subsets: ['latin'],weight: '400'})

export default async function HomePage({
  params,
}: {
  params: Promise<{ lang: "en" | "ta" }>
}) {
  const { lang } = await params
  const dict = await getDictionary(lang)

  return (
    <div className="min-h-screen bg-white">
      <main className="container mx-auto px-4">
        {/* Header Section */}
        {/* <div className="text-center mb-12">
          <h1 className="text-6xl md:text-8xl font-bold text-purple-800 mb-4">
            {dict.home.title}
          </h1>
          <p className="text-xl text-purple-700">June 15, 2024</p>
        </div> */}

        {/* Main Grid with Shared Borders */}
        <div className="w-[70%] mx-auto border-purple-800 grid grid-cols-1 md:grid-cols-2">
          {/* Large Initials Container */}
          <div className="p-12 flex items-center justify-center bg-white border-r-2 border-b-2 border-purple-800 md:border-r-4 md:border-b-4">
            <div className="text-center">
              <div className={`text-8xl md:text-9xl mr-40 font-bold text-purple-800 leading-none ${elegantFont.className}`}>
                M
              </div>
              <div className={`text-6xl md:text-7xl font-bold text-purple-800 leading-none ${elegantFont.className}`}>
                &
              </div>
              <div className={`text-8xl md:text-9xl ml-40 font-bold text-purple-800 leading-none ${elegantFont.className}`}>
                A
              </div>
            </div>
          </div>

          {/* Photo Placeholder Container */}
          <div className="p-8 bg-white border-b-2 border-purple-800 md:border-b-4">
            <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
              <span className="text-purple-800 text-lg font-medium">
                {dict.home.photoPlaceholder || "Wedding Photo"}
              </span>
            </div>
          </div>

          {/* Call to Action Container */}
          <div className="p-8 bg-white text-center border-r-2 border-b-2 border-purple-800 md:border-r-4 md:border-b-4">
            <h2 className="text-3xl md:text-4xl font-bold text-purple-800 mb-6 leading-tight">
              YOU WON'T WANT TO MISS THIS!
            </h2>
            <Button 
              asChild 
              className="hover:bg-purple-800 hover:text-white rounded-none text-purple-800 border-2 ext-purple-800 px-8 py-3 text-lg font-medium border-purple-800"
              style={{
                boxShadow: '4px 4px 0px rgba(0, 0, 0, 1)'
              }}
            >
              <Link href={`/${lang}/details`}>
                SCHEDULE
              </Link>
            </Button>
          </div>

          {/* Countdown Container */}
          <div className="p-8 bg-white text-center border-b-2 border-purple-800 md:border-b-4">
            <div className="flex justify-center space-x-8 mb-6">
              <div className="text-center">
                <div className="text-4xl font-bold text-purple-800">0</div>
                <div className="text-sm text-purple-700 font-medium">DAYS</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-purple-800">0</div>
                <div className="text-sm text-purple-700 font-medium">HOURS</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-purple-800">0</div>
                <div className="text-sm text-purple-700 font-medium">MINUTES</div>
              </div>
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-purple-800">
              Until the big day!
            </h3>
          </div>

          {/* RSVP Container */}
          <div className="p-8 bg-white text-center border-b-2 border-purple-800 md:border-b-4 md:col-span-2">
            <h2 className="text-4xl md:text-5xl font-bold text-purple-800 mb-6">
              ARE YOU COMING?
            </h2>
            <Button 
              asChild 
              className="hover:bg-purple-800 hover:text-white rounded-none text-purple-800 px-12 py-4 text-xl font-medium border-2 border-purple-800"
              style={{
                boxShadow: '4px 4px 0px rgba(0, 0, 0, 1)'
              }}
            >
              <Link href={`/${lang}/rsvp`}>
                RSVP
              </Link>
            </Button>
          </div>

          {/* Wedding Party Container
          <div className="p-8 bg-white text-center md:col-span-2">
            <h2 className="text-4xl md:text-5xl font-bold text-purple-800">
              OUR WEDDING PARTY
            </h2>
          </div> */}

        </div>
      </main>
    </div>
  )
}