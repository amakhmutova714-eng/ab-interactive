import { useState, useEffect, useRef, useCallback } from 'react'
import { useLanguage } from '../context/LanguageContext'
import { initFirebase, createSession, sendMsg, watchChat } from '../firebase'

// suppress unused warning — used lazily
void initFirebase

const WAVE = '/widget-wave.png'
const IDLE = '/widget-idle.png'
const WA   = 'https://wa.me/77052506772'
const MSG_INTERVAL = 5000
const BOT_DELAY    = 1100

// ── Language detection from typed text ─────────────────────────
function detectLang(text) {
  if (/[әіңғүұқөһӘІҢҒҮҰҚӨҺ]/.test(text)) return 'kz'
  if (/[а-яёА-ЯЁ]/.test(text)) return 'ru'
  return 'en'
}
function pick(arr) { return arr[Math.floor(Math.random() * arr.length)] }

// ── Bot response rules ──────────────────────────────────────────
const RULES = [
  {
    test: (t) => /сәлем|салем|сал$|қайырлы|ассалаум/i.test(t),
    kz: ['Сәлем! 😊 Қалай көмектесе аламын?', 'Сәлем-сәлем! Не іздеп жатырсың?', 'Уа-уа, сәлем! Бүгін не жоспарлап жатырсың? 😄'],
    ru: ['Привет! 😊 Чем могу помочь?', 'Привет-привет! Что ищешь?', 'О, привет! Рада видеть 😄 Чем займёмся?'],
    en: ['Hello! 😊 How can I help?', 'Hey there! What are you looking for?', 'Hi! Great to see you 😄 What can I do for you?'],
  },
  {
    test: (t) => /баға|бағасы|қанша тұр|қанша ақша/i.test(t) || /цена|сколько стоит|почём/i.test(t) || /price|cost|how much/i.test(t),
    kz: ['Баға жобаға байланысты — бірдей екі жоба болмайды 😊 Нақтырақ білу үшін маған жаз!', 'Бағаны жобаңның көлеміне қарап айтамын. Не жасатқың келеді?'],
    ru: ['Цена зависит от проекта — расскажи подробнее, что нужно 😊', 'Точную стоимость скажу после обсуждения деталей. Что именно хочешь сделать?'],
    en: ['Pricing depends on the project scope 😊 Tell me more about what you need!', 'Every project is different — what would you like to build?'],
  },
  {
    test: (t) => /не жасайсың|не жасай|не істей|қызмет|не ұсын/i.test(t) || /что делаешь|что умеешь|услуг/i.test(t) || /what do you|services|what can you/i.test(t),
    kz: ['Мен жасаймын:\n🎮 Roblox ойындары\n🌐 Сайттар & веб-апп\n🎨 UI/UX дизайн\n🎬 Manim анимация\n🤖 AI промпт & автоматизация\n\nНе қызықтырады? 😊'],
    ru: ['Я делаю:\n🎮 Roblox игры\n🌐 Сайты & веб-приложения\n🎨 UI/UX дизайн\n🎬 Manim анимации\n🤖 AI промпты & автоматизация\n\nЧто интересует? 😊'],
    en: ['I build:\n🎮 Roblox games\n🌐 Websites & web apps\n🎨 UI/UX design\n🎬 Manim animations\n🤖 AI prompts & automation\n\nWhat interests you? 😊'],
  },
  {
    test: (t) => /roblox|роблокс/i.test(t),
    kz: ['Roblox — менің сүйікті бөлімім 🎮 Ойын механикасы, UI, скриптер, DataStore — барлығын жасаймын. Не жоспарлап жатырсың?', 'Roblox ойын жасаймыз ба? 🎮 Айтшы жоба туралы — тыңдап отырмын!'],
    ru: ['Roblox — моё любимое! 🎮 Механики, UI, скрипты, DataStore — всё умею. Что задумал?', 'Делаем Roblox игру? 🎮 Расскажи про проект — я вся внимание!'],
    en: ['Roblox is my favourite! 🎮 Mechanics, UI, scripts, DataStore — I do it all. What are you planning?', 'Building a Roblox game? 🎮 Tell me about the project!'],
  },
  {
    test: (t) => /сайт|вебсайт|лендинг|landing|портфолио|portfolio|website/i.test(t),
    kz: ['Сайт жасаймын! 🌐 Landing page, портфолио, маркетплейс, платформа — HTML/CSS/JS немесе React. Қандай сайт керек саған?'],
    ru: ['Делаю сайты! 🌐 Landing page, портфолио, маркетплейс, платформы — HTML/CSS/JS или React. Какой сайт тебе нужен?'],
    en: ['I build websites! 🌐 Landing pages, portfolios, marketplaces, platforms — HTML/CSS/JS or React. What kind of site do you need?'],
  },
  {
    test: (t) => /manim|анимация|animation|математик/i.test(t),
    kz: ['Manim анимация — Python арқылы математикалық визуализация жасаймын 🎬 Видео + .py файлы бірге беріледі. Не тақырыпта?'],
    ru: ['Manim анимации — математическая визуализация на Python 🎬 Видео + .py файл в комплекте. Какая тема?'],
    en: ['Manim animations — mathematical visualization with Python 🎬 Video + .py source included. What topic?'],
  },
  {
    test: (t) => /тапсырыс|заказ|order|жасатқым|хочу заказ|want to order|бастайық|начнём/i.test(t),
    kz: ['Тамаша! 🙌 Жобаңды маған айтшы — не жасату керек, мерзім, бюджет бар ма? Барлығын тыңдаймын!'],
    ru: ['Отлично! 🙌 Расскажи про проект — что нужно сделать, сроки, бюджет если есть? Слушаю!'],
    en: ['Awesome! 🙌 Tell me about your project — what needs to be done, timeline, budget if any?'],
  },
  {
    test: (t) => /мерзім|қанша уақыт|сколько времени|how long|срок|deadline/i.test(t),
    kz: ['Жобаға байланысты:\n⚡ Қарапайым лендинг — 3–5 күн\n🌐 Толық сайт — 1–2 апта\n🎮 Roblox ойын — 1–4 апта\n🎬 Анимация — 3–7 күн\n\nНе жасату керек?'],
    ru: ['Зависит от проекта:\n⚡ Простой лендинг — 3–5 дней\n🌐 Полный сайт — 1–2 недели\n🎮 Roblox игра — 1–4 недели\n🎬 Анимация — 3–7 дней\n\nЧто делаем?'],
    en: ['Depends on scope:\n⚡ Simple landing — 3–5 days\n🌐 Full website — 1–2 weeks\n🎮 Roblox game — 1–4 weeks\n🎬 Animation — 3–7 days\n\nWhat are we building?'],
  },
  {
    test: (t) => /рахмет|спасибо|thank|сау бол|пока|bye/i.test(t),
    kz: ['Рахмет! Жақсы болыңыз 🌸', 'Ой, рахмет! Тағы кел 😊', 'Рахмет саған! Сәттілік 🌸'],
    ru: ['Спасибо! Всего доброго 🌸', 'Спасибо! Заходи ещё 😊', 'Пожалуйста! Удачи тебе 🌸'],
    en: ['Thank you! Have a great day 🌸', 'Thanks! Come back anytime 😊', 'You\'re welcome! Good luck 🌸'],
  },
  {
    test: (t) => /адам|оператор|albina|альбина|real|шынайы|настоящий|жив/i.test(t),
    kz: null, ru: null, en: null, // → connect prompt
    isConnect: true,
  },
]

