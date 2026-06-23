import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { content } from '../data/content'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

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
      <div className="max-w-[430px] mx-auto px-5 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-lg" aria-hidden="true">🎮</span>
          <span className="font-bold text-black-main tracking-tight text-[15px]">
            {content.brand.name}
          </span>
        </div>

        <button
          onClick={() => scrollTo('contact')}
          aria-label="Contact"
          className="flex flex-col gap-[5px] p-1"
        >
          <span className="w-5 h-0.5 bg-black-main rounded-full block" />
          <span className="w-5 h-0.5 bg-black-main rounded-full block" />
          <span className="w-3.5 h-0.5 bg-black-main rounded-full block ml-auto" />
        </button>
      </div>

      {/* Availability badge */}
      <div className="max-w-[430px] mx-auto px-5 pb-2">
        <div className="inline-flex items-center gap-1.5 bg-gray-bg rounded-full px-3 py-1">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse block" />
          <span className="text-xs font-medium text-gray-600">{content.brand.available}</span>
        </div>
      </div>
    </motion.nav>
  )
}
