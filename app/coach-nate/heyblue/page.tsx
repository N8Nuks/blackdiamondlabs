'use client'
import React, { useEffect, useRef, useState } from 'react'
import Nav from '@/components/Nav'

const API = 'https://api.blackdiamondlabs.co.nz'
const KEY_STORE = 'bdai-member-key'
const CARDS_STORE = 'bdai-blue-cards'
const MINE_STORE = 'bdai-blue-mine'
const AQUA = '#2FE0F0'
const GOLD = '#E8C77A'
const MAX_Q = 480

type Written = { rule: string; text: string }
type Section = { h: string; items: string[] }
type Big = { label: string; value: string; sub: string }
type Card = { id: string; title: string; icon: string; gold: boolean; one: string; line?: string; note?: string; big?: Big[]; sections: Section[]; tip: string; rules: string; written: Written[] }
type Item = { id: number; kind: 'card' | 'answer'; card_id: string | null; title: string | null; body: string | null }
type Turn = { q: string; a: string; saved?: boolean }
type View = { name: 'home' } | { name: 'card'; id: string } | { name: 'saved'; id: number } | { name: 'ask' }

const ICONS: Record<string, string> = { clock: '⏱', flag: '🚩', home: '🏠', run: '🏃', message: '💬' }
const box: React.CSSProperties = { borderColor: 'rgba(47,224,240,0.22)', background: 'rgba(3,10,16,0.86)' }
const goldBox: React.CSSProperties = { borderColor: 'rgba(232,199,122,0.35)', background: 'rgba(232,199,122,0.08)' }
const neon: React.CSSProperties = { background: 'linear-gradient(90deg,#1B6E8C,#2FE0F0,#BDF6FF,#2FE0F0,#1B6E8C)' }
const H = (k: string) => ({ Authorization: 'Bearer ' + k })
const JH = (k: string) => ({ ...H(k), 'Content-Type': 'application/json' })
const load = <T,>(key: string, fallback: T): T => { try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : fallback } catch { return fallback } }
const keep = (key: string, v: unknown) => { try { localStorage.setItem(key, JSON.stringify(v)) } catch {} }

// Blue answers in three labelled parts; fall back to plain text if it answers another way.
function parts(reply: string) {
  const m = reply.match(/^RULING:\s*([\s\S]*?)\n+\s*(RULE\b[^:\n]*):\s*([\s\S]*?)\n+\s*QUICK READ:\s*([\s\S]*)$/)
  return m ? { ruling: m[1].trim(), ruleNo: m[2].trim(), rule: m[3].trim(), quick: m[4].trim() } : null
}

// Helpers live OUTSIDE the page component so React keeps them mounted between keystrokes.
function Label({ t }: { t: string }) {
  return <p className="text-[10px] uppercase tracking-widest text-white/35 mb-1">{t}</p>
}
function Answer({ text }: { text: string }) {
  const p = parts(text)
  if (!p) return <p className="text-sm leading-relaxed whitespace-pre-wrap">{text}</p>
  return (
    <>
      <Label t="Ruling" />
      <p className="text-base font-black leading-snug mb-3">{p.ruling}</p>
      <Label t={p.ruleNo} />
      <p className="text-xs text-white/60 leading-relaxed whitespace-pre-wrap pl-3 mb-3" style={{ borderLeft: '2px solid rgba(47,224,240,0.35)' }}>{p.rule}</p>
      <Label t="Quick read" />
      <p className="text-sm leading-relaxed">{p.quick}</p>
    </>
  )
}
function Back({ onClick, label }: { onClick: () => void; label: string }) {
  return <button onClick={onClick} className="text-xs text-white/50 hover:text-white transition-colors">← {label}</button>
}

