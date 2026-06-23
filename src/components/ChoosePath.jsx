import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import PixelAlien from './PixelAlien'
import CharacterImage from './CharacterImage'
import { content } from '../data/content'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
}

export default function ChoosePath() {
  const [open, setOpen] = useState(null)

  const toggle = (id) => setOpen(open === id ? null : id)

  return (
    <section
      id="path"
      className="bg-pink-light py-16 px-6 relative overflow-hidden"
    >
      {/* Decorative alien */}
      <div className="absolute top-8 right-6 opacity-30">
        <PixelAlien size={4} color="#E8448A" />
      </div>

      <div className="max-w-[430px] mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ staggerChildren: 0.12 }}
        >
          <motion.div variants={fadeUp} className="flex items-center gap-2 mb-8">
            <h2 className="text-3xl font-black text-black-main">Choose Your Path</h2>
          </motion.div>

          <div className="flex flex-col gap-4">
            {content.paths.map((path, i) => {
              const isOpen = open === path.id

              return (
                <motion.div
                  key={path.id}
                  variants={fadeUp}
                  layout
                  className="bg-white rounded-2xl shadow-sm overflow-hidden cursor-pointer select-none"
                  style={{
                    boxShadow: isOpen
                      ? `0 8px 32px ${path.accentColor}25`
                      : '0 2px 12px rgba(0,0,0,0.05)',
                  }}
                  onClick={() => toggle(path.id)}
                  whileHover={{ scale: 1.01 }}
                  transition={{ layout: { duration: 0.35, ease: 'easeInOut' } }}
                >
                  {/* Left accent bar */}
                  <div
                    className="flex"
                  >
                    <div
                      className="w-1 flex-shrink-0 rounded-l-2xl transition-all duration-300"
                      style={{ background: isOpen ? path.accentColor : 'transparent' }}
                    />

                    <div className="flex-1 p-5">
                      {/* Header row */}
                      <div className="flex items-center gap-4">
                        <div
                          className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
                          style={{ background: path.bgColor }}
                        >
                          {path.icon}
                        </div>

                        <div className="flex-1 min-w-0">
                          <p className="text-xs text-gray-400 font-medium">{path.prefix}</p>
                          <h3
                            className="text-xl font-black leading-tight"
                            style={{ color: path.accentColor }}
                          >
                            {path.title}
                          </h3>
                        </div>

                        <motion.div
                          animate={{ rotate: isOpen ? 180 : 0 }}
                          transition={{ duration: 0.25 }}
                          className="flex-shrink-0"
                        >
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={path.accentColor} strokeWidth="2.5">
                            <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </motion.div>
                      </div>

                      {/* Expanded services */}
                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            key="content"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3, ease: 'easeInOut' }}
                            style={{ overflow: 'hidden' }}
                          >
                            <ul className="mt-4 space-y-2 pb-1">
                              {path.services.map((s, si) => (
                                <motion.li
                                  key={si}
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: si * 0.06 }}
                                  className="flex items-center gap-2 text-sm text-gray-600"
                                >
                                  <span
                                    className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                                    style={{ background: path.accentColor }}
                                  />
                                  {s}
                                </motion.li>
                              ))}
                            </ul>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </motion.div>

        {/* Alien mascot at section bottom */}
        <motion.div
          className="mt-6 flex justify-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          >
            <CharacterImage variant="alien" className="h-44" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
