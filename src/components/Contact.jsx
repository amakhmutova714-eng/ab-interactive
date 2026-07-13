import { motion } from 'framer-motion'
import CharacterImage from './CharacterImage'
import PixelAlien from './PixelAlien'
import FloatingHeart from './FloatingHeart'
import { useLanguage } from '../context/LanguageContext'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
}

export default function Contact() {
  const { content } = useLanguage()
  const { contact, footer } = content

  return (
    <section
      id="contact"
      className="relative py-16 px-6 overflow-hidden"
      style={{
        background: 'linear-gradient(160deg, #FBEAF3 0%, #F7D6E8 40%, #F48FB1 100%)',
      }}
    >
      {/* Floating decorations */}
      <motion.div
        className="absolute top-10 right-8"
        animate={{ y: [0, -12, 0] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
      >
        <PixelAlien size={5} color="#E8448A" />
      </motion.div>

      <motion.div
        className="absolute top-16 left-10"
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
      >
        <FloatingHeart size={18} color="#fff" />
      </motion.div>

      <div className="max-w-[430px] mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ staggerChildren: 0.12 }}
        >
          {/* Heading */}
          <motion.div variants={fadeUp} className="mb-8">
            <h2 className="text-4xl font-black text-black-main leading-tight">
              {contact.title}
              <br />
              <span className="gradient-text">{contact.titleAccent}</span>
            </h2>
          </motion.div>

          {/* Social links */}
          <div className="flex flex-col gap-3 mb-10">
            {contact.links.filter(link => link.href).map((link, i) => (
              <motion.a
                key={i}
                variants={fadeUp}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 py-4 px-6 rounded-2xl text-white font-bold text-base shadow-md transition-all duration-200 hover:scale-[1.02] hover:shadow-lg active:scale-[0.98]"
                style={{ background: link.bg }}
              >
                <span className="text-xl" aria-hidden="true">{link.icon}</span>
                <span>{link.label}</span>
                <svg
                  className="ml-auto"
                  width="16" height="16" viewBox="0 0 24 24"
                  fill="none" stroke="white" strokeWidth="2.5"
                >
                  <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </motion.a>
            ))}
          </div>

          {/* Character waving */}
          <motion.div
            variants={fadeUp}
            className="flex justify-center"
          >
            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
            >
              <CharacterImage variant="contact" className="h-64" />
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-xs text-gray-500 font-medium">{footer.copy}</p>
          <p className="text-xs text-gray-400 mt-1">{footer.sub}</p>
        </div>
      </div>
    </section>
  )
}
