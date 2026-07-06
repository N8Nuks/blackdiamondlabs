'use client'
import React, { useEffect, useRef, useState } from 'react'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

const API = 'https://api.blackdiamondlabs.co.nz'
const KEY_STORE = 'bdai-member-key'
// Stripe Payment Links — paste each URL between the quotes when created; empty = button goes to /contact
const STRIPE = { member: '', team: '', club: '', assoc: '' }

const TIERS = [
  { id: 'member', btn: 'linear-gradient(90deg,#0F7A4D,#34D399,#A7F3D0,#34D399,#0F7A4D)', name: 'Opening Day Patron', monthly: 29, annual: 290, blurb: 'Opening special — rate locked for life. Moves to Individual at $40/mo · $400/yr.', fair: '40 questions per day' },
  { id: 'team', btn: 'linear-gradient(90deg,#8C5A2B,#CD7F32,#F0C08A,#CD7F32,#8C5A2B)', name: 'Team', monthly: 59, annual: 590, blurb: 'One coaching staff, one squad. Shared access for your team.', fair: '3 member keys' },
  { id: 'club', btn: 'linear-gradient(90deg,#9AA4B2,#C7CEDA,#F4F7FB,#C7CEDA,#9AA4B2)', name: 'Club', monthly: 99, annual: 990, blurb: 'Club development pathways and Elite coaching aide always on hand.', fair: '5 member keys' },
  { id: 'assoc', btn: 'linear-gradient(90deg,#B8860B,#FFD700,#FFF3C4,#FFD700,#B8860B)', name: 'Association', monthly: 225, annual: 2250, blurb: 'Tool kit must have for Representative Coaches and Development Officers.', fair: '15 member keys' },
]

type Msg = { role: 'user' | 'assistant'; content: string }

export default function CoachNate() {
  const [apiKey, setApiKey] = useState('')
  const [online, setOnline] = useState<'checking' | 'online' | 'offline'>('checking')
  const [healthNote, setHealthNote] = useState('')
  const [jsAlive, setJsAlive] = useState(false)
  const [pageError, setPageError] = useState('')
  const [msgs, setMsgs] = useState<Msg[]>([])
  const [input, setInput] = useState('')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const keyRef = useRef<HTMLInputElement>(null)
  const endRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setJsAlive(true)
    const onErr = (e: ErrorEvent) => setPageError(String(e.message || e.error || 'Unknown page error'))
    window.addEventListener('error', onErr)
    try { const k = localStorage.getItem(KEY_STORE); if (k) setApiKey(k) } catch {}
    const ctrl = new AbortController()
    const t = setTimeout(() => ctrl.abort(), 6000)
    fetch(API + '/health', { signal: ctrl.signal })
      .then(r => { setOnline(r.ok ? 'online' : 'offline'); if (!r.ok) setHealthNote('HTTP ' + r.status) })
      .catch(e => { setOnline('offline'); setHealthNote(e.name === 'AbortError' ? 'timed out' : String(e.message || e)) })
      .finally(() => clearTimeout(t))
    return () => window.removeEventListener('error', onErr)
  }, [])

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [msgs, busy])

  const saveKey = () => {
    const k = (keyRef.current?.value || '').trim()   // read the DOM directly: autofill-proof
    if (!k) { setError('Type or paste your key first.'); return }
    setApiKey(k)
    try { localStorage.setItem(KEY_STORE, k) } catch {}
    setError('')
  }

  const signOut = () => {
    setApiKey(''); setMsgs([])
    try { localStorage.removeItem(KEY_STORE) } catch {}
  }

  const send = async () => {
    const message = input.trim()
    if (!message || busy) return
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
    } catch (e) {
      setError('Could not reach Black Diamond AI (' + String((e as Error).message || e) + '). Check your connection and try again.')
    } finally {
      setBusy(false)
    }
  }

  const gold: React.CSSProperties = { background: 'linear-gradient(90deg,#C7CEDA,#F4F7FB)' }

  return (
    <main className="min-h-screen bg-black text-white flex flex-col">
      <Nav />
      <section className="flex-1 flex flex-col pt-28 pb-10 px-4 sm:px-8 max-w-3xl mx-auto w-full">
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
            {online === 'checking' ? '● Checking service…' : online === 'online' ? '● Online' : '● Offline (' + healthNote + ')'}
            {!jsAlive && ' — page still waking up'}
          </p>
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
            <div className="flex-1 rounded-2xl border border-white/10 bg-white/[0.015] p-4 sm:p-6 overflow-y-auto mb-4" style={{ minHeight: 320, height: apiKey ? 'calc(100vh - 330px)' : undefined }}>
              {msgs.length === 0 && (
                <p className="text-sm text-white/30 text-center mt-12">
                  Kia ora — what are we working on today? Batting order, a spiralling hitter, game plan for the weekend?
                </p>
              )}
              {msgs.map((m, i) => (
                <div key={i} className={`mb-4 flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap ${m.role === 'user' ? 'bg-white/10' : 'border border-white/10'}`}
                    style={m.role === 'assistant' ? { background: 'rgba(232,199,122,0.06)' } : undefined}>
                    {m.role === 'assistant' && <p className="text-[10px] font-bold uppercase tracking-widest mb-1" style={{ color: '#E8C77A' }}>Coach Nate</p>}
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
      <Footer />
    </main>
  )
}
