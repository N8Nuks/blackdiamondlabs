'use client'
import React, { useEffect, useState } from 'react'

const API = 'https://api.blackdiamondlabs.co.nz'
const TOKEN_STORE = 'bdai-admin-token'

type KeyRow = {
  label: string; tier: string; voice_enabled: number; active: number
  created_at: number; last_used: number | null
  calls_today: number; calls_period: number
  out_tokens: number; cache_read: number; cache_write: number; voice_chars: number
}
type Overview = {
  keys: KeyRow[]
  totals: { calls: number; input_tokens: number; output_tokens: number; cache_read: number; cache_write: number; voice_chars: number; est_cost_nzd: number; days: number }
  daily_limit: number
}

export default function Admin() {
  const [token, setToken] = useState('')
  const [authed, setAuthed] = useState(false)
  const [data, setData] = useState<Overview | null>(null)
  const [days, setDays] = useState(7)
  const [err, setErr] = useState('')
  const [busy, setBusy] = useState(false)
  const [health, setHealth] = useState<{ ok: boolean; corpus_files: number } | null>(null)
  const [newLabel, setNewLabel] = useState('')
  const [newTier, setNewTier] = useState<'user' | 'admin'>('user')
  const [minted, setMinted] = useState('')
  const [confirm, setConfirm] = useState('')

  useEffect(() => {
    try { const t = localStorage.getItem(TOKEN_STORE); if (t) { setToken(t); load(t, days) } } catch {}
    fetch(API + '/health').then(r => r.json()).then(setHealth).catch(() => setHealth(null))
  }, [])

  const load = async (t: string, d: number) => {
    setBusy(true); setErr('')
    try {
      const r = await fetch(`${API}/admin/overview?days=${d}`, { headers: { 'X-Admin-Token': t } })
      if (r.status === 403) { setErr('Bad admin token.'); setAuthed(false); return }
      if (!r.ok) { setErr('HTTP ' + r.status); return }
      setData(await r.json())
      setAuthed(true)
      try { localStorage.setItem(TOKEN_STORE, t) } catch {}
    } catch (e) {
      setErr('Connection issue — could not reach the API.')
    } finally { setBusy(false) }
  }

  const act = async (path: string) => {
    setBusy(true); setErr('')
    try {
      const r = await fetch(API + path, { method: 'POST', headers: { 'X-Admin-Token': token } })
      if (!r.ok) setErr('Action failed: HTTP ' + r.status)
      await load(token, days)
    } catch { setErr('Connection issue during action.') } finally { setBusy(false) }
  }

  const mint = async () => {
    if (!newLabel.trim()) { setErr('Give the key a label first.'); return }
    setBusy(true); setErr(''); setMinted('')
    try {
      const r = await fetch(API + '/admin/keys', {
        method: 'POST',
        headers: { 'X-Admin-Token': token, 'Content-Type': 'application/json' },
        body: JSON.stringify({ label: newLabel.trim(), tier: newTier }),
      })
      if (!r.ok) { setErr('Mint failed: HTTP ' + r.status); return }
      const d = await r.json()
      setMinted(d.api_key || '')
      setNewLabel('')
      await load(token, days)
    } catch { setErr('Connection issue while minting.') } finally { setBusy(false) }
  }

  const fmtAgo = (ts: number | null) => {
    if (!ts) return '—'
    const s = Math.floor(Date.now() / 1000) - ts
    if (s < 3600) return Math.floor(s / 60) + 'm ago'
    if (s < 86400) return Math.floor(s / 3600) + 'h ago'
    return Math.floor(s / 86400) + 'd ago'
  }

  const signOut = () => { setAuthed(false); setToken(''); setData(null); try { localStorage.removeItem(TOKEN_STORE) } catch {} }

  return (
    <main className="min-h-screen bg-black text-white px-4 sm:px-8 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <p className="text-xs font-bold uppercase tracking-[0.35em] mb-1" style={{ color: '#E8C77A' }}>Black Diamond Labs</p>
          <h1 className="text-3xl font-black">BDL Ops</h1>
        </div>

        {!authed ? (
          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-8 max-w-md">
            <h2 className="text-lg font-black mb-2">Admin access</h2>
            <p className="text-sm text-white/40 mb-6">Enter the BDAI admin token.</p>
            <input
              type="password"
              value={token}
              onChange={e => setToken(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && load(token, days)}
              placeholder="Admin token"
              className="w-full rounded-lg bg-black border border-white/15 px-4 py-3 text-sm mb-4 focus:outline-none focus:border-white/40"
            />
            <button onClick={() => load(token, days)} disabled={busy || !token.trim()}
              className="w-full rounded-lg py-3 text-sm font-bold uppercase tracking-widest text-black disabled:opacity-40"
              style={{ background: 'linear-gradient(90deg,#B8860B,#FFD700,#FFF3C4,#FFD700,#B8860B)', backgroundSize: '200% auto' }}>
              {busy ? 'Checking…' : 'Enter'}
            </button>
            {err && <p className="text-xs text-red-400 mt-3">{err}</p>}
          </div>
        ) : (
          <>
            {/* Health strip */}
            <div className="flex flex-wrap gap-3 mb-6 text-xs">
              <span className={`px-3 py-1.5 rounded-full border ${health?.ok ? 'border-green-500/40 text-green-400' : 'border-red-500/40 text-red-400'}`}>
                API {health?.ok ? '● online' : '● down'}
              </span>
              <span className="px-3 py-1.5 rounded-full border border-white/15 text-white/50">
                Corpus: {health?.corpus_files ?? '—'} files
              </span>
              <span className="px-3 py-1.5 rounded-full border border-white/15 text-white/50">
                Fair-use limit: {data?.daily_limit ?? '—'}/day
              </span>
              <button onClick={() => load(token, days)} disabled={busy}
                className="px-3 py-1.5 rounded-full border border-white/15 text-white/50 hover:text-white disabled:opacity-40">
                {busy ? 'Refreshing…' : '↻ Refresh'}
              </button>
              <button onClick={signOut} className="px-3 py-1.5 rounded-full border border-white/15 text-white/30 hover:text-white/70 ml-auto">
                Sign out
              </button>
            </div>

            {/* Totals / cost banner */}
            {data && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
                <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5">
                  <p className="text-[10px] uppercase tracking-widest text-white/40 mb-1">Est. cost ({data.totals.days}d)</p>
                  <p className="text-2xl font-black" style={{ color: '#E8C77A' }}>NZ${data.totals.est_cost_nzd}</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5">
                  <p className="text-[10px] uppercase tracking-widest text-white/40 mb-1">Calls ({data.totals.days}d)</p>
                  <p className="text-2xl font-black">{data.totals.calls}</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5">
                  <p className="text-[10px] uppercase tracking-widest text-white/40 mb-1">Voice chars</p>
                  <p className="text-2xl font-black">{data.totals.voice_chars.toLocaleString()}</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5">
                  <p className="text-[10px] uppercase tracking-widest text-white/40 mb-1">Window</p>
                  <div className="flex gap-2 mt-1">
                    {[1, 7, 30].map(d => (
                      <button key={d} onClick={() => { setDays(d); load(token, d) }}
                        className={`px-3 py-1 rounded-full text-xs border ${days === d ? 'border-yellow-400/60 text-yellow-300' : 'border-white/15 text-white/40'}`}>
                        {d}d
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Mint new key */}
            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5 mb-8">
              <h3 className="font-black text-sm mb-3" style={{ color: '#E8C77A' }}>Mint new key</h3>
              <div className="flex flex-wrap gap-2">
                <input value={newLabel} onChange={e => setNewLabel(e.target.value)}
                  placeholder="Label (e.g. ramblers-club, trial-smithj)"
                  className="flex-1 min-w-[220px] rounded-lg bg-black border border-white/15 px-4 py-2.5 text-sm focus:outline-none focus:border-white/40" />
                <select value={newTier} onChange={e => setNewTier(e.target.value as 'user' | 'admin')}
                  className="rounded-lg bg-black border border-white/15 px-3 py-2.5 text-sm">
                  <option value="user">user</option>
                  <option value="admin">admin</option>
                </select>
                <button onClick={mint} disabled={busy || !newLabel.trim()}
                  className="rounded-lg px-5 py-2.5 text-sm font-bold text-black disabled:opacity-40"
                  style={{ background: 'linear-gradient(90deg,#B8860B,#FFD700,#FFF3C4,#FFD700,#B8860B)', backgroundSize: '200% auto' }}>
                  Mint
                </button>
              </div>
              {minted && (
                <div className="mt-4 rounded-lg border border-green-500/30 bg-green-500/5 p-4">
                  <p className="text-xs text-green-300 mb-2 font-bold">New key — shown once only. Copy it now:</p>
                  <div className="flex gap-2 items-center">
                    <code className="text-xs break-all text-white/80 flex-1">{minted}</code>
                    <button onClick={() => navigator.clipboard?.writeText(minted)}
                      className="text-xs px-3 py-1.5 rounded-lg border border-white/20 text-white/60 hover:text-white shrink-0">
                      Copy
                    </button>
                  </div>
                </div>
              )}
            </div>

            {err && <p className="text-xs text-red-400 mb-4">{err}</p>}

            {/* Keys table */}
            {data && (
              <div className="overflow-x-auto rounded-2xl border border-white/10">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="text-left text-white/40 border-b border-white/10">
                      <th className="p-3">Label</th>
                      <th className="p-3">Tier</th>
                      <th className="p-3">Voice</th>
                      <th className="p-3">Active</th>
                      <th className="p-3">Today</th>
                      <th className="p-3">{days}d calls</th>
                      <th className="p-3">Voice chars</th>
                      <th className="p-3">Last used</th>
                      <th className="p-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.keys.map(k => {
                      const nearLimit = k.tier !== 'admin' && k.calls_today >= data.daily_limit * 0.8
                      const isSub = k.label.startsWith('sub-')
                      return (
                        <tr key={k.label} className={`border-b border-white/5 ${!k.active ? 'opacity-40' : ''}`}>
                          <td className="p-3 font-bold">
                            {k.label}
                            {isSub && <span className="ml-2 text-[9px] px-1.5 py-0.5 rounded-full border border-blue-400/40 text-blue-300">STRIPE</span>}
                            {nearLimit && <span className="ml-2 text-[9px] px-1.5 py-0.5 rounded-full border border-yellow-400/50 text-yellow-300">NEAR LIMIT</span>}
                          </td>
                          <td className="p-3">{k.tier}</td>
                          <td className="p-3">{k.voice_enabled ? '🔊' : '—'}</td>
                          <td className="p-3">{k.active ? '✅' : '❌'}</td>
                          <td className="p-3">{k.calls_today}</td>
                          <td className="p-3">{k.calls_period}</td>
                          <td className="p-3">{k.voice_chars.toLocaleString()}</td>
                          <td className="p-3">{fmtAgo(k.last_used)}</td>
                          <td className="p-3">
                            <div className="flex flex-wrap gap-1.5">
                              <button onClick={() => act(`/admin/keys/${encodeURIComponent(k.label)}/toggle-voice`)}
                                className="px-2 py-1 rounded border border-white/15 text-white/50 hover:text-white">voice</button>
                              <button onClick={() => {
                                  const id = k.label + ':active'
                                  if (confirm === id) { setConfirm(''); act(`/admin/keys/${encodeURIComponent(k.label)}/toggle-active`) }
                                  else setConfirm(id)
                                }}
                                className={`px-2 py-1 rounded border ${confirm === k.label + ':active' ? 'border-red-400 text-red-300 font-bold' : 'border-white/15 text-white/50 hover:text-white'}`}>
                                {confirm === k.label + ':active' ? 'sure?' : (k.active ? 'kill' : 'revive')}
                              </button>
                              <button onClick={() => {
                                  const id = k.label + ':tier'
                                  if (confirm === id) { setConfirm(''); act(`/admin/keys/${encodeURIComponent(k.label)}/set-tier/${k.tier === 'admin' ? 'user' : 'admin'}`) }
                                  else setConfirm(id)
                                }}
                                className={`px-2 py-1 rounded border ${confirm === k.label + ':tier' ? 'border-red-400 text-red-300 font-bold' : 'border-white/15 text-white/50 hover:text-white'}`}>
                                {confirm === k.label + ':tier' ? 'sure?' : 'tier'}
                              </button>
                              <button onClick={() => act(`/admin/keys/${encodeURIComponent(k.label)}/reset-today`)}
                                className="px-2 py-1 rounded border border-white/15 text-white/50 hover:text-white">reset</button>
                            </div>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            )}
            <p className="text-[10px] text-white/25 mt-4">
              Revenue & refunds live in <a href="https://dashboard.stripe.com" className="underline hover:text-white/60" target="_blank" rel="noreferrer">Stripe</a>. Raw keys are never shown — hashes only. Backup status coming with the nightly-backup build.
            </p>
          </>
        )}
      </div>
    </main>
  )
}