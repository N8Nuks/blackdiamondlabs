'use client'
import React, { useEffect, useRef, useState } from 'react'
import Nav from '@/components/Nav'

const API = 'https://api.blackdiamondlabs.co.nz'
const KEY_STORE = 'bdai-member-key'
const CARDS_STORE = 'bdai-blue-cards'
const MINE_STORE = 'bdai-blue-mine'
const MAX_Q = 480

// Hey Blue! has its own look: royal blue and softball yellow, from the Hey Blue! mark.
const INK = '#05080F', PANEL = '#0C1322', LINE = '#1B2740', TEXT = '#F4F1E8', MUTED = '#A8B4CC'
const BLUE = '#2C66DC', SKY = '#8FB6FF', BALL = '#D7F23A'
const HEAD: React.CSSProperties = { fontFamily: "'Chakra Petch', 'Arial Narrow', sans-serif" }
const CUT = '6px 6px 22px 6px'   // one cut corner, like home plate

type Written = { rule: string; text: string }
type Section = { h: string; items: string[] }
type Big = { label: string; value: string; sub: string }
type Hero = { eyebrow: string; title: string; text: string }
type Card = { id: string; kind?: 'call' | 'topic'; new?: boolean; title: string; gold?: boolean; one: string; sub?: string; line?: string; note?: string; big?: Big[]; hero?: Hero; diagram?: 'lineup' | 'zone'; sections: Section[]; tip: string; rules: string; written: Written[] }
type Item = { id: number; kind: 'card' | 'answer' | 'note'; card_id: string | null; title: string | null; body: string | null }
type Turn = { q: string; a: string; saved?: boolean }
type View = { name: 'home' } | { name: 'card'; id: string } | { name: 'item'; id: number } | { name: 'ask' } | { name: 'write'; id?: number }

const H = (k: string) => ({ Authorization: 'Bearer ' + k })
const JH = (k: string) => ({ ...H(k), 'Content-Type': 'application/json' })
const load = <T,>(key: string, fallback: T): T => { try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : fallback } catch { return fallback } }
const keep = (key: string, v: unknown) => { try { localStorage.setItem(key, JSON.stringify(v)) } catch {} }

// Blue answers in three labelled parts; fall back to plain text if it answers another way.
function parts(reply: string) {
  const m = reply.match(/^RULING:\s*([\s\S]*?)\n+\s*(RULE\b[^:\n]*):\s*([\s\S]*?)\n+\s*QUICK READ:\s*([\s\S]*)$/)
  return m ? { ruling: m[1].trim(), ruleNo: m[2].trim(), rule: m[3].trim(), quick: m[4].trim() } : null
}

// The rulebook text keeps its printed line breaks; rejoin them so clauses wrap to the screen.
function reflow(text: string) {
  const out: string[] = []
  for (const raw of text.split('\n')) {
    const line = raw.trim()
    if (!line) continue
    const starts = /^(\(?[a-z]{1,2}\)|[ivx]{1,4}\)|\d{1,2}[.)]|\[\.\.\.\]|Rule \d)/.test(line)
    if (!out.length || starts) out.push(line)
    else out[out.length - 1] += (out[out.length - 1].endsWith('-') ? '' : ' ') + line
  }
  return out.join('\n')
}

