"use server"

import { neon } from "@neondatabase/serverless"
import { revalidatePath } from "next/cache"

const sql = neon(process.env.DATABASE_URL!)

export interface RomRSVPFormData {
  firstName: string
  lastName: string
  email: string
  attendance: "yes" | "no"
  dietaryRestrictions: string
  language: string
}

export async function submitRSVP(formData: RomRSVPFormData) {
  try {
    // Check if RSVP already exists for this email
    const existingRSVP = await sql`
      SELECT id FROM rom_rsvps WHERE email = ${formData.email}
    `

    if (existingRSVP.length > 0) {
      // Update existing RSVP
      await sql`
        UPDATE rom_rsvps SET
          first_name = ${formData.firstName},
          last_name = ${formData.lastName},
          attendance = ${formData.attendance},
          plus_one = ${formData.plus_one},
          dietary_restriction = ${formData.dietaryRestrictions},
          language = ${formData.language},
          updated_at = CURRENT_TIMESTAMP
        WHERE email = ${formData.email}
      `
    } else {
      // Insert new RSVP
      await sql`
        INSERT INTO rom_rsvps (
          first_name, last_name, email, attendance, plus_one,
          dietary_restriction, language
        ) VALUES (
          ${formData.firstName}, ${formData.lastName}, ${formData.email},
          ${formData.attendance}, ${formData.plus_one},
          ${formData.dietaryRestrictions}, ${formData.language}
        )
      `
    }

    revalidatePath(`/${formData.language}/rom_rsvp`)

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
      SELECT * FROM rom_rsvps WHERE email = ${email}
    `
    return result[0] || null
  } catch (error) {
    console.error("Error fetching RSVP:", error)
    return null
  }
}
