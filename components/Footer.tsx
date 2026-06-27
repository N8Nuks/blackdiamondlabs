export default function Footer() {
  return (
    <footer className="border-t border-white/5 px-12 py-8 bg-black">
      <div className="mx-auto max-w-6xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <svg width="20" height="20" viewBox="0 0 32 32" fill="none">
            <polygon points="16,2 30,10 30,22 16,30 2,22 2,10" stroke="#00CFFF" strokeWidth="1.5" fill="none"/>
            <line x1="16" y1="2" x2="16" y2="16" stroke="#00CFFF" strokeWidth="0.8"/>
            <line x1="2" y1="10" x2="16" y2="16" stroke="#00CFFF" strokeWidth="0.6"/>
            <line x1="30" y1="10" x2="16" y2="16" stroke="#00CFFF" strokeWidth="0.6"/>
          </svg>
          <span className="text-sm text-white/30">Black Diamond Labs Ltd</span>
        </div>
        <div className="flex items-center gap-6 text-xs text-white/20">
          <a href="https://grassrootsfantasy.co.nz" className="hover:text-white/50 transition-colors">Grassroots Fantasy</a>
          <a href="mailto:info@blackdiamondlabs.co.nz" className="hover:text-white/50 transition-colors">info@blackdiamondlabs.co.nz</a>
        </div>
        <p className="text-xs text-white/20">© 2026 Black Diamond Labs Ltd</p>
      </div>
    </footer>
  )
}
