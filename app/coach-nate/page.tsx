'use client'
import React, { useEffect, useRef, useState } from 'react'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

const API = 'https://api.blackdiamondlabs.co.nz'
const KEY_STORE = 'bdai-member-key'
const VOICE_STORE = 'bdai-voice-on'

// Palette — gold belongs to Coach Nate; the room around him is electric blue.
const AQUA = '#2FE0F0'
const BLUE = '#4D9FFF'
const AQUA_DIM = 'rgba(47,224,240,0.35)'

// Stripe Payment Links — swap to live URLs at the Stripe live-flip
const STRIPE = {
  nz: {
    member: { m: 'https://buy.stripe.com/4gM28q9uOeIe0BMb71ak000', a: 'https://buy.stripe.com/4gMbJ0eP8cA61FQejdak001' },
    team:   { m: 'https://buy.stripe.com/fZudR87mGarY98ib71ak008', a: 'https://buy.stripe.com/3cI8wOcH02ZwgAKdf9ak009' },
    club:   { m: 'https://buy.stripe.com/5kQfZgfTcarY5W6df9ak00g', a: 'https://buy.stripe.com/00w28q8qK43A4S24IDak00h' },
    assoc:  { m: 'https://buy.stripe.com/dRm3cu5ey0Rodoy3Ezak00o', a: 'https://buy.stripe.com/bJe8wO6iC0Ro1FQejdak00p' },
  },
  au: {
    member: { m: 'https://buy.stripe.com/6oU28q5ey0Ro70a1wrak006', a: 'https://buy.stripe.com/cNi5kCdL4gQmfwGcb5ak007' },
    team:   { m: 'https://buy.stripe.com/8x26oGeP857Eacm3Ezak00e', a: 'https://buy.stripe.com/6oU8wOeP81Vsdoy4IDak00f' },
    club:   { m: 'https://buy.stripe.com/28EeVcdL48jQbgq0snak00n', a: 'https://buy.stripe.com/5kQ3cufTcbw2esC1wrak00m' },
    assoc:  { m: 'https://buy.stripe.com/aFaaEW7mG1Vs5W6b71ak00u', a: 'https://buy.stripe.com/7sYaEWcH057E84e6QLak00v' },
  },
  us: {
    member: { m: 'https://buy.stripe.com/dRmcN48qK57E70aejdak002', a: 'https://buy.stripe.com/4gM3cu9uO7fM98i8YTak003' },
    team:   { m: 'https://buy.stripe.com/eVqdR836q7fM3NYb71ak00a', a: 'https://buy.stripe.com/28EdR8eP857E84eejdak00b' },
    club:   { m: 'https://buy.stripe.com/7sY7sK5eygQm70a1wrak00i', a: 'https://buy.stripe.com/8x2cN4eP88jQ1FQfnhak00j' },
    assoc:  { m: 'https://buy.stripe.com/8x2bJ06iCeIecku5MHak00q', a: 'https://buy.stripe.com/5kQ7sK8qKarY3NYejdak00r' },
  },
  jp: {
    member: { m: 'https://buy.stripe.com/28E7sKbCW9nUcku7UPak004', a: 'https://buy.stripe.com/14AcN436q9nUckudf9ak005' },
    team:   { m: 'https://buy.stripe.com/7sY8wOfTccA6bgqdf9ak00c', a: 'https://buy.stripe.com/fZu00icH09nU3NYfnhak00d' },
    club:   { m: 'https://buy.stripe.com/4gMdR89uO9nUacmfnhak00k', a: 'https://buy.stripe.com/00w9ASfTc2Zw4S25MHak00l' },
    assoc:  { m: 'https://buy.stripe.com/8x2cN49uO6bIesCgrlak00s', a: 'https://buy.stripe.com/6oUcN48qKfMi84ea2Xak00t' },
  },
} as const

const MARKETS = [
  { id: 'nz', flag: '🇳🇿', label: 'NZD', cur: 'NZ$', note: 'All prices NZD. Rest of world welcome here.' },
  { id: 'au', flag: '🇦🇺', label: 'AUD', cur: 'A$', note: 'All prices AUD.' },
  { id: 'us', flag: '🇺🇸', label: 'USD', cur: 'US$', note: 'All prices USD.' },
  { id: 'jp', flag: '🇯🇵', label: 'JPY', cur: '¥', note: 'All prices JPY.' },
] as const
type MarketId = typeof MARKETS[number]['id']

