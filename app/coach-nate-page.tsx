'use client'
import React, { useEffect, useRef, useState } from 'react'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

const API = 'https://api.blackdiamondlabs.co.nz'
const KEY_STORE = 'bdai-member-key'

type Msg = { role: 'user' | 'assistant'; content: string }

export default function CoachNate() {
  const [apiKey, setApiKey] = useState('')
  const [keyInput, setKeyInput] = useState('')
  const [online, setOnline] = useState<boolean | null>(null)
  const [msgs, setMsgs] = useState<Msg[]>([])
  const [input, setInput] = useState('')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const endRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    try { const k = localStorage.getItem(KEY_STORE); if (k) setApiKey(k) } catch {}
    fetch(API + '/health').then(r => setOnline(r.ok)).catch(() => setOnline(false))
  }, [])

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [msgs, busy])

  const saveKey = () => {
    const k = keyInput.trim()
    if (!k) return
    setApiKey(k)
    try { localStorage.setItem(KEY_STORE, k) } catch {}
    setKeyInput('')
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
      if (!r.ok) { setError('Coach Nate is having trouble right now (' + r.status + '). Try again shortly.'); return }
      const data = await r.json()
      setMsgs(m => [...m, { role: 'assistant', content: data.reply }])
    } catch {
      setError('Could not reach Black Diamond AI. Check your connection and try again.')
    } finally {
      setBusy(false)
    }
  }

  return (
    <main className="min-h-screen bg-black text-white flex flex-col">
      <Nav />
      <section className="flex-1 flex flex-col pt-28 pb-10 px-4 sm:px-8 max-w-3xl mx-auto w-full">
        <div className="mb-6 text-center">
          <p className="text-xs font-bold uppercase tracking-[0.35em] mb-2" style={{ color: '#E8C77A' }}>Black Diamond AI</p>
          <h1 className="text-4xl sm:text-5xl font-black">
            Coach <span style={{ background: 'linear-gradient(90deg,#B8860B,#FFD700,#FFF3C4,#FFD700,#B8860B)', backgroundSize: '200% auto', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', animation: 'shimmer 3s linear infinite' }}>Nate</span>
          </h1>
          <p className="text-sm text-white/40 mt-3">
            Game plans. Training. In-game calls. The mental side. Ask like you would at the diamond.
          </p>
          <p className="text-xs mt-2" style={{ color: online === false ? '#f87171' : '#4ade80' }}>
            {online === null ? 'Checking service…' : online ? '● Online' : '● Offline — try again soon'}
          </p>
        </div>

        {!apiKey ? (
          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-8 max-w-md mx-auto w-full text-center">
            <h2 className="text-lg font-black mb-2">Founding Members</h2>
            <p className="text-sm text-white/40 mb-6">Enter your member key to talk with Coach Nate.</p>
            <input
              type="password"
              value={keyInput}
              onChange={e => setKeyInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && saveKey()}
              placeholder="Your access key"
              className="w-full rounded-lg bg-black border border-white/15 px-4 py-3 text-sm mb-4 focus:outline-none focus:border-white/40"
            />
            <button onClick={saveKey}
              className="w-full rounded-lg py-3 text-sm font-bold uppercase tracking-widest text-black"
              style={{ background: 'linear-gradient(90deg,#E8C77A,#FFD700)' }}>
              Enter
            </button>
            <p className="text-xs text-white/30 mt-6">
              Not a member yet? <a href="/contact" className="underline hover:text-white">Get in touch</a> about Founding Membership.
            </p>
          </div>
        ) : (
          <>
            <div className="flex-1 rounded-2xl border border-white/10 bg-white/[0.015] p-4 sm:p-6 overflow-y-auto mb-4" style={{ minHeight: 320, maxHeight: '55vh' }}>
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
              <button onClick={send} disabled={busy || !input.trim()}
                className="rounded-xl px-5 text-sm font-bold text-black disabled:opacity-40"
                style={{ background: 'linear-gradient(90deg,#E8C77A,#FFD700)' }}>
                Send
              </button>
            </div>
            <button onClick={signOut} className="text-xs text-white/25 hover:text-white/60 mt-3 self-end transition-colors">
              Sign out
            </button>
          </>
        )}
      </section>
      <Footer />
    </main>
  )
}
