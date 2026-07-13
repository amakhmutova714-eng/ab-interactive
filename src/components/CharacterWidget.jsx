import { useState, useEffect, useRef } from 'react'
import { useLanguage } from '../context/LanguageContext'

const WAVE_IMG = '/widget-wave.png'
const IDLE_IMG = '/widget-idle.png'
const WA_LINK = 'https://wa.me/77052506772'
const BOT_DELAY = 1200

const RULES = [
  {
    match: ['сәлем', 'салем', 'привет', 'hello', 'hi ', 'hey', 'сал '],
    kz: 'Сәлем! 😊 Қалай көмектесе аламын?',
    ru: 'Привет! 😊 Чем могу помочь?',
    en: 'Hello! 😊 How can I help you?',
  },
  {
    match: ['баға', 'цена', 'сколько', 'стоит', 'price', 'cost', 'how much', 'ақша'],
    kz: 'Баға жобаға байланысты. Нақтырақ білу үшін Ватсапқа жаз! 👇',
    ru: 'Цена зависит от проекта. Напиши в WhatsApp для деталей! 👇',
    en: 'Pricing depends on the project. Message me on WhatsApp! 👇',
    wa: true,
  },
  {
    match: ['не жасай', 'что дела', 'what do you', 'қызмет', 'услуг', 'service'],
    kz: 'Мен жасаймын:\n🎮 Roblox ойындары\n🌐 Сайттар\n🎨 UI/UX дизайн\n🎬 Manim анимация\n🤖 AI құралдары',
    ru: 'Я делаю:\n🎮 Roblox игры\n🌐 Сайты\n🎨 UI/UX дизайн\n🎬 Manim анимации\n🤖 AI инструменты',
    en: 'I build:\n🎮 Roblox games\n🌐 Websites\n🎨 UI/UX design\n🎬 Manim animations\n🤖 AI tools',
  },
  {
    match: ['roblox', 'роблокс', 'ойын'],
    kz: 'Roblox жасаймын! Ойын механикасы, UI, скриптер, DataStore — бәрін! 🎮',
    ru: 'Делаю Roblox! Механики, UI, скрипты, DataStore — всё включено! 🎮',
    en: 'I build Roblox games! Mechanics, UI, scripts, DataStore — all included! 🎮',
  },
  {
    match: ['сайт', 'website', 'landing', 'лендинг', 'portfolio', 'портфолио'],
    kz: 'Сайт жасаймын: landing page, портфолио, маркетплейс. HTML/CSS/JS немесе React!',
    ru: 'Делаю сайты: landing page, портфолио, маркетплейс. HTML/CSS/JS или React!',
    en: 'I build websites: landing pages, portfolios, marketplaces. HTML/CSS/JS or React!',
  },
  {
    match: ['тапсырыс', 'заказ', 'order', 'жасатқым', 'хочу заказ', 'want to order', 'бастай'],
    kz: 'Тапсырыс беру үшін Ватсапқа жаз — барлығын талқылаймыз! 👇',
    ru: 'Для заказа напиши в WhatsApp — всё обсудим! 👇',
    en: 'To order, message me on WhatsApp — we\'ll discuss everything! 👇',
    wa: true,
  },
  {
    match: ['қанша уақыт', 'сколько врем', 'how long', 'мерзім', 'срок', 'deadline'],
    kz: 'Жобаға байланысты: қарапайым сайт — 3–5 күн, күрделі жоба — 2–4 апта.',
    ru: 'Зависит от проекта: простой сайт — 3–5 дней, сложный — 2–4 недели.',
    en: 'Depends on project: simple website — 3–5 days, complex project — 2–4 weeks.',
  },
  {
    match: ['байланыс', 'контакт', 'contact', 'ватсап', 'whatsapp', 'телефон', 'номер'],
    kz: 'Ватсапқа жаз, тез жауап беремін! 👇',
    ru: 'Пиши в WhatsApp, отвечу быстро! 👇',
    en: 'Message me on WhatsApp, I\'ll reply fast! 👇',
    wa: true,
  },
  {
    match: ['рахмет', 'спасибо', 'thank', 'сау бол', 'пока', 'bye'],
    kz: 'Рахмет! Жақсы болыңыз! 🌸',
    ru: 'Спасибо! Всего доброго! 🌸',
    en: 'Thank you! Have a great day! 🌸',
  },
]

const FALLBACK = {
  kz: 'Бұл сұрақты толық түсінбедім 😅 Альбинамен тікелей сөйлес — ол жауап береді!',
  ru: 'Не совсем понял вопрос 😅 Напиши Альбине напрямую — она ответит!',
  en: 'Not sure about that one 😅 Chat with Albina directly — she\'ll answer!',
}

const PLACEHOLDER = {
  kz: 'Сұрақ жаз...',
  ru: 'Напиши вопрос...',
  en: 'Type a message...',
}

const WA_LABEL = {
  kz: 'WhatsApp-та жалғастыру',
  ru: 'Продолжить в WhatsApp',
  en: 'Continue on WhatsApp',
}

