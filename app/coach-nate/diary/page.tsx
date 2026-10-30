'use client'
import React, { useEffect, useState } from 'react'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

const API = 'https://api.blackdiamondlabs.co.nz'
const KEY_STORE = 'bdai-member-key'
const AQUA = '#2FE0F0'
const GOLD = '#E8C77A'

const PITCH = [['D', 'drop'], ['R', 'rise'], ['C', 'change'], ['S', 'screw'], ['U', 'curve'], ['F', 'fast']]
const PITCH_NAMES = PITCH.map(([, n]) => n[0].toUpperCase() + n.slice(1))   // Drop, Rise, Change, Screw, Curve, Fast
const CALL = [['B', 'ball'], ['K', 'strike'], ['F5', 'foul 5'], ['F3', 'foul 3'], ['F2', 'foul 2']]
const SWING = [['T', 'took'], ['S', 'swung'], ['M', 'missed'], ['H', 'hit']]
const RESULTS = ['1B', '2B', '3B', 'HR', 'BB', 'HBP', 'K', 'Kc', 'GO', 'FO', 'LO', 'SAC', 'E']
const FEELS = ['Slept well', 'Slept badly', 'Fresh', 'Sore legs', 'Sore hands', 'Tired', 'Nervous', 'Ready']
const BAD_FEELS = ['Slept badly', 'Sore legs', 'Sore hands', 'Tired']
const GOOD_FEELS = ['Fresh', 'Ready']
const STATES = ['Relaxed', 'Tense', 'Strong', 'Weak', 'Clear', 'Rushed', 'Guessing']
const ROWS = ['PITCH', 'B·S', 'SWING']

type AB = { n: number; pitches: string[][]; result: string; hit_where: string; state: string[]; why: string }
type Game = { id: number; game_date: string; opponent: string; pitcher: string; feel: string[]; intent: string; p_pitches: string[]; p_best: string; p_goto: string; review: string; scout: string; closed: number; abs: AB[] }
type Tab = 'pre' | 'ab' | 'post' | 'hist' | 'ins'
type Tone = 'good' | 'bad' | ''

const emptyGrid = () => Array.from({ length: 15 }, () => ['', '', ''])
const seq = (p: string[][]) => p.filter(x => x.some(Boolean)).map(x => x.filter(Boolean).join('-')).join(' · ')

const box: React.CSSProperties = { borderColor: 'rgba(47,224,240,0.22)', background: 'rgba(3,10,16,0.86)' }
const inp = 'w-full rounded-lg bg-black/70 border px-3 py-2.5 text-sm focus:outline-none'
const inpStyle: React.CSSProperties = { borderColor: 'rgba(47,224,240,0.25)' }
const neon: React.CSSProperties = { background: 'linear-gradient(90deg,#1B6E8C,#2FE0F0,#BDF6FF,#2FE0F0,#1B6E8C)' }
const goldBtn: React.CSSProperties = { background: 'linear-gradient(90deg,#B8860B,#FFD700,#FFF3C4,#FFD700,#B8860B)' }

const chip = (on: boolean, tone: Tone = ''): React.CSSProperties => ({
  borderColor: on ? (tone === 'bad' ? '#e0524a' : tone === 'good' ? '#48b36b' : AQUA) : 'rgba(255,255,255,0.15)',
  background: on ? (tone === 'bad' ? 'rgba(224,82,74,0.18)' : tone === 'good' ? 'rgba(72,179,107,0.18)' : 'rgba(47,224,240,0.14)') : 'rgba(0,0,0,0.5)',
  color: on ? '#fff' : 'rgba(255,255,255,0.6)',
})

