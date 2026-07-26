'use client'
import { useState } from 'react'

const API = 'https://api.blackdiamondlabs.co.nz'

export default function PerformanceWaitlist() {
  const [email, setEmail] = useState('')
  const [busy, setBusy] = useState(false)
  const [done, setDone] = useState(false)
  const [err, setErr] = useState('')

  const go = async () => {
    if (busy || !email.includes('@')) return
    setBusy(true); setErr('')
    try {
      const r = await fetch(API + '/v1/bdp/interest', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim() }),
      })
      if (r.ok) setDone(true)
      else setErr('Something went wrong — try again or use the contact page.')
    } catch {
      setErr('Connection issue — try again in a moment.')
    } finally {
      setBusy(false)
    }
  }

  if (done) return (
    <p className="text-sm font-bold" style={{ color: '#C7CEDA' }}>
      You&apos;re on the list — first to know when bookings open. Ka pai.
    </p>
  )

  return (
    <div>
      <p className="text-sm font-bold mb-3" style={{ color: '#C7CEDA' }}>Be first in when bookings open — launch pricing for the first group.</p>
      <div className="flex flex-col sm:flex-row gap-3 max-w-md">
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && go()}
          placeholder="Your email"
          className="flex-1 rounded-lg bg-black border border-white/15 px-4 py-3 text-sm focus:outline-none focus:border-white/40"
        />
        <button onClick={go} disabled={busy || !email.includes('@')}
          className="rounded-lg px-6 py-3 text-sm font-bold border disabled:opacity-40"
          style={{ borderColor: '#C7CEDA', color: '#C7CEDA', background: '#C7CEDA14' }}>
          {busy ? '…' : 'Notify me'}
        </button>
      </div>
      {err && <p className="text-xs text-red-400 mt-2">{err}</p>}
    </div>
  )
}