export default function HeyBlue() {
  const [apiKey, setApiKey] = useState('')
  const [gate, setGate] = useState<'loading' | 'nokey' | 'members' | 'ok'>('loading')
  const [cards, setCards] = useState<Card[]>([])
  const [mine, setMine] = useState<Item[]>([])
  const [cap, setCap] = useState(12)
  const [view, setView] = useState<View>({ name: 'home' })
  const [editing, setEditing] = useState(false)
  const [find, setFind] = useState('')
  const [showAll, setShowAll] = useState(false)
  const [showWritten, setShowWritten] = useState(false)
  const [input, setInput] = useState('')
  const [about, setAbout] = useState('')
  const [thread, setThread] = useState<Turn[]>([])
  const [busy, setBusy] = useState(false)
  const [msg, setMsg] = useState('')
  const [rename, setRename] = useState('')
  const endRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let k = ''
    try { k = localStorage.getItem(KEY_STORE) || '' } catch {}
    if (!k) { setGate('nokey'); return }
    setApiKey(k)
    // Show what this device already holds straight away, then refresh from the server.
    const cachedCards = load<{ cards: Card[] }>(CARDS_STORE, { cards: [] }).cards
    const cachedMine = load<Item[]>(MINE_STORE, [])
    if (cachedCards.length) { setCards(cachedCards); setMine(cachedMine); setGate('ok') }
    ;(async () => {
      const r = await fetch(API + '/v1/blue/cards', { headers: H(k) }).catch(() => null)
      if (!r) { if (!cachedCards.length) setGate('nokey'); return }   // offline: keep the cached copy
      if (r.status === 401) { setGate('nokey'); return }
      if (r.status === 403) { setGate('members'); return }
      if (!r.ok) { if (!cachedCards.length) setGate('nokey'); return }
      const d = await r.json()
      setCards(d.cards || []); keep(CARDS_STORE, d)
      setGate('ok')
      const m = await fetch(API + '/v1/blue/mine', { headers: H(k) }).catch(() => null)
      if (m && m.ok) { const md = await m.json(); setMine(md.items || []); setCap(md.cap || 12); keep(MINE_STORE, md.items || []) }
    })()
  }, [])

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' }) }, [thread, busy])

  const go = (v: View) => { setView(v); setShowAll(false); setShowWritten(false); setMsg(''); setEditing(false); window.scrollTo({ top: 0 }) }
  const flash = (t: string) => { setMsg(t); setTimeout(() => setMsg(''), 3500) }
  const gotMine = (d: { items: Item[]; cap?: number }) => { setMine(d.items || []); if (d.cap) setCap(d.cap); keep(MINE_STORE, d.items || []) }

  const mineCall = async (path: string, method: string, body?: unknown) => {
    const r = await fetch(API + '/v1/blue/mine' + path, { method, headers: JH(apiKey), body: body ? JSON.stringify(body) : undefined }).catch(() => null)
    if (!r) { flash('No connection. Try again when you have signal.'); return false }
    const d = await r.json().catch(() => ({}))
    if (!r.ok) { flash(d.detail || 'That did not save. Try again.'); return false }
    gotMine(d); return true
  }
  const pinned = (id: string) => mine.find(i => i.kind === 'card' && i.card_id === id)
  const togglePin = async (id: string) => {
    const it = pinned(id)
    if (it) await mineCall('/' + it.id, 'DELETE')
    else if (await mineCall('', 'POST', { kind: 'card', card_id: id })) flash('Pinned to My rules.')
  }
  const move = async (idx: number, dir: -1 | 1) => {
    const ids = mine.map(i => i.id); const j = idx + dir
    if (j < 0 || j >= ids.length) return
    ;[ids[idx], ids[j]] = [ids[j], ids[idx]]
    await mineCall('/order', 'POST', { ids })
  }

  const ask = async () => {
    const q = input.trim()
    if (!q || busy) return
    const message = (about ? 'About "' + about + '": ' : '') + q
    const history = thread.slice(-3).flatMap(t => [{ role: 'user', content: t.q }, { role: 'assistant', content: t.a }])
    setBusy(true); setMsg(''); setInput('')
    try {
      const r = await fetch(API + '/v1/blue/ask', { method: 'POST', headers: JH(apiKey), body: JSON.stringify({ message, history }) })
      const d = await r.json().catch(() => ({}))
      if (r.status === 401) { setGate('nokey'); return }
      if (!r.ok) { setMsg(d.detail || 'Blue missed that one. Try again shortly.'); setInput(q); return }
      setThread(t => [...t, { q, a: d.reply }])
    } catch { setMsg('No connection. Your pinned rules and quick calls still work.'); setInput(q) }
    finally { setBusy(false) }
  }
  const saveTurn = async (idx: number) => {
    const t = thread[idx]
    if (await mineCall('', 'POST', { kind: 'answer', title: t.q.slice(0, 120), body: t.a })) {
      setThread(th => th.map((x, i) => i === idx ? { ...x, saved: true } : x)); flash('Saved to My rules.')
    }
  }
  const openAsk = (topic: string) => { setAbout(topic); go({ name: 'ask' }) }

  const card = view.name === 'card' ? cards.find(c => c.id === view.id) : undefined
  const saved = view.name === 'saved' ? mine.find(i => i.id === view.id) : undefined
  const f = find.trim().toLowerCase()
  const grid = cards.filter(c => !pinned(c.id)).filter(c => !f || (c.title + ' ' + c.one + ' ' + c.sections.map(s => s.h + ' ' + s.items.join(' ')).join(' ')).toLowerCase().includes(f))

  const askBox = (
    <div>
      {about && (
        <p className="text-[11px] text-white/45 mb-1.5">About: <span style={{ color: AQUA }}>{about}</span> <button onClick={() => setAbout('')} className="ml-1 underline">clear</button></p>
      )}
      <div className="flex gap-2">
        <textarea value={input} onChange={e => setInput(e.target.value.slice(0, MAX_Q))} rows={2}
          onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); if (view.name !== 'ask') go({ name: 'ask' }); ask() } }}
          placeholder="Bases loaded, one out, pop-up to short…"
          className="flex-1 rounded-xl bg-black/70 border px-4 py-3 text-sm resize-none focus:outline-none" style={{ borderColor: 'rgba(47,224,240,0.25)' }} />
        <button onClick={() => { if (view.name !== 'ask') go({ name: 'ask' }); ask() }} disabled={busy || !input.trim()}
          className="rounded-xl px-5 text-sm font-bold text-black disabled:opacity-40" style={neon}>Ask</button>
      </div>
    </div>
  )

  return (
    <main className="min-h-screen bg-black text-white flex flex-col">
      <Nav />
      <section className="flex-1 pt-28 pb-12 px-4 sm:px-8 max-w-xl mx-auto w-full">
        <div className="mb-5 text-center">
          <p className="text-xs font-bold uppercase tracking-[0.35em] mb-1" style={{ color: AQUA }}>Black Diamond AI</p>
          <h1 className="text-2xl font-black">Hey <span style={{ color: AQUA }}>Blue!</span></h1>
          <p className="text-xs text-white/40 mt-1">The official rulebook, on call.</p>
        </div>

        {gate === 'loading' && <p className="text-center text-xs text-white/40">Calling Blue over…</p>}
        {gate === 'nokey' && (
          <div className="rounded-2xl border p-6 text-center" style={box}>
            <p className="text-sm mb-3">Sign in on the Coach Nate page first.</p>
            <a href="/coach-nate" className="text-xs underline" style={{ color: AQUA }}>Go to Coach Nate →</a>
          </div>
        )}
        {gate === 'members' && (
          <div className="rounded-2xl border p-6 text-center" style={box}>
            <p className="text-sm font-black mb-1">Members only.</p>
            <p className="text-xs text-white/50 mb-4">Hey Blue! is part of the subscription. Quick calls on the rules that start arguments, and the official rulebook on call for everything else.</p>
            <a href="/coach-nate" className="inline-block rounded-lg px-5 py-2.5 text-xs font-bold uppercase tracking-widest text-black" style={neon}>See membership</a>
          </div>
        )}

        {gate === 'ok' && view.name === 'home' && (
          <div className="flex flex-col gap-5">
            <a href="/coach-nate" className="text-xs text-white/50 hover:text-white transition-colors">← Coach Nate</a>

            {mine.length > 0 && (
              <div>
                <div className="flex items-baseline justify-between mb-1.5">
                  <p className="text-[10px] uppercase tracking-widest text-white/40">📌 My rules <span className="text-white/25">{mine.length}/{cap}</span></p>
                  <button onClick={() => setEditing(e => !e)} className="text-[11px] underline" style={{ color: AQUA }}>{editing ? 'Done' : 'Edit'}</button>
                </div>
                <div className="rounded-2xl border" style={{ ...box, borderColor: 'rgba(47,224,240,0.4)' }}>
                  {mine.map((it, idx) => {
                    const c = it.kind === 'card' ? cards.find(x => x.id === it.card_id) : undefined
                    if (it.kind === 'card' && !c) return null
                    const title = c ? c.title : it.title || 'Saved answer'
                    const sub = c ? c.one : 'Saved answer'
                    return (
                      <div key={it.id} className="flex items-center gap-3 px-4 py-3" style={{ borderTop: idx ? '1px solid rgba(47,224,240,0.12)' : undefined }}>
                        <button onClick={() => !editing && go(c ? { name: 'card', id: c.id } : { name: 'saved', id: it.id })} className="flex-1 flex items-center gap-3 text-left min-w-0">
                          <span className="text-lg shrink-0">{c ? ICONS[c.icon] || '📘' : '🔖'}</span>
                          <span className="min-w-0">
                            <span className="block text-sm font-bold truncate" style={{ color: c?.gold ? GOLD : undefined }}>{title}</span>
                            <span className="block text-[11px] text-white/45 truncate">{sub}</span>
                          </span>
                        </button>
                        {editing ? (
                          <span className="flex items-center gap-1 shrink-0">
                            <button onClick={() => move(idx, -1)} disabled={idx === 0} className="w-8 h-8 rounded-md border border-white/15 text-xs disabled:opacity-25" aria-label="Move up">↑</button>
                            <button onClick={() => move(idx, 1)} disabled={idx === mine.length - 1} className="w-8 h-8 rounded-md border border-white/15 text-xs disabled:opacity-25" aria-label="Move down">↓</button>
                            <button onClick={() => mineCall('/' + it.id, 'DELETE')} className="w-8 h-8 rounded-md border border-red-400/40 text-xs text-red-300" aria-label="Remove">✕</button>
                          </span>
                        ) : <span className="text-white/30 shrink-0">›</span>}
                      </div>
                    )
                  })}
                </div>
              </div>
            )}

            <div>
              <p className="text-[10px] uppercase tracking-widest text-white/40 mb-1.5">Quick calls</p>
              {cards.length > 8 && (
                <input value={find} onChange={e => setFind(e.target.value)} placeholder="Find a rule…"
                  className="w-full rounded-lg bg-black/70 border px-3 py-2.5 text-sm mb-2 focus:outline-none" style={{ borderColor: 'rgba(47,224,240,0.25)' }} />
              )}
              <div className="grid grid-cols-2 gap-2">
                {grid.map(c => (
                  <button key={c.id} onClick={() => go({ name: 'card', id: c.id })} className="rounded-2xl border p-3.5 text-left transition-colors" style={c.gold ? goldBox : box}>
                    <span className="block text-xl mb-1.5">{ICONS[c.icon] || '📘'}</span>
                    <span className="block text-sm font-bold leading-snug" style={{ color: c.gold ? GOLD : undefined }}>{c.title}</span>
                  </button>
                ))}
              </div>
              {grid.length === 0 && <p className="text-xs text-white/40 mt-1">{f ? 'No quick call for that. Ask Blue below.' : 'Every quick call is pinned to My rules.'}</p>}
            </div>

            <div>
              <p className="text-[10px] uppercase tracking-widest text-white/40 mb-1.5">Not here? Ask Blue</p>
              {askBox}
            </div>
            {msg && <p className="text-xs text-center" style={{ color: AQUA }}>{msg}</p>}
            <p className="text-[10px] text-white/30 text-center">A reference, not the umpire. The umpire on the day has the final call.</p>
          </div>
        )}

        {gate === 'ok' && view.name === 'card' && card && (
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <Back onClick={() => go({ name: 'home' })} label="Hey Blue!" />
              <button onClick={() => togglePin(card.id)} className="text-xs px-3 py-1.5 rounded-full border transition-colors"
                style={pinned(card.id) ? { borderColor: AQUA, color: AQUA, background: 'rgba(47,224,240,0.12)' } : { borderColor: 'rgba(255,255,255,0.25)', color: 'rgba(255,255,255,0.7)' }}>
                📌 {pinned(card.id) ? 'Pinned' : 'Pin'}
              </button>
            </div>
            <h2 className="text-xl font-black leading-tight" style={{ color: card.gold ? GOLD : undefined }}>{card.title}</h2>

            {card.big ? (
              <div className="grid grid-cols-2 gap-2">
                {card.big.map(b => (
                  <div key={b.label} className="rounded-xl p-3" style={{ background: 'rgba(47,224,240,0.12)', border: '1px solid rgba(47,224,240,0.3)' }}>
                    <p className="text-xs" style={{ color: AQUA }}>{b.label}</p>
                    <p className="text-4xl font-black leading-none my-1">{b.value}</p>
                    <p className="text-[11px] text-white/60">{b.sub}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-lg font-black leading-snug rounded-xl p-4" style={{ background: 'rgba(47,224,240,0.12)', border: '1px solid rgba(47,224,240,0.3)' }}>{card.line}</p>
            )}
            {card.note && <p className="text-xs text-white/50">{card.note}</p>}

            <div className="rounded-2xl border p-4" style={box}>
              {(showAll ? card.sections : card.sections.slice(0, 1)).map((s, i) => (
                <div key={s.h} className={i ? 'mt-4' : ''}>
                  <Label t={s.h} />
                  <ul className="flex flex-col gap-1.5">
                    {s.items.map(t => <li key={t} className="text-sm leading-snug text-white/85">{t}</li>)}
                  </ul>
                </div>
              ))}
              {card.sections.length > 1 && (
                <button onClick={() => setShowAll(v => !v)} className="text-xs mt-3 underline" style={{ color: AQUA }}>{showAll ? 'Show less' : 'Show all'}</button>
              )}
            </div>

            <div className="rounded-2xl border p-4" style={goldBox}>
              <p className="text-[10px] font-bold uppercase tracking-widest mb-1" style={{ color: GOLD }}>Coach Nate&apos;s tip</p>
              <p className="text-sm leading-relaxed">{card.tip}</p>
            </div>

            <div className="rounded-2xl border" style={box}>
              <button onClick={() => setShowWritten(v => !v)} className="w-full flex items-center justify-between gap-3 px-4 py-3 text-left">
                <span className="text-sm font-bold">Read it as written</span>
                <span className="text-[11px] text-white/45 text-right">{card.rules} {showWritten ? '▲' : '▼'}</span>
              </button>
              {showWritten && (
                <div className="px-4 pb-4">
                  {card.written.map(wr => (
                    <div key={wr.rule} className="mt-3">
                      <p className="text-[11px] font-bold mb-1" style={{ color: AQUA }}>Rule {wr.rule}</p>
                      <p className="text-xs text-white/65 leading-relaxed whitespace-pre-line">{wr.text}</p>
                    </div>
                  ))}
                  <p className="text-[10px] text-white/30 mt-3">From the official rulebook.</p>
                </div>
              )}
            </div>

            <button onClick={() => openAsk(card.title)} className="rounded-xl py-3 text-sm font-bold border" style={{ borderColor: AQUA, color: AQUA }}>Ask Blue about this</button>
            {msg && <p className="text-xs text-center" style={{ color: AQUA }}>{msg}</p>}
          </div>
        )}

        {gate === 'ok' && view.name === 'saved' && saved && (
          <div className="flex flex-col gap-3">
            <Back onClick={() => go({ name: 'home' })} label="Hey Blue!" />
            <h2 className="text-lg font-black leading-tight">{saved.title}</h2>
            <div className="rounded-2xl border p-4" style={{ ...box, borderColor: 'rgba(47,224,240,0.4)' }}><Answer text={saved.body || ''} /></div>
            <div className="flex gap-2">
              <input value={rename} onChange={e => setRename(e.target.value.slice(0, 120))} placeholder="Rename…"
                className="flex-1 rounded-lg bg-black/70 border px-3 py-2.5 text-sm focus:outline-none" style={{ borderColor: 'rgba(47,224,240,0.25)' }} />
              <button onClick={async () => { if (rename.trim() && await mineCall('/' + saved.id, 'POST', { title: rename.trim() })) setRename('') }} disabled={!rename.trim()}
                className="rounded-lg px-4 text-xs font-bold border disabled:opacity-40" style={{ borderColor: AQUA, color: AQUA }}>Rename</button>
            </div>
            <button onClick={async () => { if (await mineCall('/' + saved.id, 'DELETE')) go({ name: 'home' }) }} className="text-xs text-red-300 underline self-start">Remove from My rules</button>
            {msg && <p className="text-xs text-center" style={{ color: AQUA }}>{msg}</p>}
          </div>
        )}

        {gate === 'ok' && view.name === 'ask' && (
          <div className="flex flex-col gap-3">
            <Back onClick={() => go({ name: 'home' })} label="Hey Blue!" />
            {thread.length === 0 && !busy && <p className="text-xs text-white/45">Describe the play: outs, runners, what happened. Blue gives the ruling, the rule, and a quick read.</p>}
            {thread.map((t, i) => (
              <div key={i} className="flex flex-col gap-2">
                <p className="self-end max-w-[85%] rounded-2xl border px-4 py-2.5 text-sm" style={{ background: 'rgba(47,224,240,0.09)', borderColor: 'rgba(47,224,240,0.28)' }}>{t.q}</p>
                <div className="rounded-2xl border p-4" style={{ ...box, borderColor: 'rgba(47,224,240,0.4)' }}>
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-[10px] font-bold uppercase tracking-widest" style={{ color: AQUA }}>Hey Blue!</p>
                    <span className="flex gap-1.5">
                      <button onClick={() => navigator.clipboard?.writeText(t.a)} className="text-[10px] px-2 py-0.5 rounded-full border border-white/15 text-white/50">Copy</button>
                      <button onClick={() => saveTurn(i)} disabled={t.saved} className="text-[10px] px-2 py-0.5 rounded-full border disabled:opacity-60" style={{ borderColor: AQUA, color: AQUA }}>{t.saved ? 'Saved' : '🔖 Save'}</button>
                    </span>
                  </div>
                  <Answer text={t.a} />
                </div>
              </div>
            ))}
            {busy && <p className="text-xs" style={{ color: AQUA }}>Blue is checking the book…</p>}
            {msg && <p className="text-xs" style={{ color: AQUA }}>{msg}</p>}
            {askBox}
            <p className="text-[10px] text-white/30 text-center">A reference, not the umpire. The umpire on the day has the final call.</p>
            <div ref={endRef} />
          </div>
        )}
      </section>
    </main>
  )
}