function getBotReply(text, lang) {
  const lower = text.toLowerCase()
  for (const rule of RULES) {
    if (rule.match.some((k) => lower.includes(k))) {
      return { text: rule[lang] ?? rule.en, wa: !!rule.wa }
    }
  }
  return { text: FALLBACK[lang] ?? FALLBACK.en, wa: true }
}

export default function CharacterWidget() {
  const { lang, content } = useLanguage()
  const greeting = content.widget?.msgs?.[0] ?? 'Hello! 👋'

  const [open, setOpen] = useState(false)
  const [msgs, setMsgs] = useState([])
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const [isWaving, setIsWaving] = useState(true)
  const endRef = useRef(null)

  useEffect(() => {
    if (open && msgs.length === 0) {
      setMsgs([{ from: 'bot', text: greeting, wa: false }])
    }
  }, [open])

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [msgs, typing])

  function send() {
    const text = input.trim()
    if (!text) return
    setInput('')
    setMsgs((prev) => [...prev, { from: 'user', text }])
    setTyping(true)
    setTimeout(() => {
      const reply = getBotReply(text, lang)
      setMsgs((prev) => [...prev, { from: 'bot', ...reply }])
      setIsWaving((w) => !w)
      setTyping(false)
    }, BOT_DELAY)
  }

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-4 right-4 z-[9999] cursor-pointer border-0 bg-transparent p-0"
        style={{ filter: 'drop-shadow(0 4px 18px rgba(255,79,163,.4))' }}
        title="Chat with AB Assistant"
      >
        <img src={WAVE_IMG} alt="AB Assistant" style={{ width: '88px', display: 'block' }} />
      </button>
    )
  }

  return (
    <div
      className="fixed bottom-4 right-4 z-[9999] flex flex-col bg-white"
      style={{ width: '300px', borderRadius: '18px', overflow: 'hidden', boxShadow: '0 8px 32px rgba(0,0,0,.18)' }}
    >
      {/* Header */}
      <div
        className="flex items-center gap-3 px-4 py-3"
        style={{ background: 'linear-gradient(135deg,#FF4FA3,#a855f7)' }}
      >
        <img
          src={isWaving ? WAVE_IMG : IDLE_IMG}
          alt=""
          style={{
            width: '40px', height: '40px',
            objectFit: 'cover', objectPosition: 'top center',
            borderRadius: '50%', border: '2px solid rgba(255,255,255,.5)',
            background: 'rgba(255,255,255,.1)',
          }}
        />
        <div className="flex-1 min-w-0">
          <div className="text-white font-bold text-sm">AB Assistant</div>
          <div className="text-white/70 text-xs">● Online</div>
        </div>
        <button
          onClick={() => setOpen(false)}
          className="text-white/80 hover:text-white border-0 bg-transparent cursor-pointer text-lg leading-none p-0"
        >
          ✕
        </button>
      </div>

      {/* Messages */}
      <div
        className="flex flex-col gap-2 p-3 overflow-y-auto"
        style={{ height: '300px', background: '#f9f5ff' }}
      >
        {msgs.map((m, i) => (
          <div key={i} className={`flex flex-col ${m.from === 'user' ? 'items-end' : 'items-start'}`}>
            <div
              className="px-3 py-2 text-sm max-w-[82%] whitespace-pre-line"
              style={
                m.from === 'user'
                  ? { background: '#FF4FA3', color: '#fff', borderRadius: '16px 16px 4px 16px' }
                  : { background: '#fff', color: '#1a1a2e', borderRadius: '16px 16px 16px 4px', border: '1px solid #ede4ff' }
              }
            >
              {m.text}
            </div>
            {m.wa && m.from === 'bot' && (
              <a
                href={WA_LINK}
                target="_blank"
                rel="noreferrer"
                className="mt-1 text-xs px-3 py-1.5 rounded-xl font-semibold no-underline flex items-center gap-1"
                style={{ background: '#25D366', color: '#fff' }}
              >
                💬 {WA_LABEL[lang] ?? WA_LABEL.en}
              </a>
            )}
          </div>
        ))}

        {typing && (
          <div className="flex items-start">
            <div
              className="px-4 py-2 text-base"
              style={{ background: '#fff', borderRadius: '16px 16px 16px 4px', border: '1px solid #ede4ff', color: '#aaa', letterSpacing: '2px' }}
            >
              •••
            </div>
          </div>
        )}
        <div ref={endRef} />
      </div>

      {/* Input */}
      <div className="flex items-center gap-2 px-3 py-2 bg-white" style={{ borderTop: '1px solid #f0e8ff' }}>
        <input
          className="flex-1 text-sm px-3 py-2 outline-none"
          style={{ border: '1.5px solid #e8d8ff', borderRadius: '12px', background: '#fafafa' }}
          placeholder={PLACEHOLDER[lang] ?? PLACEHOLDER.en}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && send()}
        />
        <button
          onClick={send}
          className="flex items-center justify-center border-0 cursor-pointer text-white"
          style={{
            width: '36px', height: '36px', minWidth: '36px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg,#FF4FA3,#a855f7)',
            fontSize: '16px',
          }}
        >
          ➤
        </button>
      </div>
    </div>
  )
}
