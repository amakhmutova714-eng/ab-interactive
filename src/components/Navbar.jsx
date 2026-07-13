import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useLanguage } from '../context/LanguageContext'

const LANGS = ['en', 'kz', 'ru']

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const { content, lang, setLang } = useLanguage()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/95 backdrop-blur-md shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className="max-w-[430px] md:max-w-5xl mx-auto px-5 md:px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-lg" aria-hidden="true">🎮</span>
          <span className="font-bold text-black-main tracking-tight text-[15px]">
            {content.brand.name}
          </span>
        </div>

        {/* Desktop nav links */}
        <div className="hidden md:flex items-center gap-8">
          {['about', 'projects', 'path', 'why', 'contact'].map((id) => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              className="text-sm font-semibold text-gray-500 hover:text-pink-btn transition-colors duration-200 capitalize"
            >
              {id === 'path' ? (content.choosePathTitle?.split(' ')[0] ?? 'Services')
                : id === 'why' ? (content.whyMeTitle?.split(' ')[0] ?? 'Why Me')
                : id.charAt(0).toUpperCase() + id.slice(1)}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          {/* Language switcher */}
          <div className="flex items-center gap-0.5 bg-gray-bg rounded-full px-1 py-1">
            {LANGS.map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                className={`text-[11px] font-bold px-2.5 py-1 rounded-full transition-all duration-200 ${
                  lang === l
                    ? 'bg-pink-btn text-white shadow-sm'
                    : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                {l.toUpperCase()}
              </button>
            ))}
          </div>

          {/* Menu / contact scroll — mobile only */}
          <button
            onClick={() => scrollTo('contact')}
            aria-label="Contact"
            className="md:hidden flex flex-col gap-[5px] p-1"
          >
            <span className="w-5 h-0.5 bg-black-main rounded-full block" />
            <span className="w-5 h-0.5 bg-black-main rounded-full block" />
            <span className="w-3.5 h-0.5 bg-black-main rounded-full block ml-auto" />
          </button>

          {/* Desktop contact button */}
          <button
            onClick={() => scrollTo('contact')}
            className="hidden md:block btn-pink px-5 py-2 rounded-full text-sm font-bold"
          >
            {content.hero?.cta2?.replace('💬 ', '') ?? 'Contact Me'}
          </button>
        </div>
      </div>

      {/* Availability badge */}
      <div className="max-w-[430px] md:max-w-5xl mx-auto px-5 md:px-8 pb-2">
        <div className="inline-flex items-center gap-1.5 bg-gray-bg rounded-full px-3 py-1">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse block" />
          <span className="text-xs font-medium text-gray-600">{content.brand.available}</span>
        </div>
      </div>
    </motion.nav>
  )
}
