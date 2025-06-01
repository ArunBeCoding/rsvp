import "server-only"

const dictionaries = {
  en: () => import("../../dictionaries/en.json").then((module) => module.default),
  ta: () => import("../../dictionaries/ta.json").then((module) => module.default),
}

export const getDictionary = async (locale: "en" | "ta") => dictionaries[locale]?.() ?? dictionaries.en()
