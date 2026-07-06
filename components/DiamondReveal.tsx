'use client'
import React, { useEffect, useState } from 'react'

const FACETS = [
  { pts: '185,72 335,72 345,165 260,180 175,165', fill: 'url(#gTable)', t: 'translate(0px,-260px) rotate(-8deg)' },
  { pts: '185,72 98,150 175,165', fill: 'url(#gBezelL)', t: 'translate(-147px,-215px) rotate(-25deg)' },
  { pts: '98,150 30,238 148,238 175,165', fill: 'url(#gCrownL)', t: 'translate(-222px,-134px) rotate(-18deg)' },
  { pts: '175,165 148,238 260,238 260,180', fill: 'url(#gMidL)', t: 'translate(-133px,-223px) rotate(12deg)' },
  { pts: '335,72 422,150 345,165', fill: 'url(#gBezelR)', t: 'translate(146px,-215px) rotate(25deg)' },
  { pts: '422,150 490,238 372,238 345,165', fill: 'url(#gCrownR)', t: 'translate(222px,-134px) rotate(18deg)' },
  { pts: '345,165 372,238 260,238 260,180', fill: 'url(#gMidR)', t: 'translate(133px,-223px) rotate(-12deg)' },
  { pts: '30,238 148,238 260,502', fill: 'url(#gPavOutL)', t: 'translate(-246px,84px) rotate(-30deg)' },
  { pts: '148,238 260,238 260,502', fill: 'url(#gPavInL)', t: 'translate(-178px,188px) rotate(20deg)' },
  { pts: '260,238 372,238 260,502', fill: 'url(#gPavInR)', t: 'translate(178px,188px) rotate(-20deg)' },
  { pts: '372,238 490,238 260,502', fill: 'url(#gPavOutR)', t: 'translate(246px,84px) rotate(30deg)' },
]

