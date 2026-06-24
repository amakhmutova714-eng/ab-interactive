import { motion } from 'framer-motion'
import PixelAlien from './PixelAlien'
import CharacterImage from './CharacterImage'
import { useLanguage } from '../context/LanguageContext'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
}

export default function Projects() {
  const { content } = useLanguage()
  return (
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
                <div
                  className="w-32 flex-shrink-0 flex items-center justify-center relative overflow-hidden"
                  style={{ background: project.gradient, minHeight: '100px' }}
                >
                  <span className="text-4xl" role="img" aria-label={project.name}>
                    {project.emoji}
                  </span>
                  {/* Small pixel detail */}
                  <div className="absolute bottom-2 right-2 opacity-40">
                    <PixelAlien size={3} color="#ffffff" />
                  </div>
                </div>

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
                    className="mt-3 text-left text-xs font-semibold flex items-center gap-1 transition-all duration-200 hover:gap-2"
                    style={{ color: project.typeColor }}
                  >
                    View more <span>→</span>
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

          {/* See more button */}
          <motion.div variants={fadeUp} className="mt-4 flex justify-center">
            <button className="btn-pink px-8 py-3.5 rounded-full text-sm font-bold flex items-center gap-2">
              {content.projectsSeeMore} <span>→</span>
            </button>
          </motion.div>
        </motion.div>
      </div>
    </section>
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
