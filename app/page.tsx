import BrandCard from '@/components/BrandCard'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <>
      <style>{`
        body { background: #000; }
        @keyframes diamond-glow {
          0%, 100% { filter: drop-shadow(0 0 20px #00CFFF30) drop-shadow(0 40px 60px #00CFFF20); }
          50% { filter: drop-shadow(0 0 40px #00CFFF60) drop-shadow(0 40px 80px #00CFFF40); }
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
          border: 1px solid #00CFFF;
          color: #00CFFF;
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
          background: #00CFFF10;
          box-shadow: 0 0 30px #00CFFF20;
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
          background: #00CFFF60;
        }
      `}</style>

      <main className="min-h-screen bg-black text-white">
        <Nav />

        {/* Hero */}
        <section className="relative min-h-screen flex items-center overflow-hidden">

          {/* Starfield */}
          {[...Array(35)].map((_, i) => (
            <div key={i} className="animate-dot absolute rounded-full bg-cyan-400"
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
              style={{ color: '#00CFFF' }}>
              Technology for sport at ground level
            </p>

            <h1 className="opacity-0 animate-fade-up delay-1 font-black leading-none mb-0"
              style={{ fontSize: 'clamp(2.8rem, 8vw, 5.5rem)' }}>
              Black<br />Diamond<br />Labs<span style={{ color: '#00CFFF' }}>.</span>
            </h1>

            <p className="opacity-0 animate-fade-up delay-2 text-sm sm:text-base text-white/40 leading-relaxed mb-8 sm:mb-10 max-w-xs sm:max-w-sm mt-6 sm:mt-8">
              Building digital platforms for<br />grassroots sport communities.
            </p>

            <div className="opacity-0 animate-fade-up delay-3">
              <a href="#brands" className="gold-btn">
                Explore Our Brands
                <svg width="14" height="10" viewBox="0 0 14 10" fill="none">
                  <path d="M1 5h12M9 1l4 4-4 4" stroke="#00CFFF" strokeWidth="1.5" strokeLinecap="round"/>
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
                  <span className="text-base" style={{ color: '#00CFFF' }}>{p.icon}</span>
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
              <div style={{ width: 300, height: 30, borderRadius: '50%', border: '1px solid #00CFFF40', background: 'radial-gradient(ellipse, #00CFFF10, transparent)' }} />
            </div>
            <div className="animate-ring absolute" style={{ bottom: '16%', left: '50%', transform: 'translateX(-50%)', animationDelay: '0.5s' }}>
              <div style={{ width: 400, height: 20, borderRadius: '50%', border: '1px solid #00CFFF20' }} />
            </div>
            <div className="animate-ring absolute" style={{ bottom: '14%', left: '50%', transform: 'translateX(-50%)', animationDelay: '1s' }}>
              <div style={{ width: 500, height: 14, borderRadius: '50%', border: '1px solid #00CFFF15' }} />
            </div>

            {/* Diamond */}
            <div className="animate-diamond relative z-10" style={{ width: 520, height: 540 }}>
              <svg viewBox="0 0 520 540" fill="none" xmlns="http://www.w3.org/2000/svg" width="520" height="540">
                <defs>
                  <radialGradient id="tableGrad" cx="50%" cy="40%" r="50%">
                    <stop offset="0%" stopColor="#cccccc" stopOpacity="0.25"/>
                    <stop offset="100%" stopColor="#000000" stopOpacity="0.9"/>
                  </radialGradient>
                  <radialGradient id="leftGrad" cx="30%" cy="50%" r="60%">
                    <stop offset="0%" stopColor="#111111" stopOpacity="0.7"/>
                    <stop offset="100%" stopColor="#000000" stopOpacity="0.95"/>
                  </radialGradient>
                  <radialGradient id="rightGrad" cx="70%" cy="50%" r="60%">
                    <stop offset="0%" stopColor="#222222" stopOpacity="0.5"/>
                    <stop offset="100%" stopColor="#000000" stopOpacity="0.95"/>
                  </radialGradient>
                  <radialGradient id="pavLeft" cx="20%" cy="60%" r="70%">
                    <stop offset="0%" stopColor="#0a0a0a" stopOpacity="0.9"/>
                    <stop offset="100%" stopColor="#000000" stopOpacity="1"/>
                  </radialGradient>
                  <radialGradient id="pavRight" cx="80%" cy="60%" r="70%">
                    <stop offset="0%" stopColor="#151515" stopOpacity="0.8"/>
                    <stop offset="100%" stopColor="#000000" stopOpacity="1"/>
                  </radialGradient>
                  <radialGradient id="culetGlow" cx="50%" cy="100%" r="30%">
                    <stop offset="0%" stopColor="#FFD700" stopOpacity="0.9"/>
                    <stop offset="60%" stopColor="#FFD700" stopOpacity="0.2"/>
                    <stop offset="100%" stopColor="#FFD700" stopOpacity="0"/>
                  </radialGradient>
                  <radialGradient id="baseGlow" cx="50%" cy="0%" r="80%">
                    <stop offset="0%" stopColor="#FFD70040"/>
                    <stop offset="100%" stopColor="transparent"/>
                  </radialGradient>
                  <filter id="culetFilter" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="4"/>
                  </filter>
                  <filter id="edgeGlow">
                    <feGaussianBlur stdDeviation="1.5" result="blur"/>
                    <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
                  </filter>
                </defs>

                {/* ── Crown (top) ── */}
                {/* Table — flat top */}
                <polygon points="180,70 260,48 340,70 355,130 260,148 165,130"
                  fill="url(#tableGrad)" stroke="#FFD700" strokeWidth="0.8" strokeOpacity="0.7"/>

                {/* Star facets left of table */}
                <polygon points="80,170 165,130 180,70 110,95"
                  fill="url(#leftGrad)" stroke="#FFD700" strokeWidth="0.7" strokeOpacity="0.6"/>
                <polygon points="110,95 180,70 260,48 175,45"
                  fill="url(#tableGrad)" stroke="#FFD700" strokeWidth="0.6" strokeOpacity="0.5"/>

                {/* Star facets right of table */}
                <polygon points="440,170 355,130 340,70 410,95"
                  fill="url(#rightGrad)" stroke="#FFD700" strokeWidth="0.7" strokeOpacity="0.6"/>
                <polygon points="410,95 340,70 260,48 345,45"
                  fill="url(#tableGrad)" stroke="#FFD700" strokeWidth="0.6" strokeOpacity="0.5"/>

                {/* Lower crown left */}
                <polygon points="30,240 80,170 165,130 260,148 150,255"
                  fill="url(#leftGrad)" stroke="#FFD700" strokeWidth="0.8" strokeOpacity="0.55"/>

                {/* Lower crown right */}
                <polygon points="490,240 440,170 355,130 260,148 370,255"
                  fill="url(#rightGrad)" stroke="#FFD700" strokeWidth="0.8" strokeOpacity="0.55"/>

                {/* Lower crown centre-left */}
                <polygon points="150,255 260,148 80,170"
                  fill="url(#leftGrad)" stroke="#FFD700" strokeWidth="0.6" strokeOpacity="0.4"/>

                {/* Lower crown centre-right */}
                <polygon points="370,255 260,148 440,170"
                  fill="url(#rightGrad)" stroke="#FFD700" strokeWidth="0.6" strokeOpacity="0.4"/>

                {/* ── Pavilion (bottom) ── */}
                <polygon points="30,240 150,255 260,500"
                  fill="url(#pavLeft)" stroke="#FFD700" strokeWidth="0.9" strokeOpacity="0.6"/>
                <polygon points="150,255 260,148 260,500"
                  fill="url(#pavLeft)" stroke="#FFD700" strokeWidth="0.7" strokeOpacity="0.5"/>
                <polygon points="260,148 370,255 260,500"
                  fill="url(#pavRight)" stroke="#FFD700" strokeWidth="0.7" strokeOpacity="0.5"/>
                <polygon points="370,255 490,240 260,500"
                  fill="url(#pavRight)" stroke="#FFD700" strokeWidth="0.9" strokeOpacity="0.6"/>

                {/* Internal pavilion lines */}
                <path d="M260,148 L260,500" stroke="#FFD700" strokeWidth="0.6" strokeOpacity="0.5" fill="none"/>
                <path d="M150,255 L370,255" stroke="#FFD700" strokeWidth="0.5" strokeOpacity="0.35" fill="none"/>
                <path d="M80,170 L440,170" stroke="#FFD700" strokeWidth="0.6" strokeOpacity="0.4" fill="none"/>

                {/* Outer girdle outline — main shape */}
                <path d="M110,95 L175,45 L260,48 L345,45 L410,95 L490,240 L370,255 L260,500 L150,255 L30,240 Z"
                  fill="none" stroke="#FFD700" strokeWidth="1.4" strokeOpacity="0.75" filter="url(#edgeGlow)"/>

                {/* Culet glow */}
                <ellipse cx="260" cy="498" rx="8" ry="8" fill="#FFD700" opacity="0.9" filter="url(#culetFilter)"/>
                <circle cx="260" cy="500" r="2.5" fill="#FFD700" opacity="1"/>

                {/* Base platform glow */}
                <ellipse cx="260" cy="510" rx="120" ry="18"
                  fill="none" stroke="#FFD700" strokeWidth="0.8" strokeOpacity="0.4"/>
                <ellipse cx="260" cy="515" rx="170" ry="14"
                  fill="none" stroke="#FFD700" strokeWidth="0.5" strokeOpacity="0.25"/>
                <ellipse cx="260" cy="520" rx="210" ry="12"
                  fill="none" stroke="#FFD700" strokeWidth="0.3" strokeOpacity="0.15"/>

                {/* Subtle inner glow on pavilion */}
                <polygon points="30,240 260,500 490,240 260,148" fill="url(#culetGlow)" opacity="0.08"/>
              </svg>
            </div>
          </div>
        </section>

        {/* Brands */}
        <section id="brands" className="py-20 sm:py-28 px-6 sm:px-10 lg:px-16" style={{ background: '#050505', borderTop: '1px solid #ffffff08' }}>
          <style>{`
            @keyframes shimmer {
              0% { background-position: -200% center; }
              100% { background-position: 200% center; }
            }
          `}</style>
          <div className="mx-auto max-w-6xl">
            <div className="mb-12 sm:mb-16">
              <p className="text-xs font-bold uppercase tracking-[0.3em]" style={{ color: '#00CFFF' }}>Our Brands</p>
            </div>
            <div className="grid gap-4 sm:gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              <BrandCard
                name="Grassroots Fantasy"
                tagline="Built for the game you love."
                href="https://grassrootsfantasy.co.nz"
                status="live"
                accentColor="#2d9e4e"
                nameStyle="grassroots"
                hideEdition={true}
                larger={true}
              />
              <BrandCard
                name="LegacyMint"
                tagline="Your Legacy, Their Dream."
                taglineSplit={{ first: "Your Legacy,", firstColor: "#FFD700", second: "Their Dream.", secondColor: "#98FFD0" }}
                description="A platform for creating and sharing lasting digital legacies — stories, moments, and memories built to endure."
                href="#"
                status="soon"
                accentColor="#A78BFA"
                nameSplit={{ first: "LEGACY", second: "MINT", secondColor: "#98FFD0" }}
                hideEdition={true}
              />
              <BrandCard
                name="FutureProof Solutions"
                tagline="Built for what comes next."
                description="Technology consulting helping organisations adapt and thrive."
                href="#"
                status="soon"
                accentColor="#C0C0C0"
                nameStyle="futureproof"
                taglineStyle={{
                  background: "linear-gradient(90deg,#888,#fff,#ccc,#fff,#888)",
                  backgroundSize: "200% auto",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  animation: "shimmer 3s linear infinite",
                }}
                hideEdition={true}
              />
            </div>
          </div>
        </section>

                <Footer />
      </main>
    </>
  )
}