// Helpers live OUTSIDE the page component so React keeps them mounted between keystrokes.
function Mark({ size }: { size: number }) {
  return (
    <svg role="img" aria-label="Hey Blue! mark" viewBox="0 0 400 320" style={{ width: size, height: size * 0.8, flexShrink: 0 }}>
      <defs>
        <linearGradient id="hbTop" gradientUnits="userSpaceOnUse" x1="40" y1="10" x2="360" y2="42"><stop offset="0" stopColor="#E4EFFF" /><stop offset="0.45" stopColor="#6FA2FF" /><stop offset="0.55" stopColor="#2C66DC" /><stop offset="1" stopColor="#C4DAFF" /></linearGradient>
        <linearGradient id="hbLeft" gradientUnits="userSpaceOnUse" x1="40" y1="0" x2="72" y2="0"><stop offset="0" stopColor="#E4EFFF" /><stop offset="1" stopColor="#3D78EA" /></linearGradient>
        <linearGradient id="hbRight" gradientUnits="userSpaceOnUse" x1="328" y1="0" x2="360" y2="0"><stop offset="0" stopColor="#12388F" /><stop offset="1" stopColor="#3D78EA" /></linearGradient>
        <linearGradient id="hbLowL" gradientUnits="userSpaceOnUse" x1="40" y1="170" x2="200" y2="310"><stop offset="0" stopColor="#9DC0FF" /><stop offset="1" stopColor="#1F56C8" /></linearGradient>
        <linearGradient id="hbLowR" gradientUnits="userSpaceOnUse" x1="360" y1="170" x2="200" y2="310"><stop offset="0" stopColor="#2459CC" /><stop offset="1" stopColor="#0B2664" /></linearGradient>
        <linearGradient id="hbBang" gradientUnits="userSpaceOnUse" x1="0" y1="62" x2="0" y2="172"><stop offset="0" stopColor="#E4EFFF" /><stop offset="0.48" stopColor="#6FA2FF" /><stop offset="0.54" stopColor="#2459CC" /><stop offset="1" stopColor="#9DC0FF" /></linearGradient>
        <radialGradient id="hbBall" gradientUnits="userSpaceOnUse" cx="192" cy="206" r="30"><stop offset="0" stopColor="#F6FF9A" /><stop offset="0.6" stopColor="#D7F23A" /><stop offset="1" stopColor="#9DB81C" /></radialGradient>
      </defs>
      <polygon points="40,10 196,10 196,42 72,42" fill="url(#hbTop)" />
      <polygon points="204,10 360,10 328,42 204,42" fill="url(#hbTop)" />
      <polygon points="40,10 40,170 72,156 72,42" fill="url(#hbLeft)" />
      <polygon points="360,10 360,170 328,156 328,42" fill="url(#hbRight)" />
      <polygon points="40,170 196,306.5 196,264.5 72,156" fill="url(#hbLowL)" />
      <polygon points="360,170 204,306.5 204,264.5 328,156" fill="url(#hbLowR)" />
      <polygon points="176,62 224,62 214,172 186,172" fill="url(#hbBang)" />
      <circle cx="200" cy="214" r="24" fill="url(#hbBall)" />
      <path d="M185 198 Q197 214 185 230 M215 198 Q203 214 215 230" fill="none" stroke="#B5301C" strokeWidth="3" strokeLinecap="round" />
    </svg>
  )
}
function Icon({ d, size = 18 }: { d: string; size?: number }) {
  return <svg aria-hidden="true" viewBox="0 0 24 24" style={{ width: size, height: size, flexShrink: 0 }} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d={d} /></svg>
}
const I_NEXT = 'M9 6l6 6-6 6', I_BACK = 'M15 6l-6 6 6 6', I_PIN = 'M12 17v5M8 3h8l-1 6 3 4H6l3-4z', I_UP = 'M6 15l6-6 6 6', I_DOWN = 'M6 9l6 6 6-6', I_X = 'M6 6l12 12M18 6L6 18'

