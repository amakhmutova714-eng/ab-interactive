import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

export default function ProjectModal({ project, onClose }) {
  const galleryRef = useRef(null)
  const [activeSlide, setActiveSlide] = useState(0)

  useEffect(() => {
    if (project) {
      document.body.style.overflow = 'hidden'
      setActiveSlide(0)
      if (galleryRef.current) galleryRef.current.scrollLeft = 0
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [project])

  const handleScroll = () => {
    if (!galleryRef.current) return
    const { scrollLeft, offsetWidth } = galleryRef.current
    setActiveSlide(Math.round(scrollLeft / offsetWidth))
  }

  const gallery = project?.gallery?.length
    ? project.gallery
    : project?.image
    ? [project.image]
    : []

  return (
    <AnimatePresence>
      {project && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/60 z-[100]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          <motion.div
            className="fixed bottom-0 left-1/2 -translate-x-1/2 z-[101] bg-white rounded-t-3xl w-full flex flex-col"
            style={{ maxWidth: '430px', maxHeight: '90dvh' }}
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 280 }}
          >
            {/* Drag handle */}
            <div className="flex justify-center pt-3 pb-1 flex-shrink-0">
              <div className="w-10 h-1 bg-gray-200 rounded-full" />
            </div>

            {/* Scrollable body */}
            <div className="overflow-y-auto flex-1">

              {/* Gallery */}
              {gallery.length > 0 && (
                <div className="relative">
                  <div
                    ref={galleryRef}
                    onScroll={handleScroll}
                    className="flex"
                    style={{
                      overflowX: 'auto',
                      scrollSnapType: 'x mandatory',
                      scrollbarWidth: 'none',
                      msOverflowStyle: 'none',
                      WebkitOverflowScrolling: 'touch',
                    }}
                  >
                    {gallery.map((src, i) => (
                      <div
                        key={i}
                        className="flex-shrink-0 w-full"
                        style={{
                          scrollSnapAlign: 'start',
                          height: '240px',
                          background: project.gradient,
                        }}
                      >
                        <img
                          src={src}
                          alt={`${project.name} ${i + 1}`}
                          className="w-full h-full"
                          style={{ objectFit: 'cover', objectPosition: 'center top' }}
                          loading={i === 0 ? 'eager' : 'lazy'}
                        />
                      </div>
                    ))}
                  </div>

                  {/* Close button */}
                  <button
                    onClick={onClose}
                    className="absolute top-3 right-3 w-8 h-8 bg-black/40 backdrop-blur-sm rounded-full flex items-center justify-center text-white text-xs font-bold z-10"
                  >
                    ✕
                  </button>

                  {/* Slide counter badge */}
                  {gallery.length > 1 && (
                    <div className="absolute top-3 left-3 bg-black/40 backdrop-blur-sm rounded-full px-2.5 py-1 text-white text-xs font-bold z-10">
                      {activeSlide + 1} / {gallery.length}
                    </div>
                  )}

                  {/* Dot indicators */}
                  {gallery.length > 1 && (
                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
                      {gallery.map((_, i) => (
                        <button
                          key={i}
                          onClick={() => {
                            galleryRef.current?.scrollTo({
                              left: i * galleryRef.current.offsetWidth,
                              behavior: 'smooth',
                            })
                          }}
                          className="rounded-full transition-all duration-200"
                          style={{
                            width: i === activeSlide ? '18px' : '6px',
                            height: '6px',
                            background: i === activeSlide ? '#fff' : 'rgba(255,255,255,0.5)',
                          }}
                        />
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Info */}
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
                <div className="flex flex-wrap gap-2 mb-5">
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

                {/* Video player */}
                {project.video && (
                  <div className="mb-5 rounded-2xl overflow-hidden bg-black">
                    <video
                      controls
                      playsInline
                      preload="none"
                      className="w-full block"
                      style={{ maxHeight: '220px' }}
                    >
                      <source src={project.video} type="video/mp4" />
                    </video>
                  </div>
                )}

                {/* CTA */}
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
