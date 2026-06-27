import BrandCard from '@/components/BrandCard'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <>
      <style>{`
        body { background: #000; }
        @keyframes diamond-glow {
          0%, 100% { filter: drop-shadow(0 0 20px #FFD70030) drop-shadow(0 40px 60px #FFD70020); }
          50% { filter: drop-shadow(0 0 40px #FFD70060) drop-shadow(0 40px 80px #FFD70040); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-16px); }
        }
        @keyframes fade-up {
          from { opacity: 0; transform: translateY(28px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes ring-pulse {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.6; }
        }
        @keyframes dot-pulse {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.9; transform: scale(1.5); }
        }
        .animate-diamond { animation: diamond-glow 4s ease-in-out infinite, float 7s ease-in-out infinite; }
        .animate-fade-up { animation: fade-up 0.9s ease-out forwards; }
        .animate-ring { animation: ring-pulse 3s ease-in-out infinite; }
        .animate-dot { animation: dot-pulse 2s ease-in-out infinite; }
        .delay-1 { animation-delay: 0.15s; }
        .delay-2 { animation-delay: 0.3s; }
        .delay-3 { animation-delay: 0.45s; }
        .delay-4 { animation-delay: 0.6s; }
        .delay-5 { animation-delay: 0.75s; }
        .gold-btn {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          border: 1px solid #FFD700;
          color: #FFD700;
          font-size: 0.65rem;
          font-weight: 800;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          padding: 14px 28px;
          transition: all 0.3s;
          background: transparent;
          white-space: nowrap;
        }
        .gold-btn:hover {
          background: #FFD70010;
          box-shadow: 0 0 30px #FFD70020;
        }
        .floating-label {
          position: absolute;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .floating-label span:first-child {
          font-size: 0.55rem;
          font-weight: 700;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.45);
          line-height: 1.4;
        }
        .floating-label .line {
          width: 20px;
          height: 1px;
          background: #FFD70060;
        }
      `}</style>

      <main className="min-h-screen bg-black text-white">
        <Nav />

        {/* Hero */}
        <section className="relative min-h-screen flex items-center overflow-hidden">

          {/* Starfield */}
          {[...Array(35)].map((_, i) => (
            <div key={i} className="animate-dot absolute rounded-full bg-yellow-400"
              style={{
                width: i % 4 === 0 ? 2 : 1,
                height: i % 4 === 0 ? 2 : 1,
                top: `${(i * 37 + 11) % 100}%`,
                left: `${(i * 53 + 7) % 100}%`,
                animationDelay: `${(i * 0.17) % 3}s`,
                animationDuration: `${1.8 + (i % 5) * 0.4}s`,
              }} />
          ))}

          {/* Left — text */}
          <div className="relative z-10 w-full lg:w-1/2 px-6 sm:px-10 lg:px-16 pt-28 pb-16 lg:pt-0 lg:pb-0 flex flex-col justify-center">

            <p className="opacity-0 animate-fade-up text-[0.6rem] sm:text-xs font-bold uppercase tracking-[0.2em] sm:tracking-[0.3em] mb-4 sm:mb-6"
              style={{ color: '#FFD700' }}>
              Technology for sport at ground level
            </p>

            <h1 className="opacity-0 animate-fade-up delay-1 font-black leading-none mb-0"
              style={{ fontSize: 'clamp(2.8rem, 8vw, 5.5rem)' }}>
              Black<br />Diamond<br />Labs<span style={{ color: '#FFD700' }}>.</span>
            </h1>

            <p className="opacity-0 animate-fade-up delay-2 text-sm sm:text-base text-white/40 leading-relaxed mb-8 sm:mb-10 max-w-xs sm:max-w-sm mt-6 sm:mt-8">
              Building digital platforms for<br />grassroots sport communities.
            </p>

            <div className="opacity-0 animate-fade-up delay-3">
              <a href="#brands" className="gold-btn">
                Explore Our Brands
                <svg width="14" height="10" viewBox="0 0 14 10" fill="none">
                  <path d="M1 5h12M9 1l4 4-4 4" stroke="#FFD700" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </a>
            </div>

            {/* Pillars — desktop only */}
            <div className="opacity-0 animate-fade-up delay-5 mt-16 sm:mt-20 hidden sm:grid grid-cols-2 gap-6 max-w-xs">
              {[
                { icon: '◈', label: 'Community First', sub: 'Grassroots at our core' },
                { icon: '◉', label: 'Data Insights', sub: 'Smarter decisions' },
                { icon: '◆', label: 'Secure & Reliable', sub: 'Built to perform' },
                { icon: '◎', label: 'Scalable Platform', sub: 'Ready for the future' },
              ].map((p) => (
                <div key={p.label} className="flex flex-col gap-1.5">
                  <span className="text-base" style={{ color: '#FFD700' }}>{p.icon}</span>
                  <span className="text-[0.6rem] font-bold uppercase tracking-wider text-white/60">{p.label}</span>
                  <span className="text-[0.6rem] text-white/30">{p.sub}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right — diamond (desktop only) */}
          <div className="hidden lg:flex w-1/2 items-center justify-center relative" style={{ minHeight: '100vh' }}>

            <div className="floating-label opacity-0 animate-fade-up delay-4" style={{ top: '22%', left: '5%' }}>
              <span>Data Driven<br/>Decisions</span>
              <div className="line" />
            </div>
            <div className="floating-label opacity-0 animate-fade-up delay-4" style={{ top: '42%', left: '2%' }}>
              <span>Community<br/>Connected</span>
              <div className="line" />
            </div>
            <div className="floating-label opacity-0 animate-fade-up delay-4" style={{ bottom: '28%', left: '5%' }}>
              <span>Empowering<br/>Every Athlete</span>
              <div className="line" />
            </div>
            <div className="floating-label opacity-0 animate-fade-up delay-4" style={{ top: '22%', right: '2%' }}>
              <span>Performance<br/>Analytics</span>
              <div className="line" />
            </div>
            <div className="floating-label opacity-0 animate-fade-up delay-4" style={{ bottom: '28%', right: '2%' }}>
              <span>Built For<br/>Growth</span>
              <div className="line" />
            </div>

            {/* Glow rings */}
            <div className="animate-ring absolute" style={{ bottom: '18%', left: '50%', transform: 'translateX(-50%)' }}>
              <div style={{ width: 300, height: 30, borderRadius: '50%', border: '1px solid #FFD70040', background: 'radial-gradient(ellipse, #FFD70010, transparent)' }} />
            </div>
            <div className="animate-ring absolute" style={{ bottom: '16%', left: '50%', transform: 'translateX(-50%)', animationDelay: '0.5s' }}>
              <div style={{ width: 400, height: 20, borderRadius: '50%', border: '1px solid #FFD70020' }} />
            </div>
            <div className="animate-ring absolute" style={{ bottom: '14%', left: '50%', transform: 'translateX(-50%)', animationDelay: '1s' }}>
              <div style={{ width: 500, height: 14, borderRadius: '50%', border: '1px solid #FFD70015' }} />
            </div>

            {/* Diamond */}
            <div className="animate-diamond relative z-10" style={{ width: 480, height: 480 }}>
              <svg viewBox="0 0 480 520" fill="none" xmlns="http://www.w3.org/2000/svg" width="480" height="520">
                <defs>
                  <linearGradient id="f1" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#ffffff" stopOpacity="0.12"/>
                    <stop offset="100%" stopColor="#000000" stopOpacity="0.8"/>
                  </linearGradient>
                  <linearGradient id="f2" x1="1" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#333333" stopOpacity="0.9"/>
                    <stop offset="100%" stopColor="#000000" stopOpacity="0.95"/>
                  </linearGradient>
                  <linearGradient id="f3" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#111111" stopOpacity="0.95"/>
                    <stop offset="100%" stopColor="#000000" stopOpacity="1"/>
                  </linearGradient>
                  <linearGradient id="f4" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#222222" stopOpacity="0.9"/>
                    <stop offset="100%" stopColor="#111111" stopOpacity="0.95"/>
                  </linearGradient>
                  <linearGradient id="gb" x1="0.5" y1="0" x2="0.5" y2="1">
                    <stop offset="0%" stopColor="#FFD700" stopOpacity="0"/>
                    <stop offset="100%" stopColor="#FFD700" stopOpacity="0.6"/>
                  </linearGradient>
                  <filter id="glow">
                    <feGaussianBlur stdDeviation="3" result="blur"/>
                    <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
                  </filter>
                </defs>
                <polygon points="160,80 240,60 320,80 340,140 240,160 140,140" fill="url(#f1)" stroke="#FFD700" strokeWidth="0.8" strokeOpacity="0.6"/>
                <polygon points="80,160 140,140 160,80 100,90" fill="url(#f2)" stroke="#FFD700" strokeWidth="0.6" strokeOpacity="0.5"/>
                <polygon points="100,90 160,80 240,60 160,50" fill="url(#f1)" stroke="#FFD700" strokeWidth="0.6" strokeOpacity="0.5"/>
                <polygon points="240,60 320,80 380,90 240,50" fill="url(#f4)" stroke="#FFD700" strokeWidth="0.6" strokeOpacity="0.5"/>
                <polygon points="380,90 320,80 340,140 400,160" fill="url(#f3)" stroke="#FFD700" strokeWidth="0.6" strokeOpacity="0.5"/>
                <polygon points="40,220 80,160 140,140 240,160 140,240" fill="url(#f2)" stroke="#FFD700" strokeWidth="0.7" strokeOpacity="0.5"/>
                <polygon points="440,220 400,160 340,140 240,160 340,240" fill="url(#f3)" stroke="#FFD700" strokeWidth="0.7" strokeOpacity="0.5"/>
                <polygon points="40,220 140,240 240,160 80,160" fill="url(#f4)" stroke="#FFD700" strokeWidth="0.6" strokeOpacity="0.4"/>
                <polygon points="440,220 340,240 240,160 400,160" fill="url(#f2)" stroke="#FFD700" strokeWidth="0.6" strokeOpacity="0.4"/>
                <polygon points="40,220 140,240 240,490" fill="url(#f3)" stroke="#FFD700" strokeWidth="0.8" strokeOpacity="0.5"/>
                <polygon points="140,240 240,160 240,490" fill="url(#f4)" stroke="#FFD700" strokeWidth="0.7" strokeOpacity="0.5"/>
                <polygon points="240,160 340,240 240,490" fill="url(#f2)" stroke="#FFD700" strokeWidth="0.7" strokeOpacity="0.5"/>
                <polygon points="340,240 440,220 240,490" fill="url(#f3)" stroke="#FFD700" strokeWidth="0.8" strokeOpacity="0.5"/>
                <line x1="240" y1="160" x2="240" y2="490" stroke="#FFD700" strokeWidth="0.5" strokeOpacity="0.4"/>
                <line x1="140" y1="240" x2="340" y2="240" stroke="#ffffff" strokeWidth="0.4" strokeOpacity="0.2"/>
                <line x1="80" y1="160" x2="400" y2="160" stroke="#ffffff" strokeWidth="0.5" strokeOpacity="0.3"/>
                <path d="M100,90 L160,50 L240,50 L320,50 L380,90 L440,220 L340,240 L240,490 L140,240 L40,220 Z"
                  fill="none" stroke="#FFD700" strokeWidth="1.2" strokeOpacity="0.7"/>
                <ellipse cx="240" cy="488" rx="60" ry="16" fill="url(#gb)" opacity="0.8"/>
                <circle cx="240" cy="490" r="3" fill="#FFD700" opacity="0.9" filter="url(#glow)"/>
                <polygon points="40,220 240,490 440,220 240,160" fill="url(#gb)" opacity="0.06"/>
              </svg>
            </div>
          </div>
        </section>

        {/* Brands */}
        <section id="brands" className="py-20 sm:py-28 px-6 sm:px-10 lg:px-16" style={{ background: '#050505', borderTop: '1px solid #ffffff08' }}>
          <div className="mx-auto max-w-6xl">
            <div className="mb-12 sm:mb-16">
              <p className="text-xs font-bold uppercase tracking-[0.3em] mb-3" style={{ color: '#FFD700' }}>Our Brands</p>
              <h2 className="text-2xl sm:text-3xl font-black text-white">What we build.</h2>
            </div>
            <div className="grid gap-4 sm:gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              <BrandCard
                name="Grassroots Fantasy"
                edition="NFS Edition"
                tagline="Built for the game you love."
                description="Fantasy league platform for the Northern Fastpitch Series."
                href="https://grassrootsfantasy.co.nz"
                status="live"
                accentColor="#FFD700"
              />
              <BrandCard
                name="LegacyMint"
                edition="Coming Soon"
                tagline="Your legacy, preserved forever."
                description="Digital legacy platform — stories, moments, and memories built to endure."
                href="#"
                status="soon"
                accentColor="#A78BFA"
              />
              <BrandCard
                name="FutureProof Solutions"
                edition="Coming Soon"
                tagline="Built for what comes next."
                description="Technology consulting helping organisations adapt and thrive."
                href="#"
                status="soon"
                accentColor="#34D399"
              />
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </>
  )
}
