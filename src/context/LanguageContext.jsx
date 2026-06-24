import { createContext, useContext, useState } from 'react'
import { content as contentEn } from '../data/content'
import { contentKz } from '../data/content.kz'
import { contentRu } from '../data/content.ru'

const allContent = { en: contentEn, kz: contentKz, ru: contentRu }

const LanguageContext = createContext()

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState('en')
  return (
    <LanguageContext.Provider value={{ lang, setLang, content: allContent[lang] }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  return useContext(LanguageContext)
}
