export default function Nav() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-12 py-5 bg-black/80 backdrop-blur-md border-b border-white/5">
      <a href="/" className="flex items-center gap-3">
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
          <polygon points="16,2 30,10 30,22 16,30 2,22 2,10" stroke="#FFD700" strokeWidth="1.5" fill="none"/>
          <polygon points="16,2 30,10 16,16 2,10" stroke="#FFD700" strokeWidth="0.8" fill="none"/>
          <line x1="16" y1="16" x2="16" y2="30" stroke="#FFD700" strokeWidth="0.8"/>
          <line x1="2" y1="22" x2="16" y2="16" stroke="#FFD700" strokeWidth="0.6"/>
          <line x1="30" y1="22" x2="16" y2="16" stroke="#FFD700" strokeWidth="0.6"/>
        </svg>
        <span className="text-xs font-black text-white tracking-wider">BDL</span>
        <span className="text-sm font-semibold text-white/60 hidden sm:block">Black Diamond Labs</span>
      </a>
      <div className="flex items-center gap-10">
        {['Brands','About','Platform','Contact'].map(item => (
          <a key={item} href={item === 'Brands' ? '#brands' : item === 'Contact' ? 'mailto:info@blackdiamondlabs.co.nz' : '#'}
            className="text-xs font-bold uppercase tracking-widest text-white/50 hover:text-white transition-colors hidden md:block">
            {item}
          </a>
        ))}
        <div className="flex flex-col gap-1 cursor-pointer ml-4">
          <span className="block h-px w-5 bg-white/50"/>
          <span className="block h-px w-5 bg-white/50"/>
        </div>
      </div>
    </nav>
  )
}
