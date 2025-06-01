"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Heart } from "lucide-react"
import { useParams } from "next/navigation"

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
    thankYou: string
    thankYouMessage: string
    required: string
  }
}

// Static dictionaries to avoid dynamic imports in client components
const dictionaries: Record<string, Dictionary> = {
  en: {
    rsvp: {
      title: "RSVP",
      subtitle: "Please respond by May 1st, 2024",
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
      thankYou: "Thank You!",
      thankYouMessage: "Your RSVP has been received. We can't wait to celebrate with you!",
      required: "*",
    },
  },
  ta: {
    rsvp: {
      title: "பதில் அளிக்கவும்",
      subtitle: "மே 1, 2024 க்குள் பதில் அளிக்கவும்",
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
      thankYou: "நன்றி!",
      thankYouMessage: "உங்கள் பதில் பெறப்பட்டது. உங்களுடன் கொண்டாட காத்திருக்கிறோம்!",
      required: "*",
    },
  },
}

export default function RSVPPage() {
  const params = useParams()
  const lang = (params.lang as string) || "en"
  const dict = dictionaries[lang] || dictionaries.en

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("RSVP Data:", formData)
    setSubmitted(true)
  }

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <Card className="w-full max-w-md text-center">
          <CardHeader>
            <div className="mx-auto mb-4">
              <Heart className="h-16 w-16 text-red-500 fill-current" />
            </div>
            <CardTitle className="text-2xl">{dict.rsvp.thankYou}</CardTitle>
            <CardDescription>{dict.rsvp.thankYouMessage}</CardDescription>
          </CardHeader>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">{dict.rsvp.title}</h1>
            <p className="text-gray-600">{dict.rsvp.subtitle}</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>{dict.rsvp.cardTitle}</CardTitle>
              <CardDescription>{dict.rsvp.cardDescription}</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">
                      {dict.rsvp.firstName} {dict.rsvp.required}
                    </Label>
                    <Input
                      id="firstName"
                      required
                      value={formData.firstName}
                      onChange={(e) => handleInputChange("firstName", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">
                      {dict.rsvp.lastName} {dict.rsvp.required}
                    </Label>
                    <Input
                      id="lastName"
                      required
                      value={formData.lastName}
                      onChange={(e) => handleInputChange("lastName", e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">
                      {dict.rsvp.email} {dict.rsvp.required}
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">{dict.rsvp.phone}</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <Label>
                    {dict.rsvp.attendance} {dict.rsvp.required}
                  </Label>
                  <RadioGroup
                    value={formData.attendance}
                    onValueChange={(value) => handleInputChange("attendance", value)}
                    required
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yes" id="yes" />
                      <Label htmlFor="yes">{dict.rsvp.attendanceYes}</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="no" />
                      <Label htmlFor="no">{dict.rsvp.attendanceNo}</Label>
                    </div>
                  </RadioGroup>
                </div>

                {formData.attendance === "yes" && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="guestCount">{dict.rsvp.guestCount}</Label>
                      <Select
                        value={formData.guestCount}
                        onValueChange={(value) => handleInputChange("guestCount", value)}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">1 {dict.rsvp.guestCountOption}</SelectItem>
                          <SelectItem value="2">2 {dict.rsvp.guestCountOptions}</SelectItem>
                          <SelectItem value="3">3 {dict.rsvp.guestCountOptions}</SelectItem>
                          <SelectItem value="4">4 {dict.rsvp.guestCountOptions}</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="dietary">{dict.rsvp.dietary}</Label>
                      <Textarea
                        id="dietary"
                        placeholder={dict.rsvp.dietaryPlaceholder}
                        value={formData.dietaryRestrictions}
                        onChange={(e) => handleInputChange("dietaryRestrictions", e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="song">{dict.rsvp.song}</Label>
                      <Input
                        id="song"
                        placeholder={dict.rsvp.songPlaceholder}
                        value={formData.songRequest}
                        onChange={(e) => handleInputChange("songRequest", e.target.value)}
                      />
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="accommodations"
                        checked={formData.accommodations}
                        onCheckedChange={(checked) => handleInputChange("accommodations", checked as boolean)}
                      />
                      <Label htmlFor="accommodations">{dict.rsvp.accommodations}</Label>
                    </div>
                  </>
                )}

                <div className="space-y-2">
                  <Label htmlFor="message">{dict.rsvp.message}</Label>
                  <Textarea
                    id="message"
                    placeholder={dict.rsvp.messagePlaceholder}
                    value={formData.message}
                    onChange={(e) => handleInputChange("message", e.target.value)}
                  />
                </div>

                <Button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700">
                  {dict.rsvp.submit}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
