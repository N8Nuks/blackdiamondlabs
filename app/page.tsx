import DiamondReveal from '@/components/DiamondReveal'
import BrandCard from '@/components/BrandCard'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <>
      <style>{`
        body { background: #000; }
        @keyframes diamond-glow {
          0%, 100% { filter: drop-shadow(0 0 20px rgba(255,255,255,0.2)) drop-shadow(0 40px 60px rgba(255,255,255,0.15)); }
          50% { filter: drop-shadow(0 0 40px #C7CEDA60) drop-shadow(0 40px 80px rgba(255,255,255,0.25)); }
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
          border: 1px solid #C7CEDA;
          color: #C7CEDA;
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
          background: rgba(255,255,255,0.1);
          box-shadow: 0 0 30px rgba(255,255,255,0.15);
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
          background: #C7CEDA60;
        }
      `}</style>

      <main className="min-h-screen bg-black text-white">
        <Nav />

        {/* Hero */}
        <section className="relative min-h-screen flex items-center pt-32 pb-20 overflow-hidden">

          {/* Starfield */}
          {[...Array(35)].map((_, i) => (
            <div key={i} className="animate-dot absolute rounded-full bg-white"
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
          <div className="relative z-10 w-full lg:w-1/2 px-10 sm:px-14 lg:px-20 pt-28 pb-16 lg:pt-0 lg:pb-0 flex flex-col justify-center">

            <p className="opacity-0 animate-fade-up text-[0.6rem] sm:text-xs font-bold uppercase tracking-[0.2em] sm:tracking-[0.3em] mb-4 sm:mb-6"
              style={{ color: '#C7CEDA' }}>
              Technology for sport at ground level
            </p>

            <h1 className="opacity-0 animate-fade-up delay-1 font-black leading-none mb-0"
              style={{ fontSize: 'clamp(2.8rem, 8vw, 5.5rem)' }}>
              Black<br />Diamond<br />Labs<span style={{ color: '#C7CEDA' }}>.</span>
            </h1>

            <p className="opacity-0 animate-fade-up delay-2 text-sm sm:text-base text-white/40 leading-relaxed mb-8 sm:mb-10 max-w-xs sm:max-w-sm mt-6 sm:mt-8">
              Building digital platforms for<br />grassroots sport communities.
            </p>

            <div className="opacity-0 animate-fade-up delay-3">
              <a href="/brands" className="gold-btn">
                Explore Our Brands
                <svg width="14" height="10" viewBox="0 0 14 10" fill="none">
                  <path d="M1 5h12M9 1l4 4-4 4" stroke="#C7CEDA" strokeWidth="1.5" strokeLinecap="round"/>
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
                  <span className="text-base" style={{ color: '#C7CEDA' }}>{p.icon}</span>
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
              <div style={{ width: 300, height: 30, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.25)', background: 'radial-gradient(ellipse, rgba(255,255,255,0.1), transparent)' }} />
            </div>
            <div className="animate-ring absolute" style={{ bottom: '16%', left: '50%', transform: 'translateX(-50%)', animationDelay: '0.5s' }}>
              <div style={{ width: 400, height: 20, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.15)' }} />
            </div>
            <div className="animate-ring absolute" style={{ bottom: '14%', left: '50%', transform: 'translateX(-50%)', animationDelay: '1s' }}>
              <div style={{ width: 500, height: 14, borderRadius: '50%', border: '1px solid #C7CEDA15' }} />
            </div>

            {/* Diamond */}
            <DiamondReveal />
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
              <p className="text-xs font-bold uppercase tracking-[0.3em]" style={{ color: '#C7CEDA' }}>Our Brands</p>
            </div>
            <div className="grid gap-4 sm:gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              <BrandCard
                name="Grassroots Fantasy"
                hideLink
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
