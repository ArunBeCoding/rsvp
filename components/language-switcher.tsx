"use client"

import { usePathname, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Globe } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

const languages = [
  { code: "en", name: "English", nativeName: "English" },
  { code: "ta", name: "Tamil", nativeName: "தமிழ்" },
]

export function LanguageSwitcher({ currentLang }: { currentLang: string }) {
  const pathname = usePathname()
  const router = useRouter()

  const switchLanguage = (newLang: string) => {
    // Remove current language from pathname and add new one
    const pathWithoutLang = pathname.replace(/^\/[a-z]{2}/, "")
    const newPath = `/${newLang}${pathWithoutLang}`
    router.push(newPath)
  }

  const currentLanguage = languages.find((lang) => lang.code === currentLang) || languages[0]

  return (
    <Button 
      variant="outline" 
      size="sm" 
      className="gap-2 rounded-full w-10 h-10 p-0 flex items-center justify-center bg-[#830065] border-[#830065] text-white"
      onClick={() => {
        // Switch to the opposite language
        const newLang = currentLang === 'en' ? 'ta' : 'en';
        switchLanguage(newLang);
      }}
    >
      <span className="hidden sm:inline">
        {currentLang === 'en' ? 'தமிழ்' : 'en'}
      </span>
    </Button>
  )
}