function getBotReply(text, lang) {
  const rule = RULES.find((r) => r.test(text))
  if (!rule) return { text: null, connect: false }
  if (rule.isConnect) return { text: null, connect: true }
  return { text: pick(rule[lang] ?? rule.en), connect: false }
}

// ── UI strings ──────────────────────────────────────────────────
const T = {
  placeholder: { kz: 'Хабарлама жаз...', ru: 'Напиши сообщение...', en: 'Type a message...' },
  connectPrompt: {
    kz: 'Мен бұл сұраққа жауап бере алмадым 😅\nСізге нақты адаммен байланыстырайын ба?',
    ru: 'Не могу ответить на этот вопрос 😅\nСвязать вас с реальным человеком?',
    en: "I couldn't answer that one 😅\nShall I connect you with a real person?",
  },
  inChat:   { kz: '💬 Осы чатта', ru: '💬 В этом чате', en: '💬 In this chat' },
  inWa:     { kz: '📱 WhatsApp-та', ru: '📱 В WhatsApp', en: '📱 On WhatsApp' },
  waiting:  { kz: 'Оператор жауап береді, күте тұрыңыз... ⏳', ru: 'Оператор ответит в ближайшее время... ⏳', en: 'An operator will join shortly... ⏳' },
  joined:   { kz: '✅ Оператор қосылды!', ru: '✅ Оператор подключился!', en: '✅ Operator joined!' },
  noFirebase: { kz: 'Чат қазір қолжетімді емес. WhatsApp-та жаз:', ru: 'Чат сейчас недоступен. Напиши в WhatsApp:', en: 'Chat unavailable now. Please use WhatsApp:' },
}

