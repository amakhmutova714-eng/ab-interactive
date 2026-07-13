import { motion } from 'framer-motion'
import CharacterImage from './CharacterImage'
import { useLanguage } from '../context/LanguageContext'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
}

export default function About() {
  const { content } = useLanguage()
  const { about } = content

  return (
    <section id="about" className="bg-white py-16 px-6">
      <div className="max-w-[430px] mx-auto">

        {/* About Me */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ staggerChildren: 0.12 }}
        >
          <motion.div variants={fadeUp} className="flex items-center gap-2 mb-5">
            <h2 className="text-3xl font-black text-black-main">{about.title}</h2>
            <FloatingHeartInline />
          </motion.div>

          <div className="flex items-start gap-5">
            <motion.div variants={fadeUp} className="flex-1">
              {about.paragraphs.map((p, i) => (
                <p key={i} className={`text-[15px] text-gray-600 leading-relaxed ${i < about.paragraphs.length - 1 ? 'mb-3' : ''}`}>
                  {p}
                </p>
              ))}
            </motion.div>

            <motion.div variants={fadeUp} className="flex-shrink-0">
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
              >
                <CharacterImage variant="about" className="h-44" />
              </motion.div>
            </motion.div>
          </div>
        </motion.div>

        {/* Divider */}
        <div className="my-10 h-px bg-gray-100" />

        {/* What I Do */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ staggerChildren: 0.1 }}
        >
          <motion.div variants={fadeUp} className="flex items-center gap-2 mb-6">
            <h2 className="text-3xl font-black text-black-main">{about.whatIDoTitle}</h2>
            <FloatingHeartInline />
          </motion.div>

          <div className="grid grid-cols-2 gap-3">
            {about.whatIDo.map((item, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="card-hover bg-pink-light rounded-2xl p-5 flex flex-col items-center gap-2 cursor-default"
              >
                <span className="text-3xl" aria-hidden="true">{item.icon}</span>
                <span className="text-sm font-bold text-black-main text-center whitespace-pre-line leading-tight">
                  {item.label}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Minecraft strip */}
        <div className="mt-10 rounded-2xl overflow-hidden h-16 opacity-60">
          <MinecraftStrip />
        </div>
      </div>
    </section>
  )
}

function FloatingHeartInline() {
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

function MinecraftStrip() {
  const blocks = [
    '#F7D6E8', '#F48FB1', '#FBEAF3', '#EDD6F7', '#F7D6E8',
    '#F48FB1', '#FBEAF3', '#F7D6E8', '#EDD6F7', '#F48FB1',
    '#FBEAF3', '#F7D6E8', '#F48FB1', '#EDD6F7', '#FBEAF3',
  ]
  return (
    <div className="flex h-full">
      {blocks.map((c, i) => (
        <div
          key={i}
          className="flex-1 h-full"
          style={{ background: c }}
        />
      ))}
    </div>
  )
}