function Label({ t, right }: { t: string; right?: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 8 }}>
      <p style={{ ...HEAD, fontWeight: 600, fontSize: 13, letterSpacing: '0.22em', textTransform: 'uppercase', color: MUTED, margin: 0 }}>{t}</p>
      {right}
    </div>
  )
}
function Bullets({ items }: { items: string[] }) {
  return (
    <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8 }}>
      {items.map(t => (
        <li key={t} style={{ display: 'flex', gap: 10, fontSize: 15, lineHeight: 1.35 }}>
          <span style={{ width: 6, height: 6, borderRadius: 3, background: '#6FA2FF', flexShrink: 0, marginTop: 7 }} />
          <span>{t}</span>
        </li>
      ))}
    </ul>
  )
}
function Tip({ text }: { text: string }) {
  return (
    <div style={{ background: BALL, color: INK, borderRadius: CUT, padding: '14px 16px' }}>
      <p style={{ ...HEAD, fontWeight: 700, fontSize: 12, letterSpacing: '0.22em', textTransform: 'uppercase', margin: '0 0 4px' }}>Coach Nate&apos;s tip</p>
      <p style={{ fontSize: 15, lineHeight: 1.4, fontWeight: 500, margin: 0 }}>{text}</p>
    </div>
  )
}
function Answer({ text }: { text: string }) {
  const p = parts(text)
  if (!p) return <p style={{ fontSize: 15, lineHeight: 1.45, whiteSpace: 'pre-wrap', margin: 0 }}>{text}</p>
  return (
    <>
      <p style={{ fontSize: 12, color: MUTED, margin: 0 }}>Ruling</p>
      <p style={{ fontSize: 18, fontWeight: 600, lineHeight: 1.3, margin: '0 0 12px' }}>{p.ruling}</p>
      <p style={{ fontSize: 12, color: SKY, margin: 0 }}>{p.ruleNo}</p>
      <p style={{ fontSize: 13, color: MUTED, lineHeight: 1.5, whiteSpace: 'pre-wrap', margin: '0 0 12px', paddingLeft: 10, borderLeft: '2px solid ' + BLUE }}>{p.rule}</p>
      <p style={{ fontSize: 12, color: MUTED, margin: 0 }}>Quick read</p>
      <p style={{ fontSize: 15, lineHeight: 1.45, margin: 0 }}>{p.quick}</p>
    </>
  )
}
function Lineup() {
  const rows: [number, string, string, string][] = [[1, 'CF', '', ''], [6, '3B', '', ''], [2, 'SS', '', ''], [7, 'LF', '', ''], [3, '1B', '', ''], [8, 'C', '', ''], [4, 'DP', 'Bats', 'dp'], [9, '2B', '', ''], [5, 'RF', '', ''], [10, 'FLEX', 'Fields', 'flex']]
  return (
    <div>
      <Label t="The line-up card" />
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4px 8px' }}>
        {rows.map(([n, pos, note, kind]) => (
          <div key={n} style={{ height: 30, boxSizing: 'border-box', padding: '0 10px', borderRadius: 4, display: 'flex', alignItems: 'center', gap: 10, fontSize: 14,
            background: kind === 'dp' ? BLUE : kind === 'flex' ? INK : PANEL, color: kind === 'dp' ? '#FFFFFF' : kind === 'flex' ? BALL : TEXT,
            border: kind === 'flex' ? '2px dashed ' + BALL : '1px solid ' + (kind === 'dp' ? BLUE : LINE) }}>
            <span style={{ ...HEAD, fontWeight: 700, width: 22 }}>{n}</span>
            <span style={{ fontWeight: 600, width: 46 }}>{pos}</span>
            <span style={{ fontSize: 13 }}>{note}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
function Zone() {
  return (
    <svg role="img" aria-label="Strike zone: the space over home plate from the bottom of the batter's sternum down to the bottom of the kneecap" viewBox="0 0 350 330" style={{ width: '100%', maxWidth: 350, alignSelf: 'center' }}>
      <circle cx="78" cy="34" r="20" fill="none" stroke={MUTED} strokeWidth="3" />
      <path d="M78 54 L74 150 M74 84 L112 112 M74 150 L92 236 L84 296 M74 150 L60 236 L66 296" fill="none" stroke={MUTED} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="150" y="108" width="110" height="128" fill={BLUE} fillOpacity="0.35" stroke="#6FA2FF" strokeWidth="2" />
      <line x1="40" y1="108" x2="340" y2="108" stroke={BALL} strokeWidth="2" strokeDasharray="6 5" />
      <line x1="40" y1="236" x2="340" y2="236" stroke={BALL} strokeWidth="2" strokeDasharray="6 5" />
      <text x="340" y="98" textAnchor="end" fill={BALL} fontSize="14" fontWeight="600">Bottom of the sternum</text>
      <text x="340" y="256" textAnchor="end" fill={BALL} fontSize="14" fontWeight="600">Bottom of the kneecap</text>
      <text x="205" y="178" textAnchor="middle" fill="#FFFFFF" fontSize="15" fontWeight="700">STRIKE</text>
      <polygon points="150,300 260,300 260,312 205,326 150,312" fill={TEXT} />
      <line x1="150" y1="236" x2="150" y2="300" stroke="#6FA2FF" strokeWidth="1" strokeDasharray="3 4" />
      <line x1="260" y1="236" x2="260" y2="300" stroke="#6FA2FF" strokeWidth="1" strokeDasharray="3 4" />
    </svg>
  )
}
const ghost: React.CSSProperties = { minHeight: 48, background: 'transparent', color: SKY, border: '2px solid ' + BLUE, borderRadius: 6, fontWeight: 600, fontSize: 15, cursor: 'pointer' }
const field: React.CSSProperties = { boxSizing: 'border-box', width: '100%', padding: '12px 14px', background: PANEL, border: '2px solid ' + BLUE, borderRadius: 6, color: TEXT, fontSize: 16, fontFamily: 'inherit' }
const sq: React.CSSProperties = { width: 44, height: 44, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'transparent', border: '1px solid ' + LINE, borderRadius: 6, color: TEXT, cursor: 'pointer' }

export default function HeyBlue() {
  const [apiKey, setApiKey] = useState('')
  const [gate, setGate] = useState<'loading' | 'nokey' | 'members' | 'ok'>('loading')
  const [cards, setCards] = useState<Card[]>([])
  const [mine, setMine] = useState<Item[]>([])
  const [cap, setCap] = useState(12)
  const [view, setView] = useState<View>({ name: 'home' })
  const [editing, setEditing] = useState(false)
  const [showAll, setShowAll] = useState(false)
  const [showWritten, setShowWritten] = useState(false)
  const [input, setInput] = useState('')
  const [about, setAbout] = useState('')
  const [thread, setThread] = useState<Turn[]>([])
  const [busy, setBusy] = useState(false)
  const [msg, setMsg] = useState('')
  const [nTitle, setNTitle] = useState('')
  const [nBody, setNBody] = useState('')
  const [nErr, setNErr] = useState('')
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

  const go = (v: View) => { setView(v); setShowAll(false); setShowWritten(false); setMsg(''); setEditing(false); setNErr(''); window.scrollTo({ top: 0 }) }
  const flash = (t: string) => { setMsg(t); setTimeout(() => setMsg(''), 3500) }
  const gotMine = (d: { items: Item[]; cap?: number }) => { setMine(d.items || []); if (d.cap) setCap(d.cap); keep(MINE_STORE, d.items || []) }

  const mineCall = async (path: string, method: string, body?: unknown) => {
    const r = await fetch(API + '/v1/blue/mine' + path, { method, headers: JH(apiKey), body: body ? JSON.stringify(body) : undefined }).catch(() => null)
    if (!r) { flash('No connection. Try again when you have signal.'); return false }
    const d = await r.json().catch(() => ({}))
    if (!r.ok) { flash(d.detail || "That didn't save. Try again."); return false }
    gotMine(d); return true
  }
  const pinned = (id: string) => mine.find(i => i.kind === 'card' && i.card_id === id)
  const togglePin = async (id: string) => {
    const it = pinned(id)
    if (it) await mineCall('/' + it.id, 'DELETE')
    else if (await mineCall('', 'POST', { kind: 'card', card_id: id })) flash('Added to your front page.')
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
    if (view.name !== 'ask') go({ name: 'ask' })
    const message = (about ? 'About "' + about + '": ' : '') + q
    const history = thread.slice(-3).flatMap(t => [{ role: 'user', content: t.q }, { role: 'assistant', content: t.a }])
    setBusy(true); setMsg(''); setInput('')
    try {
      const r = await fetch(API + '/v1/blue/ask', { method: 'POST', headers: JH(apiKey), body: JSON.stringify({ message, history }) })
      const d = await r.json().catch(() => ({}))
      if (r.status === 401) { setGate('nokey'); return }
      if (!r.ok) { setMsg(d.detail || 'Blue missed that one. Try again shortly.'); setInput(q); return }
      setThread(t => [...t, { q, a: d.reply }])
    } catch { setMsg('No connection. Your front page and quick calls still work.'); setInput(q) }
    finally { setBusy(false) }
  }
  const saveTurn = async (idx: number) => {
    const t = thread[idx]
    if (await mineCall('', 'POST', { kind: 'answer', title: t.q.slice(0, 120), body: t.a })) {
      setThread(th => th.map((x, i) => i === idx ? { ...x, saved: true } : x)); flash('Saved to your front page.')
    }
  }
  const openWrite = (it?: Item) => { setNTitle(it?.title || ''); setNBody(it?.body || ''); go({ name: 'write', id: it?.id }) }
  const saveNote = async () => {
    const title = nTitle.trim(), body = nBody.trim()
    if (!title) { setNErr('Give your topic a name.'); return }
    if (!body) { setNErr('Add your notes first.'); return }
    const id = view.name === 'write' ? view.id : undefined
    const ok = id ? await mineCall('/' + id, 'POST', { title, body }) : await mineCall('', 'POST', { kind: 'note', title, body })
    if (ok) go({ name: 'home' })
  }

  const card = view.name === 'card' ? cards.find(c => c.id === view.id) : undefined
  const item = view.name === 'item' ? mine.find(i => i.id === view.id) : undefined
  const f = view.name === 'home' ? input.trim().toLowerCase() : ''
  const match = (c: Card) => !f || (c.title + ' ' + c.one + ' ' + c.sections.map(s => s.h + ' ' + s.items.join(' ')).join(' ')).toLowerCase().includes(f)
  const shown = cards.filter(c => (f ? true : !pinned(c.id)) && match(c))
  const topics = shown.filter(c => c.kind === 'topic')
  const calls = shown.filter(c => c.kind !== 'topic')

  const askBox = (
    <div>
      {about && view.name === 'ask' && (
        <p style={{ fontSize: 13, color: MUTED, margin: '0 0 6px' }}>About: <span style={{ color: SKY }}>{about}</span> <button onClick={() => setAbout('')} style={{ background: 'none', border: 'none', color: MUTED, textDecoration: 'underline', cursor: 'pointer', fontSize: 13 }}>clear</button></p>
      )}
      <label htmlFor="hb-ask" style={{ display: 'block', fontSize: 13, color: MUTED, marginBottom: 8 }}>{view.name === 'home' ? 'Find a rule, or ask Blue' : 'Ask Blue'}</label>
      <div style={{ display: 'flex', gap: 8 }}>
        <input id="hb-ask" type="text" value={input} onChange={e => setInput(e.target.value.slice(0, MAX_Q))}
          onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); ask() } }}
          placeholder="Bases loaded, one out, pop-up to short" style={{ ...field, flex: 1, minWidth: 0, height: 52, padding: '0 14px' }} />
        <button onClick={ask} disabled={busy} style={{ ...HEAD, height: 52, padding: '0 18px', background: BALL, color: INK, border: 'none', borderRadius: 6, fontWeight: 700, fontSize: 16, letterSpacing: '0.08em', textTransform: 'uppercase', cursor: 'pointer' }}>Ask</button>
      </div>
    </div>
  )
  const backBar = (right?: React.ReactNode) => (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <button onClick={() => go({ name: 'home' })} style={{ minHeight: 44, display: 'flex', alignItems: 'center', gap: 6, background: 'none', border: 'none', color: SKY, fontSize: 14, cursor: 'pointer', padding: 0 }}><Icon d={I_BACK} /><span>Hey Blue!</span></button>
      {right}
    </div>
  )
  const note = msg && <p role="status" style={{ fontSize: 13, color: BALL, textAlign: 'center', margin: 0 }}>{msg}</p>
  const foot = <p style={{ fontSize: 12, color: MUTED, textAlign: 'center', margin: 0 }}>A reference, not the umpire. The umpire on the day has the final call.</p>

  return (
    <main style={{ minHeight: '100vh', background: INK, color: TEXT, display: 'flex', flexDirection: 'column', fontFamily: "'Barlow', 'Helvetica Neue', Arial, sans-serif" }}>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Chakra+Petch:ital,wght@0,600;0,700;1,700&family=Barlow:wght@400;500;600&display=swap" precedence="default" />
      <Nav />
      <section style={{ flex: 1, padding: '112px 20px 48px', maxWidth: 480, margin: '0 auto', width: '100%', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', gap: 20 }}>

        {(gate !== 'ok' || view.name === 'home') && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <Mark size={60} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
              <h1 style={{ ...HEAD, fontWeight: 700, fontStyle: 'italic', fontSize: 34, lineHeight: 1, letterSpacing: '0.03em', textTransform: 'uppercase', margin: 0 }}><span style={{ color: '#E8E8E8' }}>Hey</span> <span style={{ color: '#6FA2FF' }}>Blue!</span></h1>
              <p style={{ ...HEAD, fontWeight: 600, fontSize: 12, letterSpacing: '0.3em', textTransform: 'uppercase', color: MUTED, margin: 0 }}>Rules, right now</p>
            </div>
          </div>
        )}

        {gate === 'loading' && <p style={{ fontSize: 14, color: MUTED }}>Calling Blue over…</p>}
        {gate === 'nokey' && (
          <div style={{ background: PANEL, border: '1px solid ' + LINE, borderRadius: 6, padding: 20 }}>
            <p style={{ fontSize: 15, margin: '0 0 10px' }}>Sign in on the Coach Nate page first.</p>
            <a href="/coach-nate" style={{ color: SKY, fontSize: 14 }}>Go to Coach Nate</a>
          </div>
        )}
        {gate === 'members' && (
          <div style={{ background: PANEL, border: '1px solid ' + LINE, borderRadius: 6, padding: 20 }}>
            <p style={{ ...HEAD, fontWeight: 700, fontSize: 19, textTransform: 'uppercase', margin: '0 0 6px' }}>Members only</p>
            <p style={{ fontSize: 14, color: MUTED, lineHeight: 1.45, margin: '0 0 14px' }}>Hey Blue! is part of the subscription. Quick calls on the rules that start arguments, topics that explain the tricky ones, and the official rulebook on call for everything else.</p>
            <a href="/coach-nate" style={{ ...HEAD, display: 'inline-block', padding: '12px 18px', background: BALL, color: INK, borderRadius: 6, fontWeight: 700, fontSize: 14, letterSpacing: '0.08em', textTransform: 'uppercase', textDecoration: 'none' }}>See membership</a>
          </div>
        )}

        {gate === 'ok' && view.name === 'home' && (
          <>
            {askBox}

            {mine.length > 0 && !f && (
              <div>
                <Label t="My rules" right={<button onClick={() => setEditing(e => !e)} style={{ background: 'none', border: 'none', color: SKY, fontSize: 13, textDecoration: 'underline', cursor: 'pointer', minHeight: 24 }}>{editing ? 'Done' : 'Edit'}</button>} />
                <div style={{ background: PANEL, border: '1px solid ' + LINE, borderRadius: 6 }}>
                  {mine.map((it, idx) => {
                    const c = it.kind === 'card' ? cards.find(x => x.id === it.card_id) : undefined
                    if (it.kind === 'card' && !c) return null
                    const title = c ? c.title : it.title || 'Saved'
                    const sub = c ? c.one : it.kind === 'note' ? 'My notes' : 'Saved answer'
                    return (
                      <div key={it.id} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '0 14px', borderTop: idx ? '1px solid ' + LINE : undefined }}>
                        <button onClick={() => !editing && go(c ? { name: 'card', id: c.id } : { name: 'item', id: it.id })} style={{ flex: 1, minWidth: 0, minHeight: 56, display: 'flex', alignItems: 'center', gap: 12, background: 'none', border: 'none', color: TEXT, textAlign: 'left', cursor: 'pointer', padding: '8px 0' }}>
                          <span style={{ width: 10, height: 10, borderRadius: 5, background: BALL, flexShrink: 0 }} />
                          <span style={{ minWidth: 0, display: 'flex', flexDirection: 'column', gap: 2 }}>
                            <span style={{ fontWeight: 600, fontSize: 16, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{title}</span>
                            <span style={{ fontSize: 13, color: MUTED, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{sub}</span>
                          </span>
                        </button>
                        {editing ? (
                          <span style={{ display: 'flex', gap: 4, flexShrink: 0 }}>
                            <button onClick={() => move(idx, -1)} disabled={idx === 0} aria-label="Move up" style={{ ...sq, opacity: idx === 0 ? 0.3 : 1 }}><Icon d={I_UP} /></button>
                            <button onClick={() => move(idx, 1)} disabled={idx === mine.length - 1} aria-label="Move down" style={{ ...sq, opacity: idx === mine.length - 1 ? 0.3 : 1 }}><Icon d={I_DOWN} /></button>
                            <button onClick={() => mineCall('/' + it.id, 'DELETE')} aria-label="Remove" style={{ ...sq, color: '#FF9D9D' }}><Icon d={I_X} /></button>
                          </span>
                        ) : <span style={{ color: MUTED }}><Icon d={I_NEXT} /></span>}
                      </div>
                    )
                  })}
                </div>
                <p style={{ fontSize: 12, color: MUTED, margin: '6px 0 0' }}>{mine.length} of {cap}</p>
              </div>
            )}

            <div>
              <Label t="Topics" />
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                {topics.map(c => (
                  <button key={c.id} onClick={() => go({ name: 'card', id: c.id })} style={{ minHeight: 112, boxSizing: 'border-box', padding: '12px 14px', background: BLUE, border: 'none', borderRadius: CUT, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8, color: '#FFFFFF', textAlign: 'left', cursor: 'pointer' }}>
                    {c.new ? <span style={{ ...HEAD, fontWeight: 700, fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: INK, background: BALL, padding: '3px 8px', borderRadius: 4 }}>New</span> : <span />}
                    <span style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                      <span style={{ ...HEAD, fontWeight: 700, fontSize: 19, lineHeight: 1.1, textTransform: 'uppercase' }}>{c.title}</span>
                      <span style={{ fontSize: 13, color: '#E4EFFF' }}>{c.one}</span>
                    </span>
                  </button>
                ))}
                {!f && (
                  <button onClick={() => openWrite()} style={{ minHeight: 112, boxSizing: 'border-box', background: 'transparent', border: '2px dashed #3D5A99', borderRadius: CUT, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 4, color: SKY, cursor: 'pointer' }}>
                    <span style={{ ...HEAD, fontWeight: 700, fontSize: 26, lineHeight: 1 }}>+</span>
                    <span style={{ fontSize: 14 }}>Add a topic</span>
                  </button>
                )}
              </div>
            </div>

            <div>
              <Label t="Quick calls" />
              {calls.map((c, i) => (
                <button key={c.id} onClick={() => go({ name: 'card', id: c.id })} style={{ width: '100%', minHeight: 50, padding: '6px 0', display: 'flex', alignItems: 'center', gap: 12, background: 'none', border: 'none', borderTop: i ? '1px solid ' + LINE : undefined, color: TEXT, textAlign: 'left', cursor: 'pointer' }}>
                  <span style={{ flex: 1, fontWeight: 500, fontSize: 16 }}>{c.title}</span>
                  <span style={{ color: MUTED }}><Icon d={I_NEXT} /></span>
                </button>
              ))}
              {calls.length === 0 && <p style={{ fontSize: 14, color: MUTED, margin: 0 }}>{f ? 'No quick call matches. Press Ask and Blue will rule on it.' : 'Every quick call is on your front page.'}</p>}
            </div>
            {note}
            {foot}
          </>
        )}

        {gate === 'ok' && view.name === 'card' && card && (
          <>
            {backBar(
              <button onClick={() => togglePin(card.id)} style={{ minHeight: 44, padding: '0 14px', display: 'flex', alignItems: 'center', gap: 6, borderRadius: 6, fontWeight: 600, fontSize: 14, cursor: 'pointer', border: '2px solid ' + BALL, background: pinned(card.id) ? BALL : 'transparent', color: pinned(card.id) ? INK : BALL }}>
                <Icon d={I_PIN} size={16} /><span>{pinned(card.id) ? 'On my front page' : 'Add to my front page'}</span>
              </button>
            )}
            <div>
              <p style={{ ...HEAD, fontWeight: 600, fontSize: 12, letterSpacing: '0.3em', textTransform: 'uppercase', color: SKY, margin: '0 0 4px' }}>{card.kind === 'topic' ? 'Topic' : card.gold ? 'Coach Nate' : 'Quick call'}</p>
              <h1 style={{ ...HEAD, fontWeight: 700, fontStyle: 'italic', fontSize: card.title.length > 22 ? 30 : 40, lineHeight: 1, textTransform: 'uppercase', margin: 0 }}>{card.title}</h1>
              {card.sub && <p style={{ fontSize: 16, color: MUTED, margin: '4px 0 0' }}>{card.sub}</p>}
            </div>

            {card.hero && (
              <div style={{ background: BLUE, color: '#FFFFFF', borderRadius: CUT, padding: '14px 16px' }}>
                <p style={{ ...HEAD, fontWeight: 700, fontSize: 12, letterSpacing: '0.22em', textTransform: 'uppercase', color: '#E4EFFF', margin: '0 0 4px' }}>{card.hero.eyebrow}</p>
                <p style={{ ...HEAD, fontWeight: 700, fontSize: 21, lineHeight: 1.15, textTransform: 'uppercase', margin: '0 0 4px' }}>{card.hero.title}</p>
                <p style={{ fontSize: 15, lineHeight: 1.35, margin: 0 }}>{card.hero.text}</p>
              </div>
            )}
            {card.big && (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                {card.big.map(b => (
                  <div key={b.label} style={{ background: BLUE, color: '#FFFFFF', borderRadius: CUT, padding: '12px 14px' }}>
                    <p style={{ fontSize: 13, color: '#E4EFFF', margin: 0 }}>{b.label}</p>
                    <p style={{ ...HEAD, fontWeight: 700, fontSize: 48, lineHeight: 1, margin: '2px 0' }}>{b.value}</p>
                    <p style={{ fontSize: 13, color: '#E4EFFF', margin: 0 }}>{b.sub}</p>
                  </div>
                ))}
              </div>
            )}
            {card.line && <p style={{ background: BLUE, color: '#FFFFFF', borderRadius: CUT, padding: '14px 16px', fontSize: 18, fontWeight: 600, lineHeight: 1.3, margin: 0 }}>{card.line}</p>}
            {card.diagram === 'lineup' && <Lineup />}
            {card.diagram === 'zone' && <Zone />}
            {card.note && <p style={{ fontSize: 13, color: MUTED, margin: 0 }}>{card.note}</p>}

            {(card.kind === 'topic' || showAll ? card.sections : card.sections.slice(0, 1)).map(s => (
              <div key={s.h}><Label t={s.h} /><Bullets items={s.items} /></div>
            ))}
            {card.kind !== 'topic' && card.sections.length > 1 && (
              <button onClick={() => setShowAll(v => !v)} style={{ alignSelf: 'flex-start', minHeight: 44, background: 'none', border: 'none', color: SKY, fontSize: 14, textDecoration: 'underline', cursor: 'pointer', padding: 0 }}>{showAll ? 'Show less' : 'Show all'}</button>
            )}

            <Tip text={card.tip} />

            <div style={{ background: PANEL, border: '1px solid ' + LINE, borderRadius: 6 }}>
              <button onClick={() => setShowWritten(v => !v)} aria-expanded={showWritten} style={{ width: '100%', minHeight: 48, padding: '8px 14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, background: 'none', border: 'none', color: TEXT, textAlign: 'left', cursor: 'pointer' }}>
                <span style={{ fontWeight: 600, fontSize: 15, flexShrink: 0 }}>Read it as written</span>
                <span style={{ fontSize: 13, color: MUTED, textAlign: 'right' }}>{card.rules}</span>
              </button>
              {showWritten && (
                <div style={{ padding: '0 14px 14px' }}>
                  {card.written.map(wr => (
                    <div key={wr.rule} style={{ marginTop: 10 }}>
                      <p style={{ fontSize: 13, fontWeight: 600, color: SKY, margin: '0 0 4px' }}>Rule {wr.rule}</p>
                      <p style={{ fontSize: 13, color: MUTED, lineHeight: 1.5, whiteSpace: 'pre-line', margin: 0 }}>{reflow(wr.text)}</p>
                    </div>
                  ))}
                  <p style={{ fontSize: 12, color: MUTED, margin: '12px 0 0' }}>From the official rulebook.</p>
                </div>
              )}
            </div>

            <button onClick={() => { setAbout(card.title); setInput(''); go({ name: 'ask' }) }} style={ghost}>Ask Blue about this</button>
            {note}
          </>
        )}

        {gate === 'ok' && view.name === 'item' && item && (
          <>
            {backBar()}
            <div>
              <p style={{ ...HEAD, fontWeight: 600, fontSize: 12, letterSpacing: '0.3em', textTransform: 'uppercase', color: SKY, margin: '0 0 4px' }}>{item.kind === 'note' ? 'My notes' : 'Saved answer'}</p>
              <h1 style={{ ...HEAD, fontWeight: 700, fontStyle: 'italic', fontSize: 28, lineHeight: 1.05, textTransform: 'uppercase', margin: 0 }}>{item.title}</h1>
            </div>
            <div style={{ background: PANEL, border: '1px solid ' + LINE, borderRadius: 6, padding: 16 }}>
              {item.kind === 'note' ? <p style={{ fontSize: 15, lineHeight: 1.5, whiteSpace: 'pre-wrap', margin: 0 }}>{item.body}</p> : <Answer text={item.body || ''} />}
            </div>
            {item.kind === 'note' && <p style={{ fontSize: 12, color: MUTED, margin: 0 }}>Your own notes. Not checked against the rulebook.</p>}
            {item.kind === 'note' && <button onClick={() => openWrite(item)} style={ghost}>Edit</button>}
            <button onClick={async () => { if (await mineCall('/' + item.id, 'DELETE')) go({ name: 'home' }) }} style={{ alignSelf: 'flex-start', minHeight: 44, background: 'none', border: 'none', color: '#FF9D9D', fontSize: 14, textDecoration: 'underline', cursor: 'pointer', padding: 0 }}>Remove from my front page</button>
            {note}
          </>
        )}

        {gate === 'ok' && view.name === 'write' && (
          <>
            {backBar()}
            <h1 style={{ ...HEAD, fontWeight: 700, fontStyle: 'italic', fontSize: 34, lineHeight: 1, textTransform: 'uppercase', margin: 0 }}>{view.id ? 'Edit topic' : 'Add a topic'}</h1>
            <p style={{ fontSize: 14, color: MUTED, margin: 0 }}>Your own notes on your front page: team signs, local rules, a reminder for game day.</p>
            <div>
              <label htmlFor="hb-nt" style={{ display: 'block', fontSize: 13, color: MUTED, marginBottom: 6 }}>Name</label>
              <input id="hb-nt" type="text" value={nTitle} onChange={e => { setNTitle(e.target.value.slice(0, 120)); setNErr('') }} placeholder="Saturday ground rules" style={field} />
            </div>
            <div>
              <label htmlFor="hb-nb" style={{ display: 'block', fontSize: 13, color: MUTED, marginBottom: 6 }}>Notes</label>
              <textarea id="hb-nb" value={nBody} onChange={e => { setNBody(e.target.value.slice(0, 4000)); setNErr('') }} rows={8} placeholder="Dead ball line is the car park kerb." style={{ ...field, resize: 'vertical' }} />
            </div>
            {nErr && <p role="alert" style={{ fontSize: 13, color: '#FF9D9D', margin: 0 }}>{nErr}</p>}
            <button onClick={saveNote} style={{ ...HEAD, minHeight: 52, background: BALL, color: INK, border: 'none', borderRadius: 6, fontWeight: 700, fontSize: 16, letterSpacing: '0.08em', textTransform: 'uppercase', cursor: 'pointer' }}>Save topic</button>
            {note}
          </>
        )}

        {gate === 'ok' && view.name === 'ask' && (
          <>
            {backBar()}
            {thread.length === 0 && !busy && <p style={{ fontSize: 14, color: MUTED, margin: 0 }}>Describe the play: outs, runners, what happened. Blue gives the ruling, the rule and a quick read.</p>}
            {thread.map((t, i) => (
              <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <p style={{ alignSelf: 'flex-end', maxWidth: '85%', background: BLUE, color: '#FFFFFF', borderRadius: CUT, padding: '10px 14px', fontSize: 15, margin: 0 }}>{t.q}</p>
                <div style={{ background: PANEL, border: '1px solid ' + LINE, borderRadius: 6, padding: 16 }}>
                  <Answer text={t.a} />
                  <div style={{ display: 'flex', gap: 8, marginTop: 14 }}>
                    <button onClick={() => saveTurn(i)} disabled={t.saved} style={{ minHeight: 44, padding: '0 14px', display: 'flex', alignItems: 'center', gap: 6, borderRadius: 6, fontWeight: 600, fontSize: 14, cursor: 'pointer', border: '2px solid ' + BALL, background: t.saved ? BALL : 'transparent', color: t.saved ? INK : BALL }}><Icon d={I_PIN} size={16} /><span>{t.saved ? 'Saved' : 'Save to my front page'}</span></button>
                    <button onClick={() => navigator.clipboard?.writeText(t.a)} style={{ minHeight: 44, padding: '0 14px', background: 'transparent', border: '1px solid ' + LINE, borderRadius: 6, color: MUTED, fontSize: 14, cursor: 'pointer' }}>Copy</button>
                  </div>
                </div>
              </div>
            ))}
            {busy && <p role="status" style={{ fontSize: 14, color: SKY, margin: 0 }}>Blue is checking the book…</p>}
            {msg && <p role="alert" style={{ fontSize: 14, color: BALL, margin: 0 }}>{msg}</p>}
            {askBox}
            {foot}
            <div ref={endRef} />
          </>
        )}
      </section>
    </main>
  )
}