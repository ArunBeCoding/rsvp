"use client"

import type React from "react"
import { useState, useTransition } from "react"
import { Heart, Loader2 } from "lucide-react"
import { useParams } from "next/navigation"
import { submitRSVP, type RSVPFormData } from "./actions"
import { Arima } from 'next/font/google'
import { Lexend } from "next/font/google"


// Define the dictionary type
type Dictionary = {
  rsvp: {
    title: string
    subtitle: string
    cardTitle: string
    cardDescription: string
    firstName: string
    lastName: string
    email: string
    phone: string
    attendance: string
    attendanceYes: string
    attendanceNo: string
    guestCount: string
    guestCountOption: string
    guestCountOptions: string
    dietary: string
    dietaryPlaceholder: string
    song: string
    songPlaceholder: string
    accommodations: string
    message: string
    messagePlaceholder: string
    submit: string
    submitting: string
    thankYou: string
    thankYouMessage: string
    required: string
    error: string
  }
}

// Static dictionaries to avoid dynamic imports in client components
const dictionaries: Record<string, Dictionary> = {
  en: {
    rsvp: {
      title: "RSVP",
      subtitle: "Please respond by July 1st, 2025",
      cardTitle: "We Hope You Can Join Us!",
      cardDescription: "Please fill out the form below to let us know if you'll be attending our special day.",
      firstName: "First Name",
      lastName: "Last Name",
      email: "Email",
      phone: "Phone Number",
      attendance: "Will you be attending?",
      attendanceYes: "Yes, I'll be there!",
      attendanceNo: "Sorry, I can't make it",
      guestCount: "Number of Guests (including yourself)",
      guestCountOption: "Guest",
      guestCountOptions: "Guests",
      dietary: "Dietary Restrictions or Allergies",
      dietaryPlaceholder: "Please let us know about any dietary restrictions or food allergies...",
      song: "Song Request",
      songPlaceholder: "Any song you'd like to hear at the reception?",
      accommodations: "I need information about local accommodations",
      message: "Message for the Couple",
      messagePlaceholder: "Share your well wishes or any special message...",
      submit: "Submit RSVP",
      submitting: "Submitting...",
      thankYou: "Thank You!",
      thankYouMessage: "Your RSVP has been received. We can't wait to celebrate with you!",
      required: "*",
      error: "Error",
    },
  },
  ta: {
    rsvp: {
      title: "பதில் அளிக்கவும்",
      subtitle: "ஜூலை 1, 2025 க்குள் பதில் அளிக்கவும்",
      cardTitle: "நீங்கள் எங்களுடன் சேர முடியும் என்று நம்புகிறோம்!",
      cardDescription: "எங்கள் சிறப்பு நாளில் நீங்கள் கலந்து கொள்வீர்களா என்பதை எங்களுக்குத் தெரியப்படுத்த கீழே உள்ள படிவத்தை நிரப்பவும்.",
      firstName: "முதல் பெயர்",
      lastName: "கடைசி பெயர்",
      email: "மின்னஞ்சல்",
      phone: "தொலைபேசி எண்",
      attendance: "நீங்கள் கலந்து கொள்வீர்களா?",
      attendanceYes: "ஆம், நான் அங்கே இருப்பேன்!",
      attendanceNo: "மன்னிக்கவும், என்னால் வர முடியாது",
      guestCount: "விருந்தினர்களின் எண்ணிக்கை (உங்களையும் சேர்த்து)",
      guestCountOption: "விருந்தினர்",
      guestCountOptions: "விருந்தினர்கள்",
      dietary: "உணவு கட்டுப்பாடுகள் அல்லது ஒவ்வாமை",
      dietaryPlaceholder: "உணவு கட்டுப்பாடுகள் அல்லது உணவு ஒவ்வாமை பற்றி எங்களுக்குத் தெரியப்படுத்தவும்...",
      song: "பாடல் கோரிக்கை",
      songPlaceholder: "வரவேற்பு விழாவில் நீங்கள் கேட்க விரும்பும் பாடல் ஏதேனும் உள்ளதா?",
      accommodations: "எனக்கு உள்ளூர் தங்குமிடங்கள் பற்றிய தகவல் தேவை",
      message: "தம்பதியருக்கான செய்தி",
      messagePlaceholder: "உங்கள் நல்வாழ்த்துக்கள் அல்லது சிறப்பு செய்தியைப் பகிரவும்...",
      submit: "பதிலை சமர்பிக்கவும்",
      submitting: "சமர்பிக்கிறது...",
      thankYou: "நன்றி!",
      thankYouMessage: "உங்கள் பதில் பெறப்பட்டது. உங்களுடன் கொண்டாட காத்திருக்கிறோம்!",
      required: "*",
      error: "பிழை",
    },
  },
}

const arima = Arima({
  subsets: ['latin', 'tamil'],
  weight: ['200'],
  display: 'swap',
})


const inter = Lexend({
  subsets: ["latin"],
  weight: ['200'] 
})

