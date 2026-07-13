import { initializeApp } from 'firebase/app'
import { getDatabase, ref, push, onValue, update } from 'firebase/database'

const cfg = {
  apiKey:            import.meta.env.VITE_FB_API_KEY,
  authDomain:        import.meta.env.VITE_FB_AUTH_DOMAIN,
  databaseURL:       import.meta.env.VITE_FB_DATABASE_URL,
  projectId:         import.meta.env.VITE_FB_PROJECT_ID,
  storageBucket:     import.meta.env.VITE_FB_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FB_SENDER_ID,
  appId:             import.meta.env.VITE_FB_APP_ID,
}

let db = null

export function initFirebase() {
  if (db || !cfg.apiKey) return !!db
  const app = initializeApp(cfg)
  db = getDatabase(app)
  return true
}

export function createSession(site, lang, history) {
  if (!db) return null
  const root = push(ref(db, 'chats'), { site, lang, status: 'waiting', startedAt: Date.now() })
  history.forEach((m) => push(ref(db, `chats/${root.key}/messages`), m))
  return root.key
}

export function sendMsg(chatId, from, text) {
  if (!db) return
  push(ref(db, `chats/${chatId}/messages`), { from, text, ts: Date.now() })
}

export function watchChat(chatId, onMsgs, onStatus) {
  if (!db) return () => {}
  const unMsg = onValue(ref(db, `chats/${chatId}/messages`), (snap) => {
    const list = []
    snap.forEach((c) => list.push({ id: c.key, ...c.val() }))
    onMsgs(list)
  })
  const unStatus = onValue(ref(db, `chats/${chatId}/status`), (snap) => {
    onStatus(snap.val())
  })
  return () => { unMsg(); unStatus() }
}

export function setStatus(chatId, status) {
  if (!db) return
  update(ref(db, `chats/${chatId}`), { status })
}
