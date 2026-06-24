import { useState } from 'react'
import { motion } from 'framer-motion'
import PixelAlien from './PixelAlien'
import CharacterImage from './CharacterImage'
import ProjectModal from './ProjectModal'
import { useLanguage } from '../context/LanguageContext'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
}

export default function Projects() {
  const { content } = useLanguage()
  const [activeProject, setActiveProject] = useState(null)

  return (
    <>
      <section id="projects" className="bg-white py-16 px-6 relative">
        <div className="max-w-[430px] mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ staggerChildren: 0.12 }}
          >
            <motion.div variants={fadeUp} className="flex items-center gap-2 mb-8">
              <h2 className="text-3xl font-black text-black-main">{content.projectsTitle}</h2>
              <HeartIcon />
            </motion.div>

            <div className="flex flex-col gap-4">
              {content.projects.map((project) => (
                <motion.div
                  key={project.id}
                  variants={fadeUp}
                  className="card-hover bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100 flex"
                  style={{ minHeight: '100px' }}
                >
                  {/* Thumbnail */}
                  <GameCardThumb project={project} />

                  {/* Info */}
                  <div className="flex-1 p-4 flex flex-col justify-center">
                    <h3 className="font-black text-lg text-black-main leading-tight">
                      {project.name}
                    </h3>
                    <div className="mt-1 mb-2">
                      <span
                        className="text-xs font-semibold px-2.5 py-1 rounded-full"
                        style={{ color: project.typeColor, background: project.typeBg }}
                      >
                        {project.type}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 leading-relaxed">{project.desc}</p>
                    <button
                      onClick={() => setActiveProject(project)}
                      className="mt-3 text-left text-xs font-semibold flex items-center gap-1 transition-all duration-200 hover:gap-2"
                      style={{ color: project.typeColor }}
                    >
                      {content.projectViewMore} <span>→</span>
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Laptop mascot */}
            <motion.div
              variants={fadeUp}
              className="mt-6 flex justify-center"
            >
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
              >
                <CharacterImage variant="laptop" className="h-36" />
              </motion.div>
            </motion.div>

          </motion.div>
        </div>
      </section>

      <ProjectModal
        project={activeProject}
        onClose={() => setActiveProject(null)}
      />
    </>
  )
}

function GameCardThumb({ project }) {
  return (
    <div
      className="w-32 flex-shrink-0 relative overflow-hidden"
      style={{ background: project.gradient, minHeight: '100px' }}
    >
      {/* Dot grid */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.13) 1px, transparent 1px)',
          backgroundSize: '9px 9px',
        }}
      />

      {/* Top-right glow blob */}
      <div
        className="absolute -top-5 -right-5 w-16 h-16 rounded-full blur-2xl"
        style={{ background: 'rgba(255,255,255,0.3)' }}
      />

      {/* Bottom-left glow blob */}
      <div
        className="absolute -bottom-4 -left-4 w-12 h-12 rounded-full blur-xl"
        style={{ background: 'rgba(255,255,255,0.15)' }}
      />

      {/* Screenshot frame */}
      <div className="absolute inset-0 flex items-center justify-center p-3">
        <div
          className="w-full h-full rounded-xl overflow-hidden"
          style={{ border: '1.5px solid rgba(255,255,255,0.3)' }}
        >
          <img
            src={project.image}
            alt={project.name}
            className="w-full h-full"
            style={{ objectFit: 'cover', objectPosition: 'center center' }}
          />
        </div>
      </div>

      {/* Emoji badge */}
      <div
        className="absolute top-1.5 left-1.5 z-10 w-6 h-6 rounded-md flex items-center justify-center text-xs leading-none"
        style={{
          background: 'rgba(255,255,255,0.22)',
          backdropFilter: 'blur(6px)',
          border: '1px solid rgba(255,255,255,0.3)',
          boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
        }}
      >
        {project.emoji}
      </div>

      {/* Sparkle stars */}
      <span className="absolute top-1.5 right-2 z-10 text-white/80 font-bold" style={{ fontSize: '9px' }}>✦</span>
      <span className="absolute bottom-2 right-1.5 z-10 text-white/50 font-bold" style={{ fontSize: '7px' }}>✦</span>
      <span className="absolute bottom-4 left-1.5 z-10 text-white/40 font-bold" style={{ fontSize: '5px' }}>●</span>
    </div>
  )
}

function HeartIcon() {
  return (
    <motion.svg
      width="20" height="20" viewBox="0 0 24 24"
      animate={{ scale: [1, 1.25, 1] }}
      transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
    >
      <path
        d="M12 21.593c-5.63-5.539-11-10.297-11-14.402 0-3.791 3.068-5.191 5.281-5.191 1.312 0 4.151.501 5.719 4.457 1.59-3.968 4.464-4.447 5.726-4.447 2.54 0 5.274 1.621 5.274 5.181 0 4.069-5.136 8.625-11 14.402z"
        fill="#F48FB1"
      />
    </motion.svg>
  )
}