export default function RSVPPage() {
  const params = useParams()
  const lang = (params.lang as string) || "en"
  const dict = dictionaries[lang] || dictionaries.en
  const fontClass = lang === 'ta' ? arima.className : inter.className

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    attendance: "",
    guestCount: "1",
    dietaryRestrictions: "",
    songRequest: "",
    accommodations: false,
    message: "",
  })

  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    const rsvpData: RSVPFormData = {
      ...formData,
      attendance: formData.attendance as "yes" | "no",
      language: lang,
    }

    startTransition(async () => {
      try {
        const result = await submitRSVP(rsvpData)
        if (result.success) {
          setSubmitted(true)
        } else {
          setError(result.message)
        }
      } catch (err) {
        setError(
          lang === "ta"
            ? "பதில் சமர்பிக்கும்போது பிழை ஏற்பட்டது. மீண்டும் முயற்சிக்கவும்."
            : "There was an error submitting your RSVP. Please try again.",
        )
      }
    })
  }

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  if (submitted) {
    return (
      <div className={`grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] text-[#830065]`}>
        <main className="flex flex-col gap-8 row-start-2 items-center text-center">
          <Heart className="h-16 w-16 text-red-500 fill-current" />
          <h1 className="text-2xl font-semibold">{dict.rsvp.thankYou}</h1>
          <p className="text-sm text-gray-600 max-w-md">{dict.rsvp.thankYouMessage}</p>
        </main>
      </div>
    )
  }

  return (
    <div className={`grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] text-[#830065] ${fontClass}`}>
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start w-full max-w-2xl">
        <div className="text-center sm:text-left">
          <h1 className="text-4xl font-bold mb-2">{dict.rsvp.title}</h1>
          <p className="text-sm text-gray-600">{dict.rsvp.subtitle}</p>
        </div>

        <div className="w-full">
          <h2 className="text-xl font-semibold mb-2">{dict.rsvp.cardTitle}</h2>
          <p className="text-sm text-gray-600 mb-6">{dict.rsvp.cardDescription}</p>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md">
              <p className="text-red-800 text-sm">
                <strong>{dict.rsvp.error}:</strong> {error}
              </p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  {dict.rsvp.firstName} <span className="text-red-500">{dict.rsvp.required}</span>
                </label>
                <input
                  type="text"
                  required
                  disabled={isPending}
                  value={formData.firstName}
                  onChange={(e) => handleInputChange("firstName", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  {dict.rsvp.lastName} <span className="text-red-500">{dict.rsvp.required}</span>
                </label>
                <input
                  type="text"
                  required
                  disabled={isPending}
                  value={formData.lastName}
                  onChange={(e) => handleInputChange("lastName", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  {dict.rsvp.email} <span className="text-red-500">{dict.rsvp.required}</span>
                </label>
                <input
                  type="email"
                  required
                  disabled={isPending}
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">{dict.rsvp.phone}</label>
                <input
                  type="tel"
                  disabled={isPending}
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-3">
                {dict.rsvp.attendance} <span className="text-red-500">{dict.rsvp.required}</span>
              </label>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="attendance"
                    value="yes"
                    checked={formData.attendance === "yes"}
                    onChange={(e) => handleInputChange("attendance", e.target.value)}
                    disabled={isPending}
                    required
                    className="mr-2"
                  />
                  <span className="text-sm">{dict.rsvp.attendanceYes}</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="attendance"
                    value="no"
                    checked={formData.attendance === "no"}
                    onChange={(e) => handleInputChange("attendance", e.target.value)}
                    disabled={isPending}
                    required
                    className="mr-2"
                  />
                  <span className="text-sm">{dict.rsvp.attendanceNo}</span>
                </label>
              </div>
            </div>

            {formData.attendance === "yes" && (
              <>
                <div>
                  <label className="block text-sm font-medium mb-1">{dict.rsvp.guestCount}</label>
                  <select
                    value={formData.guestCount}
                    onChange={(e) => handleInputChange("guestCount", e.target.value)}
                    disabled={isPending}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50"
                  >
                    <option value="1">1 {dict.rsvp.guestCountOption}</option>
                    <option value="2">2 {dict.rsvp.guestCountOptions}</option>
                    <option value="3">3 {dict.rsvp.guestCountOptions}</option>
                    <option value="4">4 {dict.rsvp.guestCountOptions}</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">{dict.rsvp.dietary}</label>
                  <textarea
                    placeholder={dict.rsvp.dietaryPlaceholder}
                    disabled={isPending}
                    value={formData.dietaryRestrictions}
                    onChange={(e) => handleInputChange("dietaryRestrictions", e.target.value)}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50"
                  />
                </div>

                {/* <div>
                  <label className="block text-sm font-medium mb-1">{dict.rsvp.song}</label>
                  <input
                    type="text"
                    placeholder={dict.rsvp.songPlaceholder}
                    disabled={isPending}
                    value={formData.songRequest}
                    onChange={(e) => handleInputChange("songRequest", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50"
                  />
                </div> */}

                {/* <div>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.accommodations}
                      disabled={isPending}
                      onChange={(e) => handleInputChange("accommodations", e.target.checked)}
                      className="mr-2"
                    />
                    <span className="text-sm">{dict.rsvp.accommodations}</span>
                  </label>
                </div> */}
              </>
            )}

            <div>
              <label className="block text-sm font-medium mb-1">{dict.rsvp.message}</label>
              <textarea
                placeholder={dict.rsvp.messagePlaceholder}
                disabled={isPending}
                value={formData.message}
                onChange={(e) => handleInputChange("message", e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50"
              />
            </div>

            <button
              type="submit"
              disabled={isPending}
              className="w-full rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#830065] hover:text-white font-medium text-sm h-12 px-5 disabled:opacity-50"
            >
              {isPending ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  {dict.rsvp.submitting}
                </>
              ) : (
                dict.rsvp.submit
              )}
            </button>
          </form>
        </div>
      </main>
    </div>
  )
}