const PRICES: Record<MarketId, Record<string, { m: number; a: number }>> = {
  nz: { member: { m: 29, a: 290 }, team: { m: 59, a: 590 }, club: { m: 99, a: 990 }, assoc: { m: 225, a: 2250 } },
  au: { member: { m: 25, a: 250 }, team: { m: 49, a: 490 }, club: { m: 85, a: 850 }, assoc: { m: 189, a: 1890 } },
  us: { member: { m: 29, a: 290 }, team: { m: 59, a: 590 }, club: { m: 99, a: 990 }, assoc: { m: 225, a: 2250 } },
  jp: { member: { m: 2980, a: 29800 }, team: { m: 5980, a: 59800 }, club: { m: 9800, a: 98000 }, assoc: { m: 21800, a: 218000 } },
}

const TIERS = [
  { id: 'member', btn: 'linear-gradient(90deg,#0F7A4D,#34D399,#A7F3D0,#34D399,#0F7A4D)', name: 'Opening Day Patron', monthly: 29, annual: 290, blurb: 'Opening special — rate locked for life. Coach Nate remembers your season. Moves to Individual at $39/mo · $390/yr.', fair: '40 questions per day' },
  { id: 'team', btn: 'linear-gradient(90deg,#8C5A2B,#CD7F32,#F0C08A,#CD7F32,#8C5A2B)', name: 'Team', monthly: 59, annual: 590, blurb: 'One coaching staff, one squad. Shared access for your team.', fair: '3 member keys' },
  { id: 'club', btn: 'linear-gradient(90deg,#9AA4B2,#C7CEDA,#F4F7FB,#C7CEDA,#9AA4B2)', name: 'Club', monthly: 99, annual: 990, blurb: 'Club development pathways and Elite coaching aide always on hand.', fair: '5 member keys' },
  { id: 'assoc', btn: 'linear-gradient(90deg,#B8860B,#FFD700,#FFF3C4,#FFD700,#B8860B)', name: 'Association', monthly: 225, annual: 2250, blurb: 'Tool kit must have for Representative Coaches and Development Officers.', fair: '15 member keys' },
]

const CHIPS = [
  'Build me a batting order',
  'Design a 90-minute training session',
  'How do I handle a tough sideline parent?',
  'Build me an off-season hitting programme',
  'How should I run a selection conversation?',
  'What can you help me with?',
]

const DOWNLOADS = [
  { slug: 'hitting-notebook', title: "Nate's Black Book — Hitting", desc: '33-page printable A5 · six philosophies · 100 Swings logs · pitch-by-pitch at-bat grids · pitcher scouting cards · season review', file: 'Coach-Nate-Hitting-Notebook.pdf' },
  { slug: 'wall-card-100-swings', title: '100 Swings Wall Card', desc: 'One-page A4 · the whole programme at a glance · print it, laminate it, stick it in the shed', file: '100-Swings-Wall-Card.pdf' },
  { slug: 'cheat-sheet', title: 'Coach Nate Cheat Sheet', desc: 'Two-page A4 · the best prompts for hitters, coaches, and administrators · how to get the most out of your membership', file: 'Coach-Nate-Cheat-Sheet.pdf' },
]

type Msg = { role: 'user' | 'assistant'; content: string }
type Member = { label: string; tier: string; voice_enabled: boolean }