const CONNECT_PROMPT_MARKER = '__CONNECT__'

// ── Idle widget (cycling messages + character) ──────────────────
function IdleWidget({ msgs, lang, onOpen, onHide }) {
  const [idx, setIdx]   = useState(0)
  const [wave, setWave] = useState(true)
  const [imgOn, setImgOn] = useState(true)
  const msgsRef = useRef(msgs)
  msgsRef.current = msgs

  useEffect(() => { setIdx(0) }, [lang])

  useEffect(() => {
    const t = setInterval(() => {
      setIdx((i) => (i + 1) % msgsRef.current.length)
      setImgOn(false)
      setTimeout(() => { setWave((w) => !w); setImgOn(true) }, 200)
    }, MSG_INTERVAL)
    return () => clearInterval(t)
  }, [])

  return (
    <div className="fixed bottom-0 right-5 z-[9999] flex flex-col items-end" style={{ pointerEvents: 'none' }}>
      <div className="mb-2 relative" style={{ pointerEvents: 'all' }}>
        <button onClick={onHide} className="absolute -top-2.5 -right-2.5 w-6 h-6 rounded-full flex items-center justify-center text-white text-xs border-0 cursor-pointer z-10" style={{ background: '#FF4FA3' }}>✕</button>
        <div className="relative bg-white px-4 py-3 text-sm leading-relaxed" style={{ border: '2px solid #FF4FA3', borderRadius: '18px 18px 4px 18px', boxShadow: '0 4px 20px rgba(255,79,163,.18)', maxWidth: '220px', minWidth: '140px', color: '#1a1a2e' }}>
          <span className="absolute" style={{ bottom: '-10px', right: '18px', borderWidth: '5px', borderStyle: 'solid', borderColor: '#FF4FA3 transparent transparent transparent' }} />
          <p key={idx} className="m-0" style={{ animation: 'abwFade .35s ease' }}>{msgs[idx] ?? ''}</p>
        </div>
      </div>
      <img src={wave ? WAVE : IDLE} alt="AB Assistant" onClick={onOpen} className="block cursor-pointer hover:scale-105"
        style={{ width: '130px', filter: 'drop-shadow(0 4px 14px rgba(0,0,0,.18))', transition: 'transform .2s, opacity .2s', opacity: imgOn ? 1 : 0, pointerEvents: 'all' }} />
      <style>{`@keyframes abwFade{from{opacity:0}to{opacity:1}}`}</style>
    </div>
  )
}

