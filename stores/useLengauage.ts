import { create } from "zustand";
import { persist } from "zustand/middleware";
import { LanguageType } from "../types/lengauages";
import id from "@/languages/id";
import en from "@/languages/en";
import gtlo from "@/languages/gtlo";

type Lang = "id" | "en" | "gtlo";

interface LangStore {
  lang: Lang;
  dictionary: LanguageType;
  setLang: (lang: Lang) => void;
}

export const useLanguage = create<LangStore>()(
  persist(
    (set) => ({
      lang: "en",
      dictionary: en,
      setLang: (lang: Lang) => {
        let dict: LanguageType;

        switch (lang) {
          case "id":
            dict = id;
            break;
          case "gtlo":
            dict = gtlo;
            break;
          case "en":
          default:
            dict = en;
        }

        set({ lang, dictionary: dict });
      },
    }),
    { name: "lang-store" }
  )
);