export default function DiamondReveal() {
  const [revealed, setRevealed] = useState(false)
  const [shatter, setShatter] = useState(false)

  useEffect(() => {
    try {
      if (localStorage.getItem('bdl-diamond-opened') === new Date().toDateString()) setRevealed(true)
    } catch {}
  }, [])

  const crack = () => {
    if (shatter || revealed) return
    setShatter(true)
    setTimeout(() => {
      setRevealed(true)
      try { localStorage.setItem('bdl-diamond-opened', new Date().toDateString()) } catch {}
    }, 950)
  }

  if (revealed) {
    const sparks: number[][] = [
      [8,18,1.4,0],[85,12,1,0.7],[16,72,1.1,1.3],[78,80,1.5,2.1],[50,4,0.9,2.8],
      [4,45,1,3.4],[92,48,1.2,1.9],[30,90,1,0.4],[66,92,1.3,2.5],[24,30,0.8,1.6],
      [72,28,1,3.1],[42,60,0.7,0.9],[58,38,0.9,3.8],[12,58,1.2,4.2],
    ]
    return (
      <div className="relative z-10 flex items-center justify-center" style={{ width: 520, height: 540, maxWidth: '100%' }}>
        <style>{`
          @keyframes bdReveal { from { transform: scale(.45); opacity: 0; } to { transform: scale(1); opacity: 1; } }
          @keyframes bdAura { 0%, 100% { filter: drop-shadow(0 0 22px rgba(214,222,235,.65)) drop-shadow(0 0 55px rgba(199,206,218,.35)); } 50% { filter: drop-shadow(0 0 40px rgba(240,245,252,1)) drop-shadow(0 0 90px rgba(220,228,240,.7)); } }
          @keyframes bdFloat { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-12px); } }
          @keyframes bdTwinkle { 0%,100% { opacity: 0; transform: scale(.2) rotate(0deg); } 50% { opacity: 1; transform: scale(1) rotate(180deg); } }
          @keyframes bdHalo { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        `}</style>
        <div style={{ position: 'absolute', width: 420, height: 420, borderRadius: '50%', background: 'conic-gradient(from 0deg, transparent 0deg, rgba(199,206,218,0.14) 20deg, transparent 60deg, transparent 180deg, rgba(232,199,122,0.12) 200deg, transparent 240deg)', animation: 'bdHalo 14s linear infinite', filter: 'blur(2px)' }} />
        {sparks.map(([x, y, sc, dl], i) => (
          <span key={i} style={{ position: 'absolute', left: x + '%', top: y + '%', fontSize: 10 + sc * 8, color: i % 3 === 2 ? '#E8C77A' : '#EDF2FA', textShadow: '0 0 8px rgba(235,242,250,.9), 0 0 18px rgba(199,206,218,.6)', animation: 'bdTwinkle ' + (2.6 + (i % 4) * 0.7) + 's ease-in-out ' + dl + 's infinite', pointerEvents: 'none', userSelect: 'none' }}>{i % 2 ? '\u2727' : '\u2726'}</span>
        ))}
        <div style={{ animation: 'bdFloat 6s ease-in-out infinite', position: 'relative', left: 18 }}>
          <img src="/logo-mark.png" alt="Black Diamond Labs" style={{ width: 430, maxWidth: '90%', animation: 'bdReveal .8s ease-out both, bdAura 3.2s ease-in-out .8s infinite' }} />
        </div>
      </div>
    )
  }

  const facetStyle = (t: string): React.CSSProperties => ({
    transformBox: 'fill-box',
    transformOrigin: 'center',
    transition: 'transform .95s cubic-bezier(.45,0,1,1), opacity .95s ease-in',
    transform: shatter ? t : 'none',
    opacity: shatter ? 0 : 1,
  })
  const fadeStyle: React.CSSProperties = { opacity: shatter ? 0 : 1, transition: 'opacity .45s ease-out' }

  return (
    <div className="animate-diamond relative z-10" style={{ width: 520, height: 540 }}>
      <style>{'@keyframes bdPulse { 0%, 100% { opacity: .35; } 50% { opacity: 1; } } @keyframes bdRing { from { transform: scale(.5); opacity: .9; } to { transform: scale(2.4); opacity: 0; } }'}</style>
      <svg viewBox="0 0 520 540" fill="none" xmlns="http://www.w3.org/2000/svg" width="520" height="540">
        <defs>
          <radialGradient id="gTable" cx="50%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#d6d6d6" stopOpacity="0.85"/>
            <stop offset="55%" stopColor="#5a5a5a" stopOpacity="0.6"/>
            <stop offset="100%" stopColor="#0a0a0a" stopOpacity="0.95"/>
          </radialGradient>
          <linearGradient id="gBezelL" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#bdbdbd" stopOpacity="0.8"/><stop offset="100%" stopColor="#1a1a1a" stopOpacity="0.95"/></linearGradient>
          <linearGradient id="gBezelR" x1="100%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stopColor="#bdbdbd" stopOpacity="0.8"/><stop offset="100%" stopColor="#1a1a1a" stopOpacity="0.95"/></linearGradient>
          <linearGradient id="gCrownL" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#6a6a6a" stopOpacity="0.6"/><stop offset="100%" stopColor="#050505" stopOpacity="1"/></linearGradient>
          <linearGradient id="gCrownR" x1="100%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stopColor="#6a6a6a" stopOpacity="0.6"/><stop offset="100%" stopColor="#050505" stopOpacity="1"/></linearGradient>
          <linearGradient id="gMidL" x1="0%" y1="0%" x2="60%" y2="100%"><stop offset="0%" stopColor="#909090" stopOpacity="0.55"/><stop offset="100%" stopColor="#0a0a0a" stopOpacity="1"/></linearGradient>
          <linearGradient id="gMidR" x1="100%" y1="0%" x2="40%" y2="100%"><stop offset="0%" stopColor="#909090" stopOpacity="0.55"/><stop offset="100%" stopColor="#0a0a0a" stopOpacity="1"/></linearGradient>
          <linearGradient id="gPavInL" x1="50%" y1="0%" x2="50%" y2="100%"><stop offset="0%" stopColor="#3a3a3a" stopOpacity="0.65"/><stop offset="100%" stopColor="#000000" stopOpacity="1"/></linearGradient>
          <linearGradient id="gPavInR" x1="50%" y1="0%" x2="50%" y2="100%"><stop offset="0%" stopColor="#3a3a3a" stopOpacity="0.65"/><stop offset="100%" stopColor="#000000" stopOpacity="1"/></linearGradient>
          <linearGradient id="gPavOutL" x1="0%" y1="0%" x2="80%" y2="100%"><stop offset="0%" stopColor="#181818" stopOpacity="0.8"/><stop offset="100%" stopColor="#000000" stopOpacity="1"/></linearGradient>
          <linearGradient id="gPavOutR" x1="100%" y1="0%" x2="20%" y2="100%"><stop offset="0%" stopColor="#181818" stopOpacity="0.8"/><stop offset="100%" stopColor="#000000" stopOpacity="1"/></linearGradient>
          <radialGradient id="culetGlow" cx="50%" cy="50%" r="50%"><stop offset="0%" stopColor="#22D3EE" stopOpacity="1"/><stop offset="60%" stopColor="#22D3EE" stopOpacity="0.25"/><stop offset="100%" stopColor="#22D3EE" stopOpacity="0"/></radialGradient>
          <filter id="culetFilter" x="-150%" y="-150%" width="400%" height="400%"><feGaussianBlur stdDeviation="5"/></filter>
          <filter id="edgeGlow"><feGaussianBlur stdDeviation="1.4" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
        </defs>
        {FACETS.map((f, i) => (
          <polygon key={i} points={f.pts} fill={f.fill} stroke="#67E8F9" strokeWidth="0.8" strokeOpacity="0.55" style={facetStyle(f.t)} />
        ))}
        <g style={fadeStyle}>
          <path d="M185,72 L260,180 L335,72" stroke="#67E8F9" strokeWidth="0.5" strokeOpacity="0.4" fill="none"/>
          <path d="M260,72 L260,180" stroke="#67E8F9" strokeWidth="0.4" strokeOpacity="0.3" fill="none"/>
          <path d="M30,238 L490,238" stroke="#67E8F9" strokeWidth="0.6" strokeOpacity="0.45" fill="none"/>
          <path d="M185,72 L335,72 L422,150 L490,238 L260,502 L30,238 L98,150 Z" fill="none" stroke="#22D3EE" strokeWidth="1.4" strokeOpacity="0.8" filter="url(#edgeGlow)"/>
          <ellipse cx="260" cy="512" rx="130" ry="14" fill="none" stroke="#22D3EE" strokeWidth="0.7" strokeOpacity="0.35"/>
          <ellipse cx="260" cy="518" rx="190" ry="11" fill="none" stroke="#22D3EE" strokeWidth="0.5" strokeOpacity="0.2"/>
          <ellipse cx="260" cy="524" rx="240" ry="9" fill="none" stroke="#22D3EE" strokeWidth="0.3" strokeOpacity="0.12"/>
          <circle cx="260" cy="500" r="24" fill="url(#culetGlow)" filter="url(#culetFilter)" style={{ animation: 'bdPulse 1.8s ease-in-out infinite' }}/>
          <circle cx="260" cy="502" r="2.5" fill="#E0FCFF"/>
          <circle cx="260" cy="502" r="10" fill="none" stroke="#22D3EE" strokeWidth="1.2" style={{ transformBox: 'fill-box', transformOrigin: 'center', animation: 'bdRing 1.8s ease-out infinite' }}/>
          <circle cx="260" cy="502" r="32" fill="transparent" style={{ cursor: 'pointer' }} onClick={crack}/>
        </g>
      </svg>
    </div>
  )
}
