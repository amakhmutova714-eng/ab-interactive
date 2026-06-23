import { motion } from 'framer-motion'
import PixelAlien from './PixelAlien'
import MinecraftBg from './MinecraftBg'
import { content } from '../data/content'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
}

export default function WhyWorkWithMe() {
  return (
    <section id="why" className="bg-pink-light py-16 px-6 relative overflow-hidden">
      {/* Decorative alien */}
      <div className="absolute top-6 right-5 opacity-25">
        <PixelAlien size={5} color="#E8448A" />
      </div>

      <div className="max-w-[430px] mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ staggerChildren: 0.1 }}
        >
          <motion.div variants={fadeUp} className="flex items-center gap-2 mb-8">
            <h2 className="text-3xl font-black text-black-main">Why Work With Me?</h2>
            <HeartIcon />
          </motion.div>

          <div className="flex flex-col gap-3">
            {content.whyMe.map((item, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="card-hover bg-white rounded-2xl p-4 flex items-center gap-4 shadow-sm"
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
                  style={{ background: item.iconBg }}
                >
                  {item.icon}
                </div>
                <div>
                  <h3 className="font-bold text-[15px] text-black-main">{item.title}</h3>
                  <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Minecraft strip bottom */}
      <div className="mt-12 h-20 overflow-hidden">
        <MinecraftBg className="opacity-60" />
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
