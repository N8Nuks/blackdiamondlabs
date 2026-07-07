'use client'
import { useEffect, useRef } from 'react'

// Cinematic reveal: core flash -> light rays -> shockwaves -> particle storm.
// Single canvas, one rAF loop, hard caps, auto-stops (~2.8s).
export default function RevealBurst({ mobile }: { mobile: boolean }) {
  const ref = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const c = ref.current
    if (!c) return
    const x = c.getContext('2d')
    if (!x) return
    const DPR = Math.min(window.devicePixelRatio || 1, mobile ? 1.5 : 2)
    const size = mobile ? 360 : 560
    c.width = size * DPR; c.height = size * DPR
    x.scale(DPR, DPR)
    const cx = size / 2, cy = size / 2

    const NP = mobile ? 30 : 90
    const parts = Array.from({ length: NP }, (_, i) => {
      const a = (i / NP) * Math.PI * 2 + Math.random() * 0.4
      return { a, r: 16, vr: 2.2 + Math.random() * 3.4, spin: (Math.random() - 0.5) * 0.06, gold: Math.random() > 0.45, sz: 1 + Math.random() * 2.2 }
    })
    const NR = mobile ? 8 : 14
    const rays = Array.from({ length: NR }, (_, i) => ({
      a: (i / NR) * Math.PI * 2 + Math.random() * 0.2,
      w: 0.02 + Math.random() * 0.045,
      sp: 5 + Math.random() * 4,
      len: 0,
      gold: i % 3 === 0,
    }))
    const rings = [0, 7, 15].map(d => ({ r: 0, delay: d }))

    let t = 0
    const dur = mobile ? 150 : 170
    let raf = 0
    const draw = () => {
      t++
      x.clearRect(0, 0, size, size)

      // 1. core flash (first ~14 frames, screen-filling bloom)
      const fl = Math.max(0, 1 - t / 14)
      if (fl > 0) {
        const g = x.createRadialGradient(cx, cy, 0, cx, cy, size * 0.55)
        g.addColorStop(0, `rgba(255,255,255,${0.95 * fl})`)
        g.addColorStop(0.35, `rgba(240,244,252,${0.6 * fl})`)
        g.addColorStop(1, 'rgba(232,199,122,0)')
        x.fillStyle = g; x.fillRect(0, 0, size, size)
      }

      // 2. light rays
      const rayLife = Math.max(0, 1 - t / 55)
      if (rayLife > 0) {
        rays.forEach(r => {
          r.len += r.sp
          const L = Math.min(r.len, size * 0.52)
          x.save(); x.translate(cx, cy); x.rotate(r.a)
          const grad = x.createLinearGradient(0, 0, L, 0)
          const col = r.gold ? '255,215,120' : '224,236,250'
          grad.addColorStop(0, `rgba(${col},${0.75 * rayLife})`)
          grad.addColorStop(1, `rgba(${col},0)`)
          x.fillStyle = grad
          x.beginPath()
          x.moveTo(20, 0)
          x.lineTo(L, -L * r.w)
          x.lineTo(L, L * r.w)
          x.closePath(); x.fill(); x.restore()
        })
      }

      // 3. shockwave rings
      rings.forEach(rg => {
        if (t < rg.delay) return
        rg.r += mobile ? 4.4 : 5.2
        const rl = Math.max(0, 1 - rg.r / (size * 0.6))
        if (rl <= 0) return
        x.beginPath(); x.arc(cx, cy, rg.r, 0, Math.PI * 2)
        x.strokeStyle = `rgba(199,206,218,${rl * 0.6})`
        x.lineWidth = 2.2 * rl + 0.4; x.stroke()
      })

      // 4. particle storm, orbital arc-back
      const pl = Math.max(0, 1 - t / dur)
      parts.forEach(p => {
        p.a += p.spin
        p.r += p.vr
        p.vr *= 0.972
        if (pl <= 0) return
        const px = cx + Math.cos(p.a) * p.r
        const py = cy + Math.sin(p.a) * p.r
        x.beginPath(); x.arc(px, py, p.sz * pl + 0.3, 0, Math.PI * 2)
        x.fillStyle = p.gold ? `rgba(255,215,120,${pl})` : `rgba(224,236,250,${pl})`
        x.shadowColor = p.gold ? '#FFD770' : '#C7CEDA'
        x.shadowBlur = mobile ? 4 : 9
        x.fill()
      })
      x.shadowBlur = 0

      if (t < dur) raf = requestAnimationFrame(draw)
      else x.clearRect(0, 0, size, size)
    }
    raf = requestAnimationFrame(draw)
    return () => cancelAnimationFrame(raf)
  }, [mobile])

  return <canvas ref={ref} style={{ position: 'absolute', width: mobile ? 360 : 560, height: mobile ? 360 : 560, left: '50%', top: '50%', transform: 'translate(-50%,-50%)', pointerEvents: 'none', zIndex: 20 }} />
}
