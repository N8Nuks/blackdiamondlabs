export default function Footer() {
  return (
    <>
      <style>{`
        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        .silver-shimmer {
          background: linear-gradient(90deg, #666, #ffffff, #aaaaaa, #ffffff, #666);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmer 4s linear infinite;
        }
      `}</style>
      <footer className="border-t border-white/5 px-12 py-8 bg-black">
        <div className="mx-auto max-w-6xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <svg width="20" height="20" viewBox="0 0 32 32" fill="none">
              <polygon points="16,2 30,10 30,22 16,30 2,22 2,10" stroke="#00CFFF" strokeWidth="1.5" fill="none"/>
              <line x1="16" y1="2" x2="16" y2="16" stroke="#00CFFF" strokeWidth="0.8"/>
              <line x1="2" y1="10" x2="16" y2="16" stroke="#00CFFF" strokeWidth="0.6"/>
              <line x1="30" y1="10" x2="16" y2="16" stroke="#00CFFF" strokeWidth="0.6"/>
            </svg>
            <span className="text-sm silver-shimmer">Black Diamond Labs</span>
          </div>
          <div className="flex items-center gap-6 text-xs">
            <a href="https://grassrootsfantasy.co.nz" className="silver-shimmer hover:opacity-80 transition-opacity">Grassroots Fantasy</a>
            <a href="mailto:info@blackdiamondlabs.co.nz" className="silver-shimmer hover:opacity-80 transition-opacity">info@blackdiamondlabs.co.nz</a>
          </div>
          <p className="text-xs silver-shimmer">© 2026 Black Diamond Labs</p>
        </div>
      </footer>
    </>
  )
}
