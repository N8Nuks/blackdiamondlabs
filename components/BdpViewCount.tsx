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
    <div className="fixed bottom-4 right-4 z-40 rounded-full px-4 py-2 backdrop-blur-md"
      style={{ border: '1px solid #7B5BFF55', background: 'rgba(10,8,20,0.75)', boxShadow: '0 0 18px rgba(123,91,255,0.25)' }}>
      <span className="text-sm font-black tabular-nums" style={{ color: '#A855F7' }}>{count.toLocaleString()}</span>
      <span className="text-[10px] uppercase tracking-widest text-white/45 ml-2">visitors</span>
    </div>
  )
}