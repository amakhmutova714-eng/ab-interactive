import { motion } from 'framer-motion'
import PixelAlien from './PixelAlien'
import FloatingHeart from './FloatingHeart'
import MinecraftBg from './MinecraftBg'
import CharacterImage from './CharacterImage'
import { content } from '../data/content'

const floatingAliens = [
  { top: '18%', right: '8%', size: 4, delay: 0, color: '#E8448A' },
  { top: '35%', left: '5%', size: 3, delay: 1.2, color: '#F472B6' },
  { top: '55%', right: '6%', size: 3, delay: 0.6, color: '#E8448A' },
]

const floatingHearts = [
  { top: '22%', left: '12%', size: 16, delay: 0.4, color: '#F7D6E8' },
  { top: '28%', right: '15%', size: 12, delay: 0.9, color: '#F48FB1' },
  { top: '50%', left: '8%', size: 10, delay: 1.5, color: '#F7D6E8' },
  { top: '60%', right: '12%', size: 14, delay: 0.2, color: '#F48FB1' },
  { top: '42%', left: '18%', size: 8, delay: 1.8, color: '#F7D6E8' },
]

export default function Hero() {
  const { hero } = content

  const scrollToPath = () => {
    document.getElementById('path')?.scrollIntoView({ behavior: 'smooth' })
  }
  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="hero"
      className="relative min-h-[100svh] flex flex-col bg-white overflow-hidden"
    >
      {/* Floating aliens */}
      {floatingAliens.map((a, i) => (
        <motion.div
          key={i}
          className="absolute z-10"
          style={{ top: a.top, left: a.left, right: a.right }}
          animate={{ y: [0, -14, 0] }}
          transition={{ duration: 3.5 + i * 0.4, repeat: Infinity, ease: 'easeInOut', delay: a.delay }}
        >
          <PixelAlien size={a.size} color={a.color} />
        </motion.div>
      ))}

      {/* Floating hearts */}
      {floatingHearts.map((h, i) => (
        <motion.div
          key={i}
          className="absolute z-10"
          style={{ top: h.top, left: h.left, right: h.right }}
          animate={{ y: [0, -10, 0], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 3 + i * 0.3, repeat: Infinity, ease: 'easeInOut', delay: h.delay }}
        >
          <FloatingHeart size={h.size} color={h.color} />
        </motion.div>
      ))}

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center flex-1 px-6 pt-32 pb-8">
        {/* Heading */}
        <motion.div
          className="w-full max-w-[380px] mb-2"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <h1 className="text-4xl font-black leading-tight text-black-main">
            {hero.greeting}
          </h1>
          <p className="mt-2 text-base text-gray-500 font-medium leading-relaxed">
            {hero.subtitle}
          </p>
        </motion.div>

        {/* Character */}
        <motion.div
          className="relative my-4"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
        >
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          >
            <CharacterImage variant="hero" className="h-72" />
          </motion.div>

          {/* Glow beneath character */}
          <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-32 h-8 bg-pink-soft/60 blur-2xl rounded-full" />
        </motion.div>

        {/* Tagline pill */}
        <motion.div
          className="mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <span className="text-xs font-semibold tracking-widest text-gray-400 uppercase">
            {content.brand.tagline}
          </span>
        </motion.div>

        {/* Buttons */}
        <motion.div
          className="flex flex-col gap-3 w-full max-w-[320px]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
        >
          <button
            onClick={scrollToPath}
            className="btn-pink w-full py-4 rounded-full text-base font-bold flex items-center justify-center gap-2"
          >
            {hero.cta1}
            <span>→</span>
          </button>
          <button
            onClick={scrollToContact}
            className="btn-dark w-full py-4 rounded-full text-base font-bold flex items-center justify-center gap-2"
          >
            {hero.cta2}
          </button>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10"
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#CBD5E1" strokeWidth="2">
          <path d="M6 9l6 6 6-6" />
        </svg>
      </motion.div>

      {/* Minecraft background at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-24 overflow-hidden">
        <MinecraftBg className="opacity-70" />
      </div>
    </section>
  )
}
