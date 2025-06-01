import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { neon } from "@neondatabase/serverless"
import { Users, UserCheck, UserX, Calendar } from "lucide-react"

const sql = neon(process.env.DATABASE_URL!)

async function getRSVPStats() {
  try {
    const [totalRSVPs] = await sql`
      SELECT COUNT(*) as total FROM rsvps
    `

    const [attendingRSVPs] = await sql`
      SELECT COUNT(*) as attending FROM rsvps WHERE attendance = 'yes'
    `

    const [notAttendingRSVPs] = await sql`
      SELECT COUNT(*) as not_attending FROM rsvps WHERE attendance = 'no'
    `

    const [totalGuests] = await sql`
      SELECT SUM(guest_count) as total_guests FROM rsvps WHERE attendance = 'yes'
    `

    return {
      total: Number.parseInt(totalRSVPs.total) || 0,
      attending: Number.parseInt(attendingRSVPs.attending) || 0,
      notAttending: Number.parseInt(notAttendingRSVPs.not_attending) || 0,
      totalGuests: Number.parseInt(totalGuests.total_guests) || 0,
    }
  } catch (error) {
    console.error("Error fetching RSVP stats:", error)
    return { total: 0, attending: 0, notAttending: 0, totalGuests: 0 }
  }
}

async function getAllRSVPs() {
  try {
    const rsvps = await sql`
      SELECT 
        id, first_name, last_name, email, phone, attendance, guest_count,
        dietary_restrictions, song_request, accommodations_needed, message,
        language, created_at
      FROM rsvps 
      ORDER BY created_at DESC
    `
    return rsvps
  } catch (error) {
    console.error("Error fetching RSVPs:", error)
    return []
  }
}

export default async function AdminPage({
  params,
}: {
  params: { lang: "en" | "ta" }
}) {
  const { lang } = params
  const stats = await getRSVPStats()
  const rsvps = await getAllRSVPs()

  const isEnglish = lang === "en"

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">{isEnglish ? "RSVP Dashboard" : "RSVP டாஷ்போர்டு"}</h1>
            <p className="text-lg text-gray-600">{isEnglish ? "Wedding RSVP Management" : "திருமண RSVP மேலாண்மை"}</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{isEnglish ? "Total RSVPs" : "மொத்த பதில்கள்"}</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.total}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{isEnglish ? "Attending" : "கலந்துகொள்பவர்கள்"}</CardTitle>
                <UserCheck className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">{stats.attending}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{isEnglish ? "Not Attending" : "கலந்துகொள்ளாதவர்கள்"}</CardTitle>
                <UserX className="h-4 w-4 text-red-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-600">{stats.notAttending}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{isEnglish ? "Total Guests" : "மொத்த விருந்தினர்கள்"}</CardTitle>
                <Calendar className="h-4 w-4 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">{stats.totalGuests}</div>
              </CardContent>
            </Card>
          </div>

          {/* RSVP List */}
          <Card>
            <CardHeader>
              <CardTitle>{isEnglish ? "All RSVPs" : "அனைத்து பதில்கள்"}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {rsvps.length === 0 ? (
                  <p className="text-center text-gray-500 py-8">{isEnglish ? "No RSVPs yet" : "இன்னும் பதில்கள் இல்லை"}</p>
                ) : (
                  rsvps.map((rsvp: any) => (
                    <div key={rsvp.id} className="border rounded-lg p-4 space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <h3 className="font-semibold">
                            {rsvp.first_name} {rsvp.last_name}
                          </h3>
                          <Badge variant={rsvp.attendance === "yes" ? "default" : "secondary"}>
                            {rsvp.attendance === "yes"
                              ? isEnglish
                                ? "Attending"
                                : "கலந்துகொள்வார்"
                              : isEnglish
                                ? "Not Attending"
                                : "கலந்துகொள்ளமாட்டார்"}
                          </Badge>
                          {rsvp.language && (
                            <Badge variant="outline">{rsvp.language === "en" ? "English" : "தமிழ்"}</Badge>
                          )}
                        </div>
                        <div className="text-sm text-gray-500">{new Date(rsvp.created_at).toLocaleDateString()}</div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <strong>{isEnglish ? "Email:" : "மின்னஞ்சல்:"}</strong> {rsvp.email}
                        </div>
                        {rsvp.phone && (
                          <div>
                            <strong>{isEnglish ? "Phone:" : "தொலைபேசி:"}</strong> {rsvp.phone}
                          </div>
                        )}
                        {rsvp.attendance === "yes" && (
                          <div>
                            <strong>{isEnglish ? "Guests:" : "விருந்தினர்கள்:"}</strong> {rsvp.guest_count}
                          </div>
                        )}
                        {rsvp.dietary_restrictions && (
                          <div>
                            <strong>{isEnglish ? "Dietary:" : "உணவு:"}</strong> {rsvp.dietary_restrictions}
                          </div>
                        )}
                        {rsvp.song_request && (
                          <div>
                            <strong>{isEnglish ? "Song:" : "பாடல்:"}</strong> {rsvp.song_request}
                          </div>
                        )}
                        {rsvp.accommodations_needed && (
                          <div>
                            <Badge variant="outline">{isEnglish ? "Needs Accommodations" : "தங்குமிடம் தேவை"}</Badge>
                          </div>
                        )}
                      </div>

                      {rsvp.message && (
                        <div className="mt-2 p-2 bg-gray-50 rounded">
                          <strong>{isEnglish ? "Message:" : "செய்தி:"}</strong>
                          <p className="mt-1">{rsvp.message}</p>
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
