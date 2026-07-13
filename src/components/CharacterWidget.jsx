import { useState, useEffect, useRef } from 'react'
import { useLanguage } from '../context/LanguageContext'

const WAVE_IMG = '/widget-wave.png'
const IDLE_IMG = '/widget-idle.png'
const MSG_INTERVAL = 5000

export default function CharacterWidget() {
  const { lang, content } = useLanguage()
  const msgs = content.widget?.msgs ?? []

  const [visible, setVisible] = useState(true)
  const [msgIndex, setMsgIndex] = useState(0)
  const [isWaving, setIsWaving] = useState(true)
  const [textKey, setTextKey] = useState(0)
  const [imgVisible, setImgVisible] = useState(true)

  const msgTimerRef = useRef(null)
  const msgsRef = useRef(msgs)
  msgsRef.current = msgs

  function advanceMsg(idx) {
    const next = idx != null ? idx : undefined
    setMsgIndex((prev) => {
      const n = next != null ? next : (prev + 1) % msgsRef.current.length
      return n
    })
    setTextKey((k) => k + 1)
    // Switch pose with fade
    setImgVisible(false)
    setTimeout(() => {
      setIsWaving((w) => !w)
      setImgVisible(true)
    }, 200)
  }

  // Reset message when language changes
  useEffect(() => {
    setMsgIndex(0)
    setTextKey((k) => k + 1)
  }, [lang])

  // Message cycle — pose switches together with message
  useEffect(() => {
    if (!visible) return
    setMsgIndex(0)
    setIsWaving(true)
    setImgVisible(true)
    setTextKey((k) => k + 1)
    msgTimerRef.current = setInterval(() => advanceMsg(), MSG_INTERVAL)
    return () => clearInterval(msgTimerRef.current)
  }, [visible])

  const handleCharClick = () => advanceMsg()

  if (!visible) {
    return (
      <button
        onClick={() => setVisible(true)}
        className="fixed bottom-5 right-5 z-[9999] w-14 h-14 rounded-full flex items-center justify-center text-2xl border-0 cursor-pointer"
        style={{ background: 'linear-gradient(135deg,#FF4FA3,#a855f7)', boxShadow: '0 4px 16px rgba(255,79,163,.4)' }}
        title="Open assistant"
      >
        🌸
      </button>
    )
  }

  return (
    <div
      className="fixed bottom-0 right-5 z-[9999] flex flex-col items-end"
      style={{ pointerEvents: 'none' }}
    >
      {/* Bubble */}
      <div className="mb-2 relative" style={{ pointerEvents: 'all' }}>
        <button
          onClick={() => setVisible(false)}
          className="absolute -top-2.5 -right-2.5 w-6 h-6 rounded-full flex items-center justify-center text-white text-xs border-0 cursor-pointer z-10"
          style={{ background: '#FF4FA3', boxShadow: '0 2px 8px rgba(255,79,163,.4)' }}
        >
          ✕
        </button>

        <div
          className="relative bg-white px-4 py-3 text-sm leading-relaxed"
          style={{
            border: '2px solid #FF4FA3',
            borderRadius: '18px 18px 4px 18px',
            boxShadow: '0 4px 20px rgba(255,79,163,.18)',
            maxWidth: '220px',
            minWidth: '140px',
            color: '#1a1a2e',
            animation: 'abwPop .3s cubic-bezier(.34,1.56,.64,1)',
          }}
        >
          <span
            className="absolute"
            style={{
              bottom: '-10px', right: '18px',
              borderWidth: '5px', borderStyle: 'solid',
              borderColor: '#FF4FA3 transparent transparent transparent',
            }}
          />
          <p key={textKey} className="m-0" style={{ animation: 'abwFade .3s ease' }}>
            {msgs[msgIndex] ?? ''}
          </p>
        </div>
      </div>

      {/* Character */}
      <img
        src={isWaving ? WAVE_IMG : IDLE_IMG}
        alt="AB Assistant"
        onClick={handleCharClick}
        className="block cursor-pointer hover:scale-105"
        style={{
          width: '130px',
          filter: 'drop-shadow(0 4px 14px rgba(0,0,0,.18))',
          transition: 'transform .2s, opacity .2s',
          opacity: imgVisible ? 1 : 0,
          pointerEvents: 'all',
        }}
      />

      <style>{`
        @keyframes abwPop {
          from { opacity:0; transform:scale(.85) translateY(6px); }
          to   { opacity:1; transform:scale(1) translateY(0); }
        }
        @keyframes abwFade {
          from { opacity:0; } to { opacity:1; }
        }
      `}</style>
    </div>
  )
}