// Helpers live OUTSIDE the page component so React keeps them mounted between keystrokes.
function Chips({ items, value, onPick, tone, shared }: { items: string[]; value: string[]; onPick: (v: string) => void; tone?: (v: string) => Tone; shared?: string[] }) {
  return (
    <div className="flex flex-wrap gap-1.5">{items.map(v => (
      <button key={v} onClick={() => onPick(v)} className="text-xs px-3 py-1.5 rounded-md border transition-colors" style={chip(value.includes(v), tone ? tone(v) : '')}>
        {v}{shared?.includes(v) && <span className="ml-1" style={{ color: GOLD }} title="Used by other members">·</span>}
      </button>
    ))}</div>
  )
}
function TabBtn({ id, label, tab, setTab }: { id: Tab; label: string; tab: Tab; setTab: (t: Tab) => void }) {
  return (
    <button onClick={() => setTab(id)} className="shrink-0 text-xs font-bold uppercase tracking-widest px-3 py-2 rounded-full border transition-colors"
      style={tab === id ? { borderColor: AQUA, background: 'rgba(47,224,240,0.14)', color: '#fff' } : { borderColor: 'rgba(255,255,255,0.12)', color: 'rgba(255,255,255,0.45)' }}>{label}</button>
  )
}
function Card({ title, sub, children }: { title: string; sub?: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border p-4" style={box}>
      <p className="text-sm font-black uppercase tracking-wide mb-2">{title}{sub && <span className="text-[10px] font-normal tracking-widest text-white/35 ml-2">{sub}</span>}</p>
      {children}
    </div>
  )
}
function Label({ t }: { t: string }) {
  return <p className="text-[9px] uppercase tracking-widest text-white/35 mb-1 mt-3 first:mt-0">{t}</p>
}
function Line({ a }: { a: AB }) {
  return (
    <p className="text-[12px] font-mono text-white/70"><span className="font-black mr-2" style={{ color: GOLD }}>AB{a.n}</span>{seq(a.pitches) || 'no pitches'} → {a.result || '?'}{a.state.length ? ' · ' + a.state.join(', ').toLowerCase() : ''}</p>
  )
}

