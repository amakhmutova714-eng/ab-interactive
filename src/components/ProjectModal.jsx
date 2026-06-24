import { motion, AnimatePresence } from 'framer-motion'
import { useEffect } from 'react'

export default function ProjectModal({ project, onClose }) {
  useEffect(() => {
    if (project) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [project])

  return (
    <AnimatePresence>
      {project && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/60 z-[100]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Sheet */}
          <motion.div
            className="fixed bottom-0 left-1/2 -translate-x-1/2 z-[101] bg-white rounded-t-3xl w-full overflow-hidden"
            style={{ maxWidth: '430px', maxHeight: '90dvh' }}
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 280 }}
          >
            {/* Drag handle */}
            <div className="flex justify-center pt-3 pb-1">
              <div className="w-10 h-1 bg-gray-200 rounded-full" />
            </div>

            <div className="overflow-y-auto" style={{ maxHeight: 'calc(90dvh - 20px)' }}>
              {/* Hero image */}
              <div className="relative mx-4 mt-2 rounded-2xl overflow-hidden" style={{ height: '200px' }}>
                <div
                  className="absolute inset-0"
                  style={{ background: project.gradient }}
                />
                <img
                  src={project.image}
                  alt={project.name}
                  className="absolute inset-0 w-full h-full object-cover"
                  style={project.id === 'gotab' ? { objectPosition: 'center top', objectFit: 'contain', padding: '8px' } : { objectFit: 'cover' }}
                />
                <button
                  onClick={onClose}
                  className="absolute top-3 right-3 w-8 h-8 bg-black/40 backdrop-blur-sm rounded-full flex items-center justify-center text-white text-xs font-bold"
                >
                  ✕
                </button>
              </div>

              {/* Content */}
              <div className="px-5 pt-4 pb-8">
                {/* Title + badge */}
                <div className="mb-4">
                  <h3 className="text-2xl font-black text-black-main leading-tight">{project.name}</h3>
                  <span
                    className="text-xs font-semibold px-2.5 py-1 rounded-full mt-1.5 inline-block"
                    style={{ color: project.typeColor, background: project.typeBg }}
                  >
                    {project.type}
                  </span>
                </div>

                {/* Stats */}
                <div className="flex gap-2 mb-5">
                  {project.stats.map((s, i) => (
                    <div key={i} className="flex-1 bg-gray-bg rounded-2xl py-3 px-2 text-center">
                      <div className="font-black text-base text-black-main leading-none">{s.value}</div>
                      <div className="text-[10px] text-gray-400 font-medium mt-1">{s.label}</div>
                    </div>
                  ))}
                </div>

                {/* Description */}
                <p className="text-sm text-gray-600 leading-relaxed mb-5">{project.fullDesc}</p>

                {/* Tech tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="text-xs font-semibold px-3 py-1.5 rounded-full"
                      style={{ background: project.typeBg, color: project.typeColor }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* CTA button */}
                {project.link ? (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-pink w-full py-4 rounded-full text-sm font-bold flex items-center justify-center gap-2"
                  >
                    {project.linkLabel}
                  </a>
                ) : (
                  <button
                    disabled
                    className="w-full py-4 rounded-full text-sm font-bold bg-gray-100 text-gray-400 cursor-not-allowed"
                  >
                    {project.linkLabel}
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
