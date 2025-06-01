import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, Clock, Camera, Utensils, Car, Bed } from "lucide-react"
import { getDictionary } from "../dictionaries"

export default async function DetailsPage({
  params,
}: {
  params: Promise<{ lang: "en" | "ta" }>
}) {
  const { lang } = await params
  const dict = await getDictionary(lang)

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">{dict.details.title}</h1>
            <p className="text-lg text-gray-600">{dict.details.subtitle}</p>
          </div>

          <div className="grid gap-8">
            {/* Ceremony & Reception */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  {dict.details.ceremony}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold text-lg mb-2">{dict.home.venueValue}</h3>
                  <p className="text-gray-600 mb-2">{dict.details.venueAddress}</p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-indigo-600" />
                      <span>
                        <strong>{dict.details.ceremonyTime}</strong>
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-indigo-600" />
                      <span>
                        <strong>{dict.details.receptionTime}</strong>
                      </span>
                    </div>
                  </div>
                </div>
                <p className="text-gray-700">{dict.details.venueDescription}</p>
              </CardContent>
            </Card>

            {/* Dress Code */}
            <Card>
              <CardHeader>
                <CardTitle>{dict.details.dressCode}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4">
                  <strong>{dict.details.dressCodeType}</strong>
                </p>
                <p className="text-gray-600">{dict.details.dressCodeDescription}</p>
              </CardContent>
            </Card>

            {/* Schedule */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  {dict.details.schedule}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="font-medium">3:30 PM</span>
                    <span>{dict.details.scheduleItems.arrival}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="font-medium">4:00 PM</span>
                    <span>{dict.details.scheduleItems.ceremony}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="font-medium">4:30 PM</span>
                    <span>{dict.details.scheduleItems.cocktail}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="font-medium">6:00 PM</span>
                    <span>{dict.details.scheduleItems.reception}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="font-medium">8:00 PM</span>
                    <span>{dict.details.scheduleItems.dancing}</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="font-medium">11:00 PM</span>
                    <span>{dict.details.scheduleItems.lastDance}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Additional Information */}
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Car className="h-5 w-5" />
                    {dict.details.parking}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">{dict.details.parkingDescription}</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bed className="h-5 w-5" />
                    {dict.details.accommodations}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">{dict.details.accommodationsDescription}</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Utensils className="h-5 w-5" />
                    {dict.details.dinner}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">{dict.details.dinnerDescription}</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Camera className="h-5 w-5" />
                    {dict.details.photography}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">{dict.details.photographyDescription}</p>
                </CardContent>
              </Card>
            </div>

            {/* Contact */}
            <Card>
              <CardHeader>
                <CardTitle>{dict.details.questions}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">{dict.details.questionsDescription}</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
