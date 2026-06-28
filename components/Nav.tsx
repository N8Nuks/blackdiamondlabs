'use client'
import { useState } from 'react'

export default function Nav() {
  const [open, setOpen] = useState(false)

  const links = [
    { label: 'Brands', href: '/brands' },
    { label: 'About', href: '/about' },
    { label: 'Platform', href: '/platform' },
    { label: 'Contact', href: '/contact' },
  ]

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 sm:px-12 py-4 bg-black/90 backdrop-blur-md border-b border-white/5">

        {/* Logo */}
        <a href="/" className="flex items-center gap-3">
          <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
            <polygon points="16,2 30,10 30,22 16,30 2,22 2,10" stroke="#00CFFF" strokeWidth="1.5" fill="none"/>
            <line x1="16" y1="2" x2="16" y2="16" stroke="#00CFFF" strokeWidth="0.8"/>
            <line x1="2" y1="10" x2="16" y2="16" stroke="#00CFFF" strokeWidth="0.6"/>
            <line x1="30" y1="10" x2="16" y2="16" stroke="#00CFFF" strokeWidth="0.6"/>
          </svg>
          <span className="text-xs font-black text-white tracking-wider hidden sm:block">BDL</span>
          <span className="text-sm font-semibold text-white/60 hidden lg:block">Black Diamond Labs</span>
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-10">
          {links.map(l => (
            <a key={l.label} href={l.href}
              className="text-xs font-bold uppercase tracking-widest text-white/50 hover:text-white transition-colors">
              {l.label}
            </a>
          ))}
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setOpen(!open)}
          aria-label="Menu">
          <span className={`block h-px w-6 bg-white transition-all duration-300 ${open ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block h-px w-6 bg-white transition-all duration-300 ${open ? 'opacity-0' : ''}`} />
          <span className={`block h-px w-6 bg-white transition-all duration-300 ${open ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </nav>

      {/* Mobile menu overlay */}
      {open && (
        <div className="fixed inset-0 z-40 bg-black flex flex-col items-center justify-center gap-10 md:hidden"
          onClick={() => setOpen(false)}>
          {links.map(l => (
            <a key={l.label} href={l.href}
              className="text-3xl font-black text-white hover:text-cyan-400 transition-colors uppercase tracking-widest"
              onClick={() => setOpen(false)}>
              {l.label}
            </a>
          ))}
          <a href="mailto:info@blackdiamondlabs.co.nz"
            className="text-xs text-white/30 mt-8 tracking-widest">
            info@blackdiamondlabs.co.nz
          </a>
        </div>
      )}
    </>
  )
}
