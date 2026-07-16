'use client'
import React, { useEffect, useRef, useState } from 'react'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

const API = 'https://api.blackdiamondlabs.co.nz'
const KEY_STORE = 'bdai-member-key'
const VOICE_STORE = 'bdai-voice-on'
// Stripe Payment Links — paste each URL between the quotes when created; empty = button goes to /contact
const STRIPE = { member: 'https://buy.stripe.com/test_aFa9ASarL4719uT36K53O00', team: 'https://buy.stripe.com/test_bJe9ASfM5avpePd0YC53O01', club: 'https://buy.stripe.com/test_28EfZg7fzavp6iH8r453O02', assoc: 'https://buy.stripe.com/test_00wfZg1Vf4714azbDg53O03' }

const TIERS = [
  { id: 'member', btn: 'linear-gradient(90deg,#0F7A4D,#34D399,#A7F3D0,#34D399,#0F7A4D)', name: 'Opening Day Patron', monthly: 29, annual: 290, blurb: 'Opening special — rate locked for life. Moves to Individual at $40/mo · $400/yr.', fair: '40 questions per day' },
  { id: 'team', btn: 'linear-gradient(90deg,#8C5A2B,#CD7F32,#F0C08A,#CD7F32,#8C5A2B)', name: 'Team', monthly: 59, annual: 590, blurb: 'One coaching staff, one squad. Shared access for your team.', fair: '3 member keys' },
  { id: 'club', btn: 'linear-gradient(90deg,#9AA4B2,#C7CEDA,#F4F7FB,#C7CEDA,#9AA4B2)', name: 'Club', monthly: 99, annual: 990, blurb: 'Club development pathways and Elite coaching aide always on hand.', fair: '5 member keys' },
  { id: 'assoc', btn: 'linear-gradient(90deg,#B8860B,#FFD700,#FFF3C4,#FFD700,#B8860B)', name: 'Association', monthly: 225, annual: 2250, blurb: 'Tool kit must have for Representative Coaches and Development Officers.', fair: '15 member keys' },
]

type Msg = { role: 'user' | 'assistant'; content: string }
type Member = { label: string; tier: string; voice_enabled: boolean }

