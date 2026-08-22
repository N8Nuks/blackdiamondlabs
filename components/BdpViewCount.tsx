'use client'
import { useEffect, useState } from 'react'

const API = 'https://api.blackdiamondlabs.co.nz'
const THRESHOLD = 25

export default function BdpViewCount() {
  const [count, setCount] = useState<number | null>(null)

  useEffect(() => {
    let cancelled = false
    const run = async () => {
      try {
        const seen = sessionStorage.getItem('bdp-viewed')
        const url = API + (seen ? '/v1/bdp/views' : '/v1/bdp/view')
        const r = await fetch(url, { method: seen ? 'GET' : 'POST' })
        if (!seen) sessionStorage.setItem('bdp-viewed', '1')
        const d = await r.json()
        if (!cancelled && typeof d.views === 'number') setCount(d.views)
      } catch {}
    }
    run()
    return () => { cancelled = true }
  }, [])

  if (count === null || count < THRESHOLD) return null

  return (
    <p className="text-center text-[11px] uppercase tracking-[0.25em] text-white/25 mt-12">
      <span className="tabular-nums">{count.toLocaleString()}</span> visitors to this page
    </p>
  )
}