export default function HittingDiary() {
  const [apiKey, setApiKey] = useState('')
  const [gate, setGate] = useState<'loading' | 'nokey' | 'members' | 'ok'>('loading')
  const [tab, setTab] = useState<Tab>('ab')
  const [games, setGames] = useState<Game[]>([])
  const [game, setGame] = useState<Game | null>(null)
  const [msg, setMsg] = useState('')
  const [busy, setBusy] = useState(false)
  // pre-game
  const [gDate, setGDate] = useState(new Date().toLocaleDateString('en-NZ', { weekday: 'short', day: 'numeric', month: 'short' }))
  const [gOpp, setGOpp] = useState(''); const [gPit, setGPit] = useState('')
  const [pPitches, setPPitches] = useState<string[]>([]); const [pBest, setPBest] = useState(''); const [pGoto, setPGoto] = useState('')
  const [gFeel, setGFeel] = useState<string[]>([]); const [gIntent, setGIntent] = useState('')
  const [sharedFeels, setSharedFeels] = useState<string[]>([])   // words 3+ members have used
  const [customFeel, setCustomFeel] = useState('')
  // at-bat
  const [grid, setGrid] = useState<string[][]>(emptyGrid())
  const [sel, setSel] = useState<[number, number]>([0, 0])
  const [result, setResult] = useState(''); const [where, setWhere] = useState('')
  const [state, setState] = useState<string[]>([]); const [why, setWhy] = useState('')
  const [editN, setEditN] = useState<number | null>(null)
  // post
  const [review, setReview] = useState(''); const [scout, setScout] = useState('')
  const [insight, setInsight] = useState<{ text: string; created_at: string } | null>(null)

  const H = (k = apiKey) => ({ Authorization: 'Bearer ' + k, 'Content-Type': 'application/json' })

  const loadPre = (g: Game) => {
    setGDate(g.game_date || ''); setGOpp(g.opponent || ''); setGPit(g.pitcher || '')
    setPPitches(g.p_pitches || []); setPBest(g.p_best || ''); setPGoto(g.p_goto || '')
    setGFeel(g.feel || []); setGIntent(g.intent || '')
  }

  useEffect(() => {
    let k = ''
    try { k = localStorage.getItem(KEY_STORE) || '' } catch {}
    if (!k) { setGate('nokey'); return }
    setApiKey(k)
    ;(async () => {
      const r = await fetch(API + '/v1/diary/history', { headers: H(k) }).catch(() => null)
      if (!r || r.status === 401) { setGate('nokey'); return }
      if (r.status === 403) { setGate('members'); return }
      const d = await r.json()
      setGames(d.games)
      const open = d.games.find((g: Game) => !g.closed)
      if (open) { setGame(open); loadPre(open); setTab('ab') } else setTab('pre')
      setGate('ok')
      fetch(API + '/v1/diary/insights', { headers: H(k) }).then(r => r.ok ? r.json() : null).then(d => d && setInsight(d.insight)).catch(() => {})
      fetch(API + '/v1/diary/feels', { headers: H(k) }).then(r => r.ok ? r.json() : null).then(d => d && setSharedFeels(d.feels || [])).catch(() => {})
    })()
  }, [])

  const flash = (t: string) => { setMsg(t); setTimeout(() => setMsg(''), 2500) }
  const toggle = (arr: string[], v: string, set: (a: string[]) => void) => set(arr.includes(v) ? arr.filter(x => x !== v) : [...arr, v])
  const refreshHistory = async () => {
    const r = await fetch(API + '/v1/diary/history', { headers: H() }).catch(() => null)
    if (r && r.ok) setGames((await r.json()).games)
  }

  // Pitcher card: best / go-to can only be one of the pitches ticked
  const togglePitch = (v: string) => {
    const next = pPitches.includes(v) ? pPitches.filter(x => x !== v) : [...pPitches, v]
    setPPitches(next)
    if (!next.includes(pBest)) setPBest('')
    if (!next.includes(pGoto)) setPGoto('')
  }

  // Feel chips = defaults + shared vocabulary + anything this member typed for this game
  const feelItems = Array.from(new Set([...FEELS, ...sharedFeels, ...gFeel]))
  const addCustomFeel = () => {
    const v = customFeel.trim().replace(/\s+/g, ' ').slice(0, 24)
    if (!v) return
    const existing = feelItems.find(f => f.toLowerCase() === v.toLowerCase())
    const word = existing || (v[0].toUpperCase() + v.slice(1))
    if (!gFeel.includes(word)) setGFeel([...gFeel, word])
    setCustomFeel('')
  }

  const startGame = async () => {
    setBusy(true)
    const body = { id: game?.id || null, game_date: gDate, opponent: gOpp, pitcher: gPit, feel: gFeel, intent: gIntent, p_pitches: pPitches, p_best: pBest, p_goto: pGoto }
    const r = await fetch(API + '/v1/diary/game', { method: 'POST', headers: H(), body: JSON.stringify(body) }).catch(() => null)
    setBusy(false)
    if (!r || !r.ok) { flash('Could not save — try again.'); return }
    const g: Game = await r.json(); setGame(g); await refreshHistory(); setTab('ab'); flash('Game open. Go hit.')
  }

  const resetAB = () => { setGrid(emptyGrid()); setSel([0, 0]); setResult(''); setWhere(''); setState([]); setWhy(''); setEditN(null) }

  const setCell = (v: string) => {
    const [c, r] = sel
    const g = grid.map(x => [...x]); g[c][r] = v; setGrid(g)
    if (!v) return
    if (r < 2) setSel([c, r + 1]); else if (c < 14) setSel([c + 1, 0])
  }

  const saveAB = async () => {
    if (!game) return
    const n = editN ?? game.abs.length + 1
    setBusy(true)
    const r = await fetch(API + '/v1/diary/ab', { method: 'POST', headers: H(), body: JSON.stringify({ game_id: game.id, n, pitches: grid, result, hit_where: where, state, why }) }).catch(() => null)
    setBusy(false)
    if (!r || !r.ok) { flash('Could not save — try again.'); return }
    setGame(await r.json()); resetAB(); flash('Saved. Close the book — back to the team.')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const loadAB = (a: AB) => { setGrid(a.pitches.length ? a.pitches.concat(emptyGrid()).slice(0, 15) : emptyGrid()); setResult(a.result); setWhere(a.hit_where); setState(a.state); setWhy(a.why); setEditN(a.n); setSel([0, 0]); setTab('ab') }

  const closeGame = async () => {
    if (!game) return
    setBusy(true); flash('Coach Nate is reading your book…')
    const r = await fetch(API + '/v1/diary/game/' + game.id + '/close', { method: 'POST', headers: H(), body: JSON.stringify({ review, scout }) }).catch(() => null)
    setBusy(false)
    if (!r || !r.ok) { flash('Could not close the game — try again.'); return }
    const d = await r.json()
    if (d.insight) setInsight({ text: d.insight, created_at: new Date().toISOString() })
    setGame(null); setGFeel([]); setGOpp(''); setGPit(''); setPPitches([]); setPBest(''); setPGoto(''); setGIntent('')
    setReview(''); setScout(''); resetAB(); await refreshHistory(); setTab('ins')
  }

  const refreshInsight = async () => {
    setBusy(true); flash('Coach Nate is reading your book…')
    const r = await fetch(API + '/v1/diary/insights', { method: 'POST', headers: H() }).catch(() => null)
    setBusy(false)
    if (!r || !r.ok) { const d = r ? await r.json().catch(() => ({})) : {}; flash(d.detail || 'Could not refresh.'); return }
    setInsight((await r.json()).insight); flash('Updated.')
  }

  return (
    <main className="min-h-screen bg-black text-white flex flex-col">
      <Nav />
      <section className="flex-1 pt-28 pb-12 px-4 sm:px-8 max-w-xl mx-auto w-full">
        <div className="mb-5 text-center">
          <p className="text-xs font-bold uppercase tracking-[0.35em] mb-1" style={{ color: AQUA }}>Black Diamond AI</p>
          <h1 className="text-2xl font-black">Hitting <span style={{ color: GOLD }}>Diary</span></h1>
          <p className="text-xs text-white/40 mt-1">The Black Book, online. Coach Nate reads it.</p>
        </div>

        {gate === 'loading' && <p className="text-center text-xs text-white/40">Opening your book…</p>}
        {gate === 'nokey' && (
          <div className="rounded-2xl border p-6 text-center" style={box}>
            <p className="text-sm mb-3">Sign in on the Coach Nate page first.</p>
            <a href="/coach-nate" className="text-xs underline" style={{ color: AQUA }}>Go to Coach Nate →</a>
          </div>
        )}
        {gate === 'members' && (
          <div className="rounded-2xl border p-6 text-center" style={box}>
            <p className="text-sm font-black mb-1">Members only.</p>
            <p className="text-xs text-white/50 mb-4">The Hitting Diary is part of the subscription. Your whole season stays in here, and Coach Nate reads it back to you.</p>
            <a href="/coach-nate" className="inline-block rounded-lg px-5 py-2.5 text-xs font-bold uppercase tracking-widest text-black" style={neon}>See membership</a>
          </div>
        )}

        {gate === 'ok' && (
          <>
            <div className="flex gap-1.5 overflow-x-auto pb-2 mb-4">
              <TabBtn id="pre" label="Pre-game" tab={tab} setTab={setTab} />
              <TabBtn id="ab" label="At-bat" tab={tab} setTab={setTab} />
              <TabBtn id="post" label="Post-game" tab={tab} setTab={setTab} />
              <TabBtn id="hist" label="History" tab={tab} setTab={setTab} />
              <TabBtn id="ins" label="Insights" tab={tab} setTab={setTab} />
            </div>
            {msg && <p className="text-xs mb-3" style={{ color: AQUA }}>{msg}</p>}

            {tab === 'pre' && (
              <div className="flex flex-col gap-3">
                {game && <p className="text-xs text-white/40">Editing the open game v {game.opponent || '?'}.</p>}
                <Card title="Before anything happens">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <input className={inp} style={inpStyle} value={gDate} onChange={e => setGDate(e.target.value)} placeholder="Date" />
                    <input className={inp} style={inpStyle} value={gOpp} onChange={e => setGOpp(e.target.value)} placeholder="Opponent" />
                  </div>
                </Card>
                <Card title="The book on the pitcher" sub="what you know before pitch one">
                  <input className={inp} style={inpStyle} value={gPit} onChange={e => setGPit(e.target.value)} placeholder="Starting pitcher — name or #" />
                  <Label t="What they've got" />
                  <Chips items={PITCH_NAMES} value={pPitches} onPick={togglePitch} />
                  {pPitches.length > 0 && (
                    <>
                      <Label t="Best pitch" />
                      <Chips items={pPitches} value={[pBest]} onPick={v => setPBest(v === pBest ? '' : v)} tone={() => 'bad'} />
                      <Label t="Go-to when behind in the count" />
                      <Chips items={pPitches} value={[pGoto]} onPick={v => setPGoto(v === pGoto ? '' : v)} tone={() => 'good'} />
                      <p className="text-[10px] text-white/35 mt-2">Behind in the count is where they get honest. Sit on it.</p>
                    </>
                  )}
                </Card>
                <Card title="How do I feel?" sub="plain and physical">
                  <Chips items={feelItems} value={gFeel} onPick={v => toggle(gFeel, v, setGFeel)} shared={sharedFeels}
                    tone={v => BAD_FEELS.includes(v) ? 'bad' : GOOD_FEELS.includes(v) ? 'good' : ''} />
                  <div className="flex gap-2 mt-2">
                    <input className={inp} style={inpStyle} value={customFeel} onChange={e => setCustomFeel(e.target.value)}
                      onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addCustomFeel() } }}
                      placeholder="Add your own — e.g. Stiff back" maxLength={24} />
                    <button onClick={addCustomFeel} disabled={!customFeel.trim()} className="rounded-lg px-4 text-xs font-bold border shrink-0 disabled:opacity-40" style={{ borderColor: AQUA, color: AQUA }}>Add</button>
                  </div>
                  {sharedFeels.length > 0 && <p className="text-[10px] text-white/30 mt-2"><span style={{ color: GOLD }}>·</span> = words other members use too</p>}
                </Card>
                <Card title="One thing today">
                  <input className={inp} style={inpStyle} value={gIntent} onChange={e => setGIntent(e.target.value)} placeholder="e.g. first-pitch aggression on a strike" />
                </Card>
                <button onClick={startGame} disabled={busy} className="w-full rounded-xl py-3 text-sm font-bold uppercase tracking-widest text-black disabled:opacity-40" style={neon}>{game ? 'Save' : 'Open the game'}</button>
              </div>
            )}

            {tab === 'ab' && !game && (
              <div className="rounded-2xl border p-6 text-center" style={box}>
                <p className="text-sm mb-3">No game open.</p>
                <button onClick={() => setTab('pre')} className="text-xs underline" style={{ color: AQUA }}>Start with pre-game →</button>
              </div>
            )}
            {tab === 'ab' && game && (
              <div className="flex flex-col gap-3">
                {(game.p_best || game.p_goto) && (
                  <p className="text-[11px] text-white/45 font-mono">
                    {game.pitcher || 'Pitcher'}: {game.p_pitches.join(' · ')}{game.p_best && <> · best <span style={{ color: '#e0524a' }}>{game.p_best}</span></>}{game.p_goto && <> · behind <span style={{ color: '#48b36b' }}>{game.p_goto}</span></>}
                  </p>
                )}
                <Card title={`At-bat ${editN ?? game.abs.length + 1}`} sub="tap a cell, then a code">
                  <div className="overflow-x-auto -mx-1">
                    <div className="grid gap-[3px] min-w-max font-mono text-[12px]" style={{ gridTemplateColumns: '46px repeat(15, 32px)' }}>
                      <div />{Array.from({ length: 15 }, (_, i) => <div key={i} className="text-center text-white/35 text-[10px]">{i + 1}</div>)}
                      {ROWS.map((label, r) => (
                        <React.Fragment key={r}>
                          <div className="text-[9px] uppercase tracking-widest text-white/40 flex items-center">{label}</div>
                          {Array.from({ length: 15 }, (_, c) => {
                            const on = sel[0] === c && sel[1] === r
                            return (
                              <button key={c} onClick={() => setSel([c, r])} className="h-8 rounded border flex items-center justify-center"
                                style={{ borderColor: on ? GOLD : grid[c][r] ? AQUA : 'rgba(255,255,255,0.15)', borderRightWidth: c === 9 ? 3 : 1, borderRightColor: c === 9 ? GOLD : undefined, background: 'rgba(0,0,0,0.5)', boxShadow: on ? '0 0 10px rgba(232,199,122,0.4)' : undefined }}>
                                {grid[c][r]}
                              </button>
                            )
                          })}
                        </React.Fragment>
                      ))}
                    </div>
                  </div>
                  {[['Pitch', PITCH], ['Call', CALL], ['Swing', SWING]].map(([lbl, items]) => (
                    <div key={lbl as string} className="mt-2">
                      <p className="text-[9px] uppercase tracking-widest text-white/35 mb-1">{lbl as string}</p>
                      <div className="flex flex-wrap gap-1.5">
                        {(items as string[][]).map(([v, name]) => (
                          <button key={v} onClick={() => setCell(v)} className="text-xs px-2.5 py-1.5 rounded-md border font-mono" style={chip(false)}><b>{v}</b> <span className="text-white/40">{name}</span></button>
                        ))}
                        {lbl === 'Swing' && <button onClick={() => setCell('')} className="text-xs px-2.5 py-1.5 rounded-md border" style={chip(false)}>clear</button>}
                      </div>
                    </div>
                  ))}
                  <p className="text-[10px] text-white/35 mt-2">Gold line = pitch 10. F5 / F3 / F2 = foul, strikes-equivalent.</p>
                </Card>
                <Card title="Result">
                  <Chips items={RESULTS} value={[result]} onPick={v => setResult(v === result ? '' : v)} tone={v => ['1B', '2B', '3B', 'HR', 'SAC'].includes(v) ? 'good' : ['K', 'Kc', 'E'].includes(v) ? 'bad' : ''} />
                  <input className={inp + ' mt-2'} style={inpStyle} value={where} onChange={e => setWhere(e.target.value)} placeholder="Where — e.g. hard GB to 2B" />
                </Card>
                <Card title="State" sub="in the box">
                  <Chips items={STATES} value={state} onPick={v => toggle(state, v, setState)} tone={v => ['Tense', 'Weak', 'Rushed'].includes(v) ? 'bad' : ['Relaxed', 'Strong', 'Clear'].includes(v) ? 'good' : ''} />
                  <textarea className={inp + ' mt-2 resize-none'} style={inpStyle} rows={2} value={why} onChange={e => setWhy(e.target.value)} placeholder="Why. One line. Honest." />
                </Card>
                <button onClick={saveAB} disabled={busy} className="w-full rounded-xl py-3 text-sm font-bold uppercase tracking-widest text-black disabled:opacity-40" style={neon}>{editN ? 'Save changes' : 'Save · next at-bat'}</button>
                {editN && <button onClick={resetAB} className="text-xs text-white/40 underline">Cancel edit</button>}
                {game.abs.length > 0 && (
                  <Card title="This game" sub="tap to edit">
                    <div className="flex flex-col gap-1.5">{game.abs.map(a => <button key={a.n} onClick={() => loadAB(a)} className="text-left"><Line a={a} /></button>)}</div>
                  </Card>
                )}
              </div>
            )}

            {tab === 'post' && !game && (
              <div className="rounded-2xl border p-6 text-center" style={box}><p className="text-sm">No game open.</p></div>
            )}
            {tab === 'post' && game && (
              <div className="flex flex-col gap-3">
                <Card title="Read it back first">
                  <p className="text-xs text-white/45 mb-2">Your own entries. Read them, then write the review. The stats live inside the story.</p>
                  <div className="flex flex-col gap-1.5">{game.abs.map(a => <Line key={a.n} a={a} />)}</div>
                </Card>
                <Card title="How the game went">
                  <textarea className={inp + ' resize-none'} style={inpStyle} rows={4} value={review} onChange={e => setReview(e.target.value)} placeholder="How did I feel across the whole game? What did they keep throwing me?" />
                </Card>
                <Card title="What they think beats me">
                  <input className={inp} style={inpStyle} value={scout} onChange={e => setScout(e.target.value)} placeholder="e.g. drop away early, rise in when ahead" />
                </Card>
                <button onClick={closeGame} disabled={busy} className="w-full rounded-xl py-3 text-sm font-bold uppercase tracking-widest text-black disabled:opacity-40" style={goldBtn}>{busy ? 'Coach Nate is reading…' : 'Close the game'}</button>
              </div>
            )}

            {tab === 'hist' && (
              <Card title="Season so far" sub={`${games.length} games · ${games.reduce((s, g) => s + g.abs.length, 0)} at-bats`}>
                {games.length === 0 && <p className="text-xs text-white/40">Nothing logged yet.</p>}
                <div className="flex flex-col gap-2">
                  {games.map(g => (
                    <div key={g.id} className="rounded-lg border p-3" style={{ borderColor: 'rgba(255,255,255,0.1)', background: 'rgba(0,0,0,0.4)' }}>
                      <p className="text-xs"><span className="font-black" style={{ color: GOLD }}>{g.game_date || '?'}</span> <span className="text-white/60">v {g.opponent || '?'}{g.pitcher ? ' · P ' + g.pitcher : ''}</span>{!g.closed && <span className="ml-2 text-[9px] uppercase tracking-widest" style={{ color: AQUA }}>open</span>}</p>
                      <p className="text-[11px] text-white/45">{g.abs.map(a => a.result || '?').join(', ') || 'no at-bats'}{g.feel.length ? ' · ' + g.feel.join(', ').toLowerCase() : ''}</p>
                      {(g.p_best || g.p_goto) && <p className="text-[11px] text-white/45">Pitcher: {g.p_pitches.join(', ')}{g.p_best ? ' · best ' + g.p_best : ''}{g.p_goto ? ' · behind ' + g.p_goto : ''}</p>}
                      {g.scout && <p className="text-[11px] text-white/45">They think: {g.scout}</p>}
                    </div>
                  ))}
                </div>
                <p className="text-[10px] text-white/30 mt-3">Every at-bat you log stays here while you're a member.</p>
              </Card>
            )}

            {tab === 'ins' && (
              <div className="flex flex-col gap-3">
                <div className="rounded-2xl border p-4" style={{ background: 'rgba(232,199,122,0.08)', borderColor: 'rgba(232,199,122,0.32)' }}>
                  <p className="text-[10px] font-bold uppercase tracking-widest mb-2" style={{ color: GOLD }}>Coach Nate read your diary</p>
                  {insight ? (
                    <>
                      <p className="text-sm leading-relaxed whitespace-pre-wrap">{insight.text}</p>
                      <p className="text-[10px] text-white/30 mt-3">{new Date(insight.created_at).toLocaleDateString('en-NZ')}</p>
                    </>
                  ) : <p className="text-xs text-white/50">Close your first game and I'll read the book.</p>}
                </div>
                <button onClick={refreshInsight} disabled={busy} className="text-xs px-4 py-2 rounded-full border self-start disabled:opacity-40" style={{ borderColor: 'rgba(47,224,240,0.45)', color: AQUA }}>Read it again</button>
                <a href="/coach-nate" className="text-xs px-4 py-2 rounded-full border self-start" style={{ borderColor: 'rgba(255,255,255,0.2)', color: 'rgba(255,255,255,0.6)' }}>Ask Coach Nate about this →</a>
              </div>
            )}
          </>
        )}
      </section>
      <Footer />
    </main>
  )
}