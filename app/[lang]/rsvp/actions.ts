"use server"

import { neon } from "@neondatabase/serverless"
import { revalidatePath } from "next/cache"

const sql = neon(process.env.DATABASE_URL!)

export interface RSVPFormData {
  firstName: string
  lastName: string
  email: string
  phone: string
  attendance: "yes" | "no"
  guestCount: string
  dietaryRestrictions: string
  songRequest: string
  accommodations: boolean
  message: string
  language: string
}

export async function submitRSVP(formData: RSVPFormData) {
  try {
    // Check if RSVP already exists for this email
    const existingRSVP = await sql`
      SELECT id FROM rsvps WHERE email = ${formData.email}
    `

    if (existingRSVP.length > 0) {
      // Update existing RSVP
      await sql`
        UPDATE rsvps SET
          first_name = ${formData.firstName},
          last_name = ${formData.lastName},
          phone = ${formData.phone},
          attendance = ${formData.attendance},
          guest_count = ${formData.attendance === "yes" ? Number.parseInt(formData.guestCount) : 0},
          dietary_restrictions = ${formData.dietaryRestrictions},
          song_request = ${formData.songRequest},
          accommodations_needed = ${formData.accommodations},
          message = ${formData.message},
          language = ${formData.language},
          updated_at = CURRENT_TIMESTAMP
        WHERE email = ${formData.email}
      `
    } else {
      // Insert new RSVP
      await sql`
        INSERT INTO rsvps (
          first_name, last_name, email, phone, attendance, guest_count,
          dietary_restrictions, song_request, accommodations_needed, message, language
        ) VALUES (
          ${formData.firstName}, ${formData.lastName}, ${formData.email}, ${formData.phone},
          ${formData.attendance}, ${formData.attendance === "yes" ? Number.parseInt(formData.guestCount) : 0},
          ${formData.dietaryRestrictions}, ${formData.songRequest}, ${formData.accommodations},
          ${formData.message}, ${formData.language}
        )
      `
    }

    revalidatePath(`/${formData.language}/rsvp`)

    return {
      success: true,
      message:
        formData.language === "ta"
          ? "உங்கள் பதில் வெற்றிகரமாக சமர்பிக்கப்பட்டது!"
          : "Your RSVP has been submitted successfully!",
    }
  } catch (error) {
    console.error("Error submitting RSVP:", error)
    return {
      success: false,
      message:
        formData.language === "ta"
          ? "பதில் சமர்பிக்கும்போது பிழை ஏற்பட்டது. மீண்டும் முயற்சிக்கவும்."
          : "There was an error submitting your RSVP. Please try again.",
    }
  }
}

export async function getRSVPByEmail(email: string) {
  try {
    const result = await sql`
      SELECT * FROM rsvps WHERE email = ${email}
    `
    return result[0] || null
  } catch (error) {
    console.error("Error fetching RSVP:", error)
    return null
  }
}
