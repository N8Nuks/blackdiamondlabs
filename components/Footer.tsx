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

      <footer className="border-t border-white/5 px-12 py-6 bg-black">
        <div className="mx-auto max-w-6xl flex flex-col sm:flex-row items-center justify-between gap-4">

          {/* Logo left */}
          <div className="flex items-center gap-3">
            <img src="/logo-mark.png" alt="" className="h-6 w-auto" />
            <span style={{ position: 'relative', display: 'inline-block' }}>
              <img src="/wordmark.svg" alt="Black Diamond Labs" className="h-6 w-auto opacity-90" />
              <span style={{ position: 'absolute', inset: 0, background: 'linear-gradient(100deg, transparent 30%, rgba(255,255,255,0.55) 50%, transparent 70%)', backgroundSize: '200% 100%', animation: 'shimmer 4s linear infinite', mixBlendMode: 'overlay', pointerEvents: 'none' }} />
            </span>
          </div>

          {/* Legal links */}
          <div className="flex items-center gap-6">
            <a href="/terms" className="text-xs text-white/30 hover:text-white transition-colors">Terms</a>
            <a href="/privacy" className="text-xs text-white/30 hover:text-white transition-colors">Privacy</a>
          </div>
          {/* Email right */}
          <a href="mailto:info@blackdiamondlabs.co.nz"
            className="text-xs silver-shimmer hover:opacity-80 transition-opacity">
            info@blackdiamondlabs.co.nz
          </a>

        </div>
      </footer>
    </>
  )
}
