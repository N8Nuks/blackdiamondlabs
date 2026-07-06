'use client'
import { useEffect, useRef } from 'react'

// Single-canvas reveal effect: shockwave rings + orbiting particles + core bloom.
// One rAF loop, capped particles, auto-stops (~2.6s). Mobile uses lighter caps.
export default function RevealBurst({ mobile }: { mobile: boolean }) {
  const ref = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const c = ref.current
    if (!c) return
    const x = c.getContext('2d')
    if (!x) return
    const DPR = Math.min(window.devicePixelRatio || 1, mobile ? 1.5 : 2)
    const size = mobile ? 340 : 520
    c.width = size * DPR; c.height = size * DPR
    x.scale(DPR, DPR)
    const cx = size / 2, cy = size / 2

    const N = mobile ? 26 : 60
    const parts = Array.from({ length: N }, (_, i) => {
      const a = (i / N) * Math.PI * 2 + Math.random() * 0.3
      const sp = 1.6 + Math.random() * 2.4
      return { a, r: 20, vr: sp, spin: (Math.random() - 0.5) * 0.05, life: 1, gold: Math.random() > 0.45, sz: 1 + Math.random() * 2 }
    })
    const rings = [0, 8, 16].map(d => ({ r: 0, delay: d }))

    let t = 0
    const dur = mobile ? 140 : 160
    let raf = 0
    const draw = () => {
      t++
      x.clearRect(0, 0, size, size)

      // core bloom
      const bloom = Math.max(0, 1 - t / 40)
      if (bloom > 0) {
        const g = x.createRadialGradient(cx, cy, 0, cx, cy, 120 * bloom + 20)
        g.addColorStop(0, `rgba(255,248,220,${0.9 * bloom})`)
        g.addColorStop(0.4, `rgba(232,199,122,${0.5 * bloom})`)
        g.addColorStop(1, 'rgba(232,199,122,0)')
        x.fillStyle = g; x.fillRect(0, 0, size, size)
      }

      // shockwave rings
      rings.forEach(rg => {
        if (t < rg.delay) return
        rg.r += mobile ? 4.2 : 4.8
        const rl = Math.max(0, 1 - rg.r / (size * 0.62))
        if (rl <= 0) return
        x.beginPath(); x.arc(cx, cy, rg.r, 0, Math.PI * 2)
        x.strokeStyle = `rgba(199,206,218,${rl * 0.55})`
        x.lineWidth = 2 * rl + 0.4; x.stroke()
      })

      // orbiting particles
      parts.forEach(p => {
        p.a += p.spin
        p.r += p.vr
        p.vr *= 0.975              // ease out, orbital arc-back feel
        p.life = Math.max(0, 1 - t / dur)
        if (p.life <= 0) return
        const px = cx + Math.cos(p.a) * p.r
        const py = cy + Math.sin(p.a) * p.r
        x.beginPath(); x.arc(px, py, p.sz * p.life + 0.3, 0, Math.PI * 2)
        x.fillStyle = p.gold ? `rgba(255,215,120,${p.life})` : `rgba(224,236,250,${p.life})`
        x.shadowColor = p.gold ? '#FFD770' : '#C7CEDA'
        x.shadowBlur = mobile ? 4 : 8
        x.fill()
      })
      x.shadowBlur = 0

      if (t < dur) raf = requestAnimationFrame(draw)
      else x.clearRect(0, 0, size, size)
    }
    raf = requestAnimationFrame(draw)
    return () => cancelAnimationFrame(raf)
  }, [mobile])

  return <canvas ref={ref} style={{ position: 'absolute', width: mobile ? 340 : 520, height: mobile ? 340 : 520, left: '50%', top: '50%', transform: 'translate(-50%,-50%)', pointerEvents: 'none', zIndex: 20 }} />
}