export default function CoachNate() {
  const [apiKey, setApiKey] = useState('')
  const [member, setMember] = useState<Member | null>(null)
  const [online, setOnline] = useState<'checking' | 'online' | 'offline'>('checking')
  const [healthNote, setHealthNote] = useState('')
  const [jsAlive, setJsAlive] = useState(false)
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
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    setJsAlive(true)
    const onErr = (e: ErrorEvent) => setPageError(String(e.message || e.error || 'Unknown page error'))
    window.addEventListener('error', onErr)
    try { if (localStorage.getItem(VOICE_STORE) === '1') setVoiceOn(true) } catch {}
    // Restore a saved key and re-validate it so `member` is populated on return visits.
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
      .then(r => { setOnline(r.ok ? 'online' : 'offline'); if (!r.ok) setHealthNote('HTTP ' + r.status) })
      .catch(e => { setOnline('offline'); setHealthNote(e.name === 'AbortError' ? 'timed out' : String(e.message || e)) })
      .finally(() => clearTimeout(t))
    return () => window.removeEventListener('error', onErr)
  }, [])

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [msgs, busy])

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
        x.fillStyle = i % 9 === 0 ? '#E8C77A' : '#C7CEDA'
        x.fillText(chars[Math.floor(Math.random() * chars.length)], i * fs, drops[i] * fs)
        if (drops[i] * fs > c.height && Math.random() > 0.975) drops[i] = 0
        drops[i]++
      }
    }, 55)
    return () => { clearInterval(t); window.removeEventListener('resize', fit) }
  }, [apiKey])

  const saveKey = async () => {
    const k = (keyRef.current?.value || '').trim()   // read the DOM directly: autofill-proof
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
    } catch (e) {
      setError("Can't reach Coach Nate — connection issue, not your key. Check your internet and try again.")
    }
  }

  const signOut = () => {
    setApiKey(''); setMsgs([]); setMember(null)
    audioRef.current?.pause()
    try { localStorage.removeItem(KEY_STORE) } catch {}
  }

  const toggleVoice = () => {
    unlockAudio()                       // tap = user gesture; primes audio for later autoplay
    setVoiceOn(v => {
      const next = !v
      try { localStorage.setItem(VOICE_STORE, next ? '1' : '0') } catch {}
      if (!next) { audioRef.current?.pause(); setSpeaking(false) }
      return next
    })
  }

  // Prime the audio element on a real user gesture so mobile browsers allow later playback.
  const unlockAudio = () => {
    try {
      if (!audioRef.current) audioRef.current = new Audio()
      const a = audioRef.current
      a.muted = true
      a.play().then(() => { a.pause(); a.muted = false }).catch(() => { a.muted = false })
    } catch {}
  }

  const speakBusy = useRef(false)
  const speak = async (text: string, idx: number | null = null) => {
    if (speakBusy.current) return            // ignore taps while a fetch is in flight
    // Tapping the message that's already playing = stop it
    if (idx !== null && playingIdx === idx && speaking) {
      audioRef.current?.pause()
      setPlayingIdx(null)
      return
    }
    speakBusy.current = true
    try {
      audioRef.current?.pause()              // stop anything currently playing first
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

  const send = async () => {
    const message = input.trim()
    if (!message || busy) return
    if (voiceOn) unlockAudio()          // re-prime on the send tap for reliable reply playback
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

  const gold: React.CSSProperties = { background: 'linear-gradient(90deg,#B8860B,#FFD700,#FFF3C4,#FFD700,#B8860B)', backgroundSize: '200% auto', animation: 'shimmer 3s linear infinite' }

  return (
    <main className="min-h-screen bg-black text-white flex flex-col relative">
      {apiKey && <canvas id="bdai-rain" className="fixed inset-0 w-full h-full" style={{ opacity: 0.16, pointerEvents: 'none' }} />}
      <Nav />
      {!apiKey && (
        <div className="fixed inset-0 z-0">
          <img src="/about-bg.jpeg" alt="" className="w-full h-full object-cover object-[70%_30%]" />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.88) 55%, #000 100%)' }} />
        </div>
      )}
      <section className="relative z-10 flex-1 flex flex-col pt-28 pb-10 px-4 sm:px-8 max-w-3xl mx-auto w-full">
        {pageError && (
          <div className="mb-4 rounded-lg border border-red-500/40 bg-red-500/10 px-4 py-3 text-xs text-red-300">
            Page error: {pageError}
          </div>
        )}
        <div className="mb-6 text-center">
          <p className="text-xs font-bold uppercase tracking-[0.35em] mb-2" style={{ color: '#E8C77A' }}>Black Diamond AI</p>
          <h1 className={apiKey ? "text-2xl font-black" : "text-4xl sm:text-5xl font-black"}>
            Coach <span style={{ background: 'linear-gradient(90deg,#B8860B,#FFD700,#FFF3C4,#FFD700,#B8860B)', backgroundSize: '200% auto', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', animation: 'shimmer 3s linear infinite' }}>Nate</span>
          </h1>
          {!apiKey && <p className="text-sm text-white/40 mt-3">Game plans. Training. In-game calls. The mental side. Ask like you would at the diamond.</p>}
          <p className="text-xs mt-2" style={{ color: online === 'offline' ? '#f87171' : online === 'online' ? '#4ade80' : '#facc15' }}>
            {online === 'checking' ? '' : online === 'online' ? '● Online' : '● Service resting — chat may be unavailable'}
          </p>
          {apiKey && member?.voice_enabled && (
            <button onClick={toggleVoice}
              className="text-xs mt-3 px-3 py-1 rounded-full border transition-colors"
              style={{ borderColor: voiceOn ? '#4ade80' : '#ffffff30', color: voiceOn ? '#4ade80' : '#ffffff60' }}>
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
          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-8 max-w-md mx-auto w-full text-center">
            <h2 className="text-lg font-black mb-2">Members</h2>
            <p className="text-sm text-white/40 mb-6">Enter your member key to talk with Coach Nate.</p>
            <input
              ref={keyRef}
              type="password"
              autoComplete="off"
              onKeyDown={e => e.key === 'Enter' && saveKey()}
              placeholder="Your access key"
              className="w-full rounded-lg bg-black border border-white/15 px-4 py-3 text-sm mb-4 focus:outline-none focus:border-white/40"
            />
            <button onClick={saveKey} className="w-full rounded-lg py-3 text-sm font-bold uppercase tracking-widest text-black" style={gold}>
              Enter
            </button>
            {error && <p className="text-xs text-red-400 mt-3">{error}</p>}
            <p className="text-xs text-white/30 mt-6">Not a member yet? Pricing below — or <a href="/contact" className="underline hover:text-white">get in touch</a>.</p>
          </div>
        ) : (
          <>
            <div className="flex-1 rounded-2xl border border-white/15 p-4 sm:p-6 overflow-y-auto mb-4"  style={{ minHeight: 320, height: apiKey ? 'calc(100vh - 330px)' : undefined, background: 'rgba(5,5,8,0.82)', backdropFilter: 'blur(2px)' }}>
              {msgs.length === 0 && (
                <p className="text-sm text-white/30 text-center mt-12">
                  Hey there — what are we working on today? Batting order, a spiralling hitter, game plan for the weekend?
                </p>
              )}
              {msgs.map((m, i) => (
                <div key={i} className={`mb-4 flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap ${m.role === 'user' ? 'bg-white/15 border border-white/10' : 'border'}`}
                    style={m.role === 'assistant' ? { background: 'rgba(232,199,122,0.12)', borderColor: 'rgba(232,199,122,0.35)', boxShadow: '0 0 18px rgba(232,199,122,0.12)' } : undefined}>
                    {m.role === 'assistant' && (
                      <div className="flex items-center justify-between mb-1">
                        <p className="text-[10px] font-bold uppercase tracking-widest" style={{ color: '#E8C77A' }}>Coach Nate</p>
                        {member?.voice_enabled && (
                          <button onClick={() => { unlockAudio(); speak(m.content, i) }}
                            className={`text-[10px] px-2 py-0.5 rounded-full border transition-colors ml-3 ${
                              playingIdx === i
                                ? 'border-green-400/70 text-green-300'
                                : 'border-white/15 text-white/40 hover:text-white/80'
                            }`}>
                            {playingIdx === i ? '⏸ Playing…' : '🔊 Replay'}
                          </button>
                        )}
                      </div>
                    )}
                    {m.content}
                  </div>
                </div>
              ))}
              {busy && <p className="text-xs text-white/30 animate-pulse">Coach Nate is thinking…</p>}
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
                className="flex-1 rounded-xl bg-black border border-white/15 px-4 py-3 text-sm resize-none focus:outline-none focus:border-white/40"
              />
              {speaking && (
                <button onClick={() => { audioRef.current?.pause(); setSpeaking(false) }}
                  className="rounded-xl px-4 text-sm font-bold border border-red-400/50 text-red-300">
                  ⏹ Stop
                </button>
              )}
              <button onClick={send} disabled={busy || !input.trim()} className="rounded-xl px-5 text-sm font-bold text-black disabled:opacity-40" style={gold}>
                Send
              </button>
            </div>
            <button onClick={signOut} className="text-xs text-white/25 hover:text-white/60 mt-3 self-end transition-colors">Sign out</button>
          </>
        )}

        {/* Pricing */}
        <div className="mt-16" style={{ display: apiKey ? 'none' : undefined }}>
          <p className="text-xs font-bold uppercase tracking-[0.35em] mb-2 text-center" style={{ color: '#E8C77A' }}>Price of Greatness</p>
          <h2 className="text-2xl sm:text-3xl font-black text-center mb-2">Back the Coach. Lock your rate.</h2>
          <p className="text-xs text-white/40 text-center mb-10">All prices NZD. Annual = two months free. Fair Use Policy applies to keep Coach Nate fast for everyone.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {TIERS.map(t => (
              <div key={t.id} className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 flex flex-col">
                <h3 className="font-black text-lg">{t.name}</h3>
                <p className="text-xs text-white/40 mt-1 mb-4 flex-1">{t.blurb}</p>
                <p className="text-3xl font-black">${t.monthly}<span className="text-sm font-semibold text-white/40">/mo</span></p>
                <p className="text-xs text-white/40 mb-1">or ${t.annual}/yr</p>
                <p className="text-[11px] mb-4" style={{ color: '#E8C77A' }}>{t.fair}</p>
                <a href={STRIPE[t.id as keyof typeof STRIPE] || '/contact'}
                  className="rounded-lg py-2.5 text-center text-xs font-bold uppercase tracking-widest text-black" style={{ background: (t as any).btn, backgroundSize: '200% auto', animation: 'shimmer 3s linear infinite' }}>
                  {STRIPE[t.id as keyof typeof STRIPE] ? 'Subscribe' : 'Get in touch'}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>
      {!apiKey && <Footer />}
    </main>
  )
}