export default function CoachNate() {
  const [apiKey, setApiKey] = useState('')
  const [market, setMarket] = useState<MarketId>('nz')
  const [trialEmail, setTrialEmail] = useState('')
  const [trialBusy, setTrialBusy] = useState(false)
  const [trialMsg, setTrialMsg] = useState('')
  const [member, setMember] = useState<Member | null>(null)
  const [online, setOnline] = useState<'checking' | 'online' | 'offline'>('checking')
  const [pageError, setPageError] = useState('')
  const [msgs, setMsgs] = useState<Msg[]>([])
  const [input, setInput] = useState('')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const [voiceOn, setVoiceOn] = useState(false)
  const [speaking, setSpeaking] = useState(false)
  const [playingIdx, setPlayingIdx] = useState<number | null>(null)
  const keyRef = useRef<HTMLInputElement>(null)
  const endRef = useRef<HTMLDivElement>(null)
  const chatRef = useRef<HTMLDivElement>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const speakBusy = useRef(false)

  // Restore chat after an accidental refresh (session-scoped only)
  useEffect(() => {
    try {
      const saved = sessionStorage.getItem('bdai-chat')
      if (saved) setMsgs(JSON.parse(saved))
    } catch {}
  }, [])
  useEffect(() => {
    try {
      if (msgs.length > 0) sessionStorage.setItem('bdai-chat', JSON.stringify(msgs))
    } catch {}
  }, [msgs])

  useEffect(() => {
    const onErr = (e: ErrorEvent) => {
      const src = String(e.filename || '')
      const ours = src.includes('blackdiamondlabs.co.nz') || src.includes('/_next/')
      const msg = String(e.message || '')
      const network = /chunk|fetch|load failed|network/i.test(msg)
      if (ours && msg && msg !== 'Script error.' && !network) setPageError(msg)
    }
    window.addEventListener('error', onErr)
    try { if (localStorage.getItem(VOICE_STORE) === '1') setVoiceOn(true) } catch {}
    try {
      const k = localStorage.getItem(KEY_STORE)
      if (k) {
        setApiKey(k)
        fetch(API + '/v1/me', { headers: { Authorization: 'Bearer ' + k } })
          .then(r => (r.ok ? r.json() : null))
          .then(info => { if (info) setMember(info) })
          .catch(() => {})
      }
    } catch {}
    const ctrl = new AbortController()
    const t = setTimeout(() => ctrl.abort(), 3500)
    fetch(API + '/health', { signal: ctrl.signal })
      .then(r => setOnline(r.ok ? 'online' : 'offline'))
      .catch(() => setOnline('offline'))
      .finally(() => clearTimeout(t))
    return () => window.removeEventListener('error', onErr)
  }, [])

  useEffect(() => {
    if (msgs.length > 0 && chatRef.current) chatRef.current.scrollTo({ top: chatRef.current.scrollHeight, behavior: 'smooth' })
  }, [msgs, busy])

  useEffect(() => {
    if (!apiKey) return
    const c = document.getElementById('bdai-rain') as HTMLCanvasElement | null
    if (!c) return
    const x = c.getContext('2d')!
    const fit = () => { c.width = window.innerWidth; c.height = window.innerHeight }
    fit(); window.addEventListener('resize', fit)
    const chars = 'アイウエオカキクケコサシスセソKHRBI643SO'.split('')
    const fs = 16
    const drops: number[] = Array.from({ length: Math.floor(window.innerWidth / fs) }, () => Math.random() * -100)
    const t = setInterval(() => {
      x.fillStyle = 'rgba(0,0,0,0.08)'; x.fillRect(0, 0, c.width, c.height)
      x.font = fs + 'px monospace'
      for (let i = 0; i < drops.length; i++) {
        // Aqua rain with a brighter leading glyph now and then
        const bright = i % 11 === 0
        x.shadowBlur = bright ? 8 : 0
        x.shadowColor = bright ? AQUA : 'transparent'
        x.fillStyle = bright ? '#7FF6FF' : '#1F9DB0'
        x.fillText(chars[Math.floor(Math.random() * chars.length)], i * fs, drops[i] * fs)
        if (drops[i] * fs > c.height && Math.random() > 0.975) drops[i] = 0
        drops[i]++
      }
      x.shadowBlur = 0
    }, 55)
    return () => { clearInterval(t); window.removeEventListener('resize', fit) }
  }, [apiKey])

  const startTrial = async () => {
    if (trialBusy || !trialEmail.includes('@')) return
    setTrialBusy(true); setTrialMsg('')
    try {
      const r = await fetch(API + '/v1/trial', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: trialEmail.trim() }),
      })
      const data = await r.json().catch(() => ({}))
      if (r.ok && data.api_key) {
        setTrialMsg('Key created — also emailed to you. Dropping you in…')
        if (keyRef.current) keyRef.current.value = data.api_key
        setTimeout(() => saveKey(), 600)
      } else {
        setTrialMsg(data.detail || 'Something went wrong — try again or use the contact page.')
      }
    } catch {
      setTrialMsg('Connection issue — try again in a moment.')
    } finally {
      setTrialBusy(false)
    }
  }

  const saveKey = async () => {
    const k = (keyRef.current?.value || '').trim()
    if (!k) { setError('Type or paste your key first.'); return }
    setError('Checking key…')
    try {
      const r = await fetch(API + '/v1/me', { headers: { Authorization: 'Bearer ' + k } })
      if (r.status === 401) { setError("That key isn't valid or has been deactivated. Check for missing characters and try again."); return }
      if (!r.ok) { setError('Coach Nate had trouble checking that key (HTTP ' + r.status + '). Try again shortly.'); return }
      const info: Member = await r.json()
      setMember(info)
      setApiKey(k)
      try { localStorage.setItem(KEY_STORE, k) } catch {}
      setError('')
    } catch {
      setError("Can't reach Coach Nate — connection issue, not your key. Check your internet and try again.")
    }
  }

  const signOut = () => {
    setApiKey(''); setMsgs([]); setMember(null)
    audioRef.current?.pause()
    try { localStorage.removeItem(KEY_STORE) } catch {}
    try { sessionStorage.removeItem('bdai-chat') } catch {}
  }

  const toggleVoice = () => {
    unlockAudio()
    setVoiceOn(v => {
      const next = !v
      try { localStorage.setItem(VOICE_STORE, next ? '1' : '0') } catch {}
      if (!next) { audioRef.current?.pause(); setSpeaking(false); setPlayingIdx(null) }
      return next
    })
  }

  const unlockAudio = () => {
    try {
      if (!audioRef.current) audioRef.current = new Audio()
      const a = audioRef.current
      a.muted = true
      a.play().then(() => { a.pause(); a.muted = false }).catch(() => { a.muted = false })
    } catch {}
  }

  const speak = async (text: string, idx: number | null = null) => {
    if (speakBusy.current) return
    if (idx !== null && playingIdx === idx && speaking) {
      audioRef.current?.pause()
      setPlayingIdx(null)
      return
    }
    speakBusy.current = true
    try {
      audioRef.current?.pause()
      const r = await fetch(API + '/v1/ask-voice', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + apiKey },
        body: JSON.stringify({ message: text }),
      })
      if (!r.ok) return
      const data = await r.json()
      if (!data.audio_base64) return
      const audio = audioRef.current || new Audio()
      audioRef.current = audio
      audio.src = 'data:audio/mpeg;base64,' + data.audio_base64
      audio.muted = false
      audio.volume = 1
      audio.onplay = () => { setSpeaking(true); setPlayingIdx(idx) }
      audio.onended = () => { setSpeaking(false); setPlayingIdx(null) }
      audio.onpause = () => { setSpeaking(false); setPlayingIdx(null) }
      await audio.play().catch(err => console.log('voice play blocked:', err))
    } catch (e) {
      console.log('voice error:', e)
    } finally {
      speakBusy.current = false
    }
  }

  const send = async (override?: string) => {
    const message = (override ?? input).trim()
    if (!message || busy) return
    if (voiceOn) unlockAudio()
    setError(''); setInput(''); setBusy(true)
    const history = msgs.slice(-20)
    setMsgs(m => [...m, { role: 'user', content: message }])
    try {
      const r = await fetch(API + '/v1/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + apiKey },
        body: JSON.stringify({ message, history }),
      })
      if (r.status === 401) { setError('That key is invalid or inactive. Check it and sign in again.'); signOut(); return }
      if (r.status === 429) { const d = await r.json().catch(() => null); setError(d?.detail || 'Daily fair-use limit reached — resets at midnight UTC.'); return }
      if (!r.ok) { setError('Coach Nate is having trouble right now (HTTP ' + r.status + '). Try again shortly.'); return }
      const data = await r.json()
      setMsgs(m => [...m, { role: 'assistant', content: data.reply }])
      if (voiceOn) speak(data.reply)
    } catch (e) {
      setError('Could not reach Black Diamond AI (' + String((e as Error).message || e) + '). Check your connection and try again.')
    } finally {
      setBusy(false)
    }
  }

  const download = async (slug: string, filename: string) => {
    try {
      const r = await fetch(API + '/v1/downloads/' + slug, { headers: { Authorization: 'Bearer ' + apiKey } })
      if (!r.ok) { setError(r.status === 404 ? 'Coming very soon — check back!' : 'Download failed (' + r.status + ')'); return }
      const blob = await r.blob()
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url; a.download = filename; a.click()
      URL.revokeObjectURL(url)
    } catch { setError('Download failed — connection issue.') }
  }

  const gold: React.CSSProperties = { background: 'linear-gradient(90deg,#B8860B,#FFD700,#FFF3C4,#FFD700,#B8860B)', backgroundSize: '200% auto', animation: 'shimmer 3s linear infinite' }
  const neon: React.CSSProperties = { background: 'linear-gradient(90deg,#1B6E8C,#2FE0F0,#BDF6FF,#2FE0F0,#1B6E8C)', backgroundSize: '200% auto', animation: 'shimmer 3s linear infinite' }

  return (
    <main className="min-h-screen bg-black text-white flex flex-col relative">
      <style>{`
        @keyframes neon-breathe {
          0%, 100% { box-shadow: 0 0 22px rgba(47,224,240,0.10), inset 0 0 30px rgba(47,224,240,0.03); }
          50%      { box-shadow: 0 0 34px rgba(47,224,240,0.20), inset 0 0 30px rgba(47,224,240,0.06); }
        }
        @keyframes think-pulse {
          0%, 100% { opacity: 0.25; transform: translateY(0); }
          50%      { opacity: 1;    transform: translateY(-3px); }
        }
        .neon-card { animation: neon-breathe 4.5s ease-in-out infinite; }
        .think-dot { animation: think-pulse 1.1s ease-in-out infinite; }
      `}</style>

      {apiKey && <canvas id="bdai-rain" className="fixed inset-0 w-full h-full" style={{ opacity: 0.14, pointerEvents: 'none' }} />}
      <Nav />
      {!apiKey && (
        <div className="fixed inset-0 z-0">
          <img src="/about-bg.jpeg" alt="" className="w-full h-full object-cover object-[70%_30%]" />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(2,10,18,0.82) 0%, rgba(1,6,12,0.90) 55%, #000 100%)' }} />
          <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 60% 45% at 50% 22%, rgba(47,224,240,0.10), transparent 70%)' }} />
        </div>
      )}
      <section className="relative z-10 flex-1 flex flex-col pt-28 pb-10 px-4 sm:px-8 max-w-3xl mx-auto w-full">
        {pageError && (
          <div className="mb-4 rounded-lg border border-red-500/40 bg-red-500/10 px-4 py-3 text-xs text-red-300">
            Page error: {pageError}
          </div>
        )}
        <div className="mb-6 text-center">
          <p className="text-xs font-bold uppercase tracking-[0.35em] mb-2" style={{ color: AQUA, textShadow: '0 0 14px rgba(47,224,240,0.5)' }}>Black Diamond AI</p>
          <h1 className={apiKey ? "text-2xl font-black" : "text-4xl sm:text-5xl font-black"}>
            Coach <span style={{ background: 'linear-gradient(90deg,#B8860B,#FFD700,#FFF3C4,#FFD700,#B8860B)', backgroundSize: '200% auto', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', animation: 'shimmer 3s linear infinite' }}>Nate</span>
          </h1>
          {!apiKey && <p className="text-sm text-white/45 mt-3">Game plans. Training. In-game calls. The mental side. Ask like you would at the diamond — and he remembers your season, session to session.</p>}
          <p className="text-xs mt-2" style={{ color: online === 'offline' ? '#f87171' : online === 'online' ? AQUA : '#facc15' }}>
            {online === 'checking' ? '' : online === 'online' ? '● Online' : '● Service resting — chat may be unavailable'}
          </p>
          {apiKey && member?.voice_enabled && (
            <button onClick={toggleVoice}
              className="text-xs mt-3 px-3 py-1 rounded-full border transition-colors"
              style={{ borderColor: voiceOn ? AQUA : '#ffffff30', color: voiceOn ? AQUA : '#ffffff60', boxShadow: voiceOn ? '0 0 14px rgba(47,224,240,0.25)' : undefined }}>
              {voiceOn ? (speaking ? '🔊 Coach Nate speaking…' : '🔊 Voice: ON') : '🔇 Voice: OFF'}
            </button>
          )}
          {apiKey && member && (
            <p className="text-[10px] text-white/25 mt-1">
              Signed in: {member.label}{member.voice_enabled ? ' · voice enabled' : ' · text only'}
            </p>
          )}
        </div>

        {!apiKey ? (
          <div className="neon-card rounded-2xl border p-8 max-w-md mx-auto w-full text-center"
            style={{ borderColor: AQUA_DIM, background: 'linear-gradient(180deg, rgba(6,22,32,0.72), rgba(2,8,14,0.72))', backdropFilter: 'blur(3px)' }}>
            <h2 className="text-lg font-black mb-2">Members</h2>
            <p className="text-sm text-white/45 mb-6">Enter your member key to talk with Coach Nate.</p>
            <input
              ref={keyRef}
              type="password"
              autoComplete="off"
              onKeyDown={e => e.key === 'Enter' && saveKey()}
              placeholder="Your access key"
              className="w-full rounded-lg bg-black/70 border px-4 py-3 text-sm mb-4 focus:outline-none transition-colors"
              style={{ borderColor: 'rgba(47,224,240,0.25)' }}
              onFocus={e => { e.currentTarget.style.borderColor = AQUA; e.currentTarget.style.boxShadow = '0 0 16px rgba(47,224,240,0.25)' }}
              onBlur={e => { e.currentTarget.style.borderColor = 'rgba(47,224,240,0.25)'; e.currentTarget.style.boxShadow = 'none' }}
            />
            <button onClick={saveKey}
              className="w-full rounded-lg py-3 text-sm font-bold uppercase tracking-widest text-black transition-all hover:brightness-110"
              style={{ ...neon, boxShadow: '0 0 22px rgba(47,224,240,0.35)' }}>
              Enter
            </button>
            {error && <p className="text-xs text-red-400 mt-3">{error}</p>}

            <div className="mt-8 pt-6 text-left" style={{ borderTop: '1px solid rgba(47,224,240,0.18)' }}>
              <p className="text-sm font-black text-center mb-1" style={{ color: AQUA, textShadow: '0 0 12px rgba(47,224,240,0.45)' }}>Not a member? Try him free.</p>
              <p className="text-xs text-white/45 text-center mb-4">5 questions, no card needed. Ask something hard.</p>
              <div className="flex flex-col gap-3">
                <input
                  type="email"
                  value={trialEmail}
                  onChange={e => setTrialEmail(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && startTrial()}
                  placeholder="Your email"
                  className="w-full rounded-lg bg-black/70 border px-4 py-3 text-sm focus:outline-none transition-colors"
                  style={{ borderColor: 'rgba(47,224,240,0.25)' }}
                  onFocus={e => { e.currentTarget.style.borderColor = AQUA; e.currentTarget.style.boxShadow = '0 0 16px rgba(47,224,240,0.25)' }}
                  onBlur={e => { e.currentTarget.style.borderColor = 'rgba(47,224,240,0.25)'; e.currentTarget.style.boxShadow = 'none' }}
                />
                <button onClick={startTrial} disabled={trialBusy || !trialEmail.includes('@')}
                  className="w-full rounded-lg py-3 text-sm font-bold uppercase tracking-widest border disabled:opacity-40 transition-all"
                  style={{ borderColor: AQUA, color: AQUA, background: 'rgba(47,224,240,0.08)' }}>
                  {trialBusy ? 'Creating your key…' : 'Try free'}
                </button>
              </div>
              {trialMsg && <p className="text-xs text-white/55 mt-3 text-center">{trialMsg}</p>}
            </div>

            <p className="text-xs text-white/30 mt-6">Pricing below — or <a href="/contact" className="underline hover:text-white">get in touch</a>.</p>
          </div>
        ) : (
          <>
            <div ref={chatRef} className="flex-1 rounded-2xl border p-4 sm:p-6 overflow-y-auto overscroll-contain mb-4"
              style={{ minHeight: 320, height: 'calc(100vh - 380px)', background: 'rgba(3,10,16,0.86)', borderColor: 'rgba(47,224,240,0.22)', backdropFilter: 'blur(2px)', boxShadow: 'inset 0 0 40px rgba(47,224,240,0.04)' }}>
              {msgs.length === 0 && (
                <div className="text-center mt-10">
                  <p className="text-sm text-white/35 mb-6">
                    Hey there — what are we working on today?
                  </p>
                  <div className="flex flex-wrap justify-center gap-2 px-2">
                    {CHIPS.map(c => (
                      <button key={c} onClick={() => send(c)}
                        className="text-xs px-3 py-2 rounded-full border transition-all hover:text-white"
                        style={{ borderColor: 'rgba(47,224,240,0.25)', color: 'rgba(255,255,255,0.55)' }}
                        onMouseEnter={e => { e.currentTarget.style.borderColor = AQUA; e.currentTarget.style.boxShadow = '0 0 14px rgba(47,224,240,0.2)' }}
                        onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(47,224,240,0.25)'; e.currentTarget.style.boxShadow = 'none' }}>
                        {c}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              {msgs.map((m, i) => (
                <div key={i} className={`mb-4 flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className="max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap break-words [overflow-wrap:anywhere] border"
                    style={m.role === 'assistant'
                      ? { background: 'rgba(232,199,122,0.10)', borderColor: 'rgba(232,199,122,0.32)', boxShadow: '0 0 18px rgba(232,199,122,0.10)' }
                      : { background: 'rgba(47,224,240,0.09)', borderColor: 'rgba(47,224,240,0.28)' }}>
                    {m.role === 'assistant' && (
                      <div className="flex items-center justify-between mb-1">
                        <p className="text-[10px] font-bold uppercase tracking-widest" style={{ color: '#E8C77A' }}>Coach Nate</p>
                        <div className="flex items-center gap-1.5 ml-3">
                          <button onClick={() => navigator.clipboard?.writeText(m.content)}
                            className="text-[10px] px-2 py-0.5 rounded-full border border-white/15 text-white/40 hover:text-white/80 transition-colors">
                            📋 Copy
                          </button>
                          {member?.voice_enabled && (
                            <button onClick={() => { unlockAudio(); speak(m.content, i) }}
                              className="text-[10px] px-2 py-0.5 rounded-full border transition-colors"
                              style={playingIdx === i
                                ? { borderColor: AQUA, color: AQUA, boxShadow: '0 0 12px rgba(47,224,240,0.3)' }
                                : { borderColor: 'rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.4)' }}>
                              {playingIdx === i ? '⏸ Playing…' : '🔊 Replay'}
                            </button>
                          )}
                        </div>
                      </div>
                    )}
                    {m.content}
                  </div>
                </div>
              ))}
              {busy && (
                <div className="flex items-center gap-2 text-xs" style={{ color: AQUA }}>
                  <span className="think-dot" style={{ animationDelay: '0s' }}>●</span>
                  <span className="think-dot" style={{ animationDelay: '0.15s' }}>●</span>
                  <span className="think-dot" style={{ animationDelay: '0.3s' }}>●</span>
                  <span className="text-white/35 ml-1">Coach Nate is thinking…</span>
                </div>
              )}
              <div ref={endRef} />
            </div>
            {error && <p className="text-xs text-red-400 mb-3">{error}</p>}
            <div className="flex gap-2">
              <textarea
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send() } }}
                placeholder="Ask Coach Nate…"
                rows={2}
                className="flex-1 rounded-xl bg-black/70 border px-4 py-3 text-sm resize-none focus:outline-none transition-colors"
                style={{ borderColor: 'rgba(47,224,240,0.25)' }}
                onFocus={e => { e.currentTarget.style.borderColor = AQUA; e.currentTarget.style.boxShadow = '0 0 16px rgba(47,224,240,0.22)' }}
                onBlur={e => { e.currentTarget.style.borderColor = 'rgba(47,224,240,0.25)'; e.currentTarget.style.boxShadow = 'none' }}
              />
              {speaking && (
                <button onClick={() => { audioRef.current?.pause(); setSpeaking(false); setPlayingIdx(null) }}
                  className="rounded-xl px-4 text-sm font-bold border border-red-400/50 text-red-300">
                  ⏹ Stop
                </button>
              )}
              <button onClick={() => send()} disabled={busy || !input.trim()}
                className="rounded-xl px-5 text-sm font-bold text-black disabled:opacity-40 transition-all hover:brightness-110"
                style={{ ...neon, boxShadow: '0 0 18px rgba(47,224,240,0.3)' }}>
                Send
              </button>
            </div>
            <div className="flex flex-wrap items-center justify-end gap-2 mt-3 self-end">
              <button onClick={async (e) => {
                (e.currentTarget as HTMLButtonElement).blur()
                const text = "Coach Nate — 20 years of World Championship coaching, on call. Free to try: https://www.blackdiamondlabs.co.nz/coach-nate"
                try {
                  if (navigator.share) await navigator.share({ text })
                  else { await navigator.clipboard.writeText(text); setError('Link copied — send it to a mate.'); setTimeout(() => setError(''), 3000) }
                } catch {}
              }}
                className="text-xs px-4 py-1.5 rounded-full border transition-colors"
                style={{ borderColor: 'rgba(47,224,240,0.45)', color: AQUA }}>Tell a mate</button>
              <button onClick={(e) => { (e.currentTarget as HTMLButtonElement).blur(); setMsgs([]); try { sessionStorage.removeItem('bdai-chat') } catch {}; window.scrollTo({ top: 0 }) }}
                className="text-xs px-4 py-1.5 rounded-full border border-white/30 text-white/70 hover:text-white hover:border-white/60 transition-colors">New chat</button>
              <button onClick={signOut} className="text-xs px-4 py-1.5 rounded-full border border-white/30 text-white/70 hover:text-white hover:border-white/60 transition-colors">Sign out</button>
            </div>

            {member?.tier !== 'trial' && (
            <div className="mt-6 rounded-2xl border p-4" style={{ borderColor: 'rgba(47,224,240,0.2)', background: 'rgba(6,20,28,0.5)' }}>
              <p className="text-xs font-bold" style={{ color: AQUA }}>Member downloads</p>
              <p className="text-[11px] text-white/35 mb-1">New tools added monthly.</p>
              {DOWNLOADS.map(d => (
                <div key={d.slug} className="flex items-center justify-between py-2" style={{ borderTop: '1px solid rgba(47,224,240,0.12)' }}>
                  <div className="pr-3">
                    <p className="text-xs text-white/80 font-semibold">{d.title}</p>
                    <p className="text-[11px] text-white/40">{d.desc}</p>
                  </div>
                  <button onClick={() => download(d.slug, d.file)}
                    className="text-xs px-4 py-2 rounded-lg border shrink-0 transition-colors"
                    style={{ borderColor: 'rgba(47,224,240,0.35)', color: 'rgba(255,255,255,0.65)' }}>
                    ⬇ Download
                  </button>
                </div>
              ))}
            </div>
            )}
          </>
        )}

        {/* Pricing */}
        <div className="mt-16" style={{ display: apiKey ? 'none' : undefined }}>
          <p className="text-xs font-bold uppercase tracking-[0.35em] mb-2 text-center" style={{ color: AQUA, textShadow: '0 0 14px rgba(47,224,240,0.45)' }}>Price of Greatness</p>
          <h2 className="text-2xl sm:text-3xl font-black text-center mb-2">Back the Coach. Lock your rate.</h2>
          <div className="flex justify-center gap-2 mb-3">
            {MARKETS.map(mk => (
              <button key={mk.id} onClick={() => setMarket(mk.id)}
                className="rounded-full px-3 py-1.5 text-xs font-bold border transition-all"
                style={market === mk.id
                  ? { borderColor: AQUA, color: '#fff', background: 'rgba(47,224,240,0.14)', boxShadow: '0 0 14px rgba(47,224,240,0.25)' }
                  : { borderColor: 'rgba(255,255,255,0.12)', color: 'rgba(255,255,255,0.4)', background: 'transparent' }}>
                {mk.flag} {mk.label}
              </button>
            ))}
          </div>
          <p className="text-xs text-white/40 text-center mb-10">{MARKETS.find(mk => mk.id === market)!.note} Annual = two months free. Fair Use Policy applies to keep Coach Nate fast for everyone.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {TIERS.map(t => {
              const cur = MARKETS.find(mk => mk.id === market)!.cur
              const p = PRICES[market][t.id]
              const links = STRIPE[market][t.id as keyof typeof STRIPE['nz']]
              return (
                <div key={t.id} className="rounded-2xl border p-6 flex flex-col transition-all"
                  style={{ borderColor: 'rgba(47,224,240,0.18)', background: 'rgba(4,14,22,0.55)' }}>
                  <h3 className="font-black text-lg">{t.name}</h3>
                  <p className="text-xs text-white/40 mt-1 mb-4 flex-1">{t.blurb}</p>
                  <p className="text-3xl font-black">{cur}{p.m.toLocaleString()}<span className="text-sm font-semibold text-white/40">/mo</span></p>
                  <p className="text-xs text-white/40 mb-1">or <a href={links.a} className="underline hover:text-white/70" style={{ textDecorationColor: AQUA_DIM }}>{cur}{p.a.toLocaleString()}/yr</a></p>
                  <p className="text-[11px] mb-4" style={{ color: AQUA }}>{t.fair}</p>
                  <a href={links.m}
                    className="rounded-lg py-2.5 text-center text-xs font-bold uppercase tracking-widest text-black" style={{ background: (t as any).btn, backgroundSize: '200% auto', animation: 'shimmer 3s linear infinite' }}>
                    Subscribe
                  </a>
                </div>
              )
            })}
          </div>
        </div>
        {/* Get the App */}
        <div className="mt-16 max-w-2xl mx-auto">
          <p className="text-xs font-bold uppercase tracking-[0.35em] mb-2 text-center" style={{ color: AQUA, textShadow: '0 0 14px rgba(47,224,240,0.45)' }}>Get the App</p>
          <h2 className="text-2xl font-black text-center mb-2">Coach Nate on your home screen.</h2>
          <p className="text-xs text-white/40 text-center mb-8">No app store needed — add the site to your phone and it opens like an app, straight to Coach Nate.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-white/60">
            <div className="rounded-2xl border p-6" style={{ borderColor: 'rgba(47,224,240,0.18)', background: 'rgba(4,14,22,0.55)' }}>
              <h3 className="font-black text-white mb-3">iPhone / iPad</h3>
              <p className="mb-2"><span className="text-white/90 font-semibold">Add:</span> Open this page in Safari → tap the Share button (square with arrow) → scroll and tap <span className="text-white/90">Add to Home Screen</span> → Add.</p>
              <p><span className="text-white/90 font-semibold">Remove:</span> Press and hold the Coach Nate icon → <span className="text-white/90">Remove App</span> → Delete from Home Screen. Your subscription is not affected.</p>
            </div>
            <div className="rounded-2xl border p-6" style={{ borderColor: 'rgba(47,224,240,0.18)', background: 'rgba(4,14,22,0.55)' }}>
              <h3 className="font-black text-white mb-3">Android</h3>
              <p className="mb-2"><span className="text-white/90 font-semibold">Add:</span> Open this page in Chrome → tap the ⋮ menu → <span className="text-white/90">Add to Home screen</span> (or "Install app") → Add.</p>
              <p><span className="text-white/90 font-semibold">Remove:</span> Press and hold the icon → <span className="text-white/90">Uninstall</span> (or drag to Remove). Your subscription is not affected.</p>
            </div>
          </div>
        </div>
      </section>
      {!apiKey && <div className="relative z-10"><Footer /></div>}
    </main>
  )
}