// ── Chat window ─────────────────────────────────────────────────
function ChatWindow({ siteLang, greeting, onBack }) {
  const [msgs, setMsgs]     = useState([{ from: 'bot', text: greeting }])
  const [input, setInput]   = useState('')
  const [typing, setTyping] = useState(false)
  const [wave, setWave]     = useState(true)
  const [mode, setMode]     = useState('bot') // bot | connect_prompt | waiting | live
  const [chatId, setChatId] = useState(null)
  const endRef = useRef(null)
  const historyRef = useRef([{ from: 'bot', text: greeting }])

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [msgs, typing])

  // When Firebase mode is live — subscribe to messages
  useEffect(() => {
    if (mode !== 'live' || !chatId) return
    const unsub = watchChat(
      chatId,
      (fbMsgs) => {
        setMsgs(fbMsgs.map((m) => ({ from: m.from, text: m.text })))
      },
      (status) => {
        if (status === 'live') {
          setMsgs((prev) => {
            const already = prev.some((m) => m.text === T.joined[siteLang])
            return already ? prev : [...prev, { from: 'system', text: T.joined[siteLang] }]
          })
        }
      }
    )
    return unsub
  }, [mode, chatId])

  function addMsg(from, text) {
    const m = { from, text }
    historyRef.current.push(m)
    setMsgs((prev) => [...prev, m])
  }

  function botReply(text, userLang) {
    setTyping(true)
    setTimeout(() => {
      setTyping(false)
      setWave((w) => !w)
      const { text: reply, connect } = getBotReply(text, userLang)
      if (connect || reply === null) {
        addMsg('bot', CONNECT_PROMPT_MARKER)
        setMode('connect_prompt')
      } else {
        addMsg('bot', reply)
      }
    }, BOT_DELAY)
  }

  function send() {
    const text = input.trim()
    if (!text) return
    setInput('')
    addMsg('user', text)
    if (mode === 'live') {
      sendMsg(chatId, 'user', text)
      return
    }
    const userLang = detectLang(text) || siteLang
    botReply(text, userLang)
  }

  function chooseInChat() {
    const fbReady = initFirebase()
    if (!fbReady) {
      setMode('bot')
      addMsg('bot', T.noFirebase[siteLang] + ' wa.me/77052506772')
      return
    }
    addMsg('bot', T.waiting[siteLang])
    const id = createSession(
      'ab-interactive',
      siteLang,
      historyRef.current.map((m) => ({ ...m, ts: Date.now() }))
    )
    setChatId(id)
    setMode('waiting')
    // Poll for operator join
    const unsub = watchChat(id, () => {}, (status) => {
      if (status === 'live') { setMode('live'); unsub() }
    })
  }

  function chooseWa() {
    window.open(WA, '_blank')
    setMode('bot')
  }

  const ph = T.placeholder[siteLang] ?? T.placeholder.en

  return (
    <div className="fixed bottom-4 right-4 z-[9999] flex flex-col bg-white" style={{ width: '300px', borderRadius: '18px', overflow: 'hidden', boxShadow: '0 8px 32px rgba(0,0,0,.18)' }}>
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-3" style={{ background: 'linear-gradient(135deg,#FF4FA3,#a855f7)' }}>
        <img src={wave ? WAVE : IDLE} alt="" style={{ width: '40px', height: '40px', objectFit: 'cover', objectPosition: 'top center', borderRadius: '50%', border: '2px solid rgba(255,255,255,.5)', transition: 'opacity .2s' }} />
        <div className="flex-1">
          <div className="text-white font-bold text-sm">AB Assistant</div>
          <div className="text-white/70 text-xs">{mode === 'live' ? '● Albina' : '● Online'}</div>
        </div>
        <button onClick={onBack} className="text-white/80 hover:text-white border-0 bg-transparent cursor-pointer text-lg leading-none p-0">✕</button>
      </div>

      {/* Messages */}
      <div className="flex flex-col gap-2 p-3 overflow-y-auto" style={{ height: '300px', background: '#f9f5ff' }}>
        {msgs.map((m, i) => {
          if (m.text === CONNECT_PROMPT_MARKER) {
            return (
              <div key={i} className="flex flex-col items-start gap-2">
                <div className="px-3 py-2 text-sm whitespace-pre-line" style={{ background: '#fff', borderRadius: '16px 16px 16px 4px', border: '1px solid #ede4ff', color: '#1a1a2e', maxWidth: '90%' }}>
                  {T.connectPrompt[siteLang]}
                </div>
                {mode === 'connect_prompt' && (
                  <div className="flex gap-2">
                    <button onClick={chooseInChat} className="text-xs px-3 py-1.5 rounded-xl font-semibold border-0 cursor-pointer text-white" style={{ background: 'linear-gradient(135deg,#FF4FA3,#a855f7)' }}>{T.inChat[siteLang]}</button>
                    <button onClick={chooseWa}     className="text-xs px-3 py-1.5 rounded-xl font-semibold border-0 cursor-pointer text-white" style={{ background: '#25D366' }}>{T.inWa[siteLang]}</button>
                  </div>
                )}
              </div>
            )
          }
          if (m.from === 'system') {
            return <div key={i} className="text-center text-xs text-purple-400 py-1">{m.text}</div>
          }
          return (
            <div key={i} className={`flex flex-col ${m.from === 'user' ? 'items-end' : 'items-start'}`}>
              <div className="px-3 py-2 text-sm max-w-[84%] whitespace-pre-line"
                style={m.from === 'user'
                  ? { background: '#FF4FA3', color: '#fff', borderRadius: '16px 16px 4px 16px' }
                  : { background: '#fff', color: '#1a1a2e', borderRadius: '16px 16px 16px 4px', border: '1px solid #ede4ff' }}
              >{m.text}</div>
            </div>
          )
        })}
        {typing && <div className="flex items-start"><div className="px-4 py-2" style={{ background: '#fff', borderRadius: '16px 16px 16px 4px', border: '1px solid #ede4ff', color: '#aaa', letterSpacing: '2px', fontSize: '14px' }}>•••</div></div>}
        <div ref={endRef} />
      </div>

      {/* Input */}
      <div className="flex items-center gap-2 px-3 py-2 bg-white" style={{ borderTop: '1px solid #f0e8ff' }}>
        <input
          className="flex-1 text-sm px-3 py-2 outline-none"
          style={{ border: '1.5px solid #e8d8ff', borderRadius: '12px', background: '#fafafa' }}
          placeholder={ph}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && send()}
          disabled={mode === 'waiting'}
        />
        <button onClick={send} disabled={mode === 'waiting'}
          className="flex items-center justify-center border-0 cursor-pointer text-white"
          style={{ width: '36px', height: '36px', minWidth: '36px', borderRadius: '12px', background: 'linear-gradient(135deg,#FF4FA3,#a855f7)', fontSize: '16px', opacity: mode === 'waiting' ? .5 : 1 }}>
          ➤
        </button>
      </div>
    </div>
  )
}

// ── Root ────────────────────────────────────────────────────────
export default function CharacterWidget() {
  const { lang, content } = useLanguage()
  const msgs = content.widget?.msgs ?? []
  const [view, setView] = useState('idle') // idle | chat | hidden

  if (view === 'hidden') {
    return <button onClick={() => setView('idle')} className="fixed bottom-5 right-5 z-[9999] w-14 h-14 rounded-full flex items-center justify-center text-2xl border-0 cursor-pointer" style={{ background: 'linear-gradient(135deg,#FF4FA3,#a855f7)', boxShadow: '0 4px 16px rgba(255,79,163,.4)' }}>🌸</button>
  }
  if (view === 'chat') {
    return <ChatWindow siteLang={lang} greeting={msgs[0] ?? 'Hello! 👋'} onBack={() => setView('idle')} />
  }
  return <IdleWidget msgs={msgs} lang={lang} onOpen={() => setView('chat')} onHide={() => setView('hidden')} />
}
