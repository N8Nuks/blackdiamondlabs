import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

export default function About() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Nav />

      {/* Hero */}
      <section className="relative pt-36 pb-20 px-6 sm:px-12 lg:px-20 overflow-hidden">
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 60% 40% at 50% 0%, #001a2e 0%, #000 70%)' }} />
        <div className="relative z-10 max-w-4xl mx-auto">
          <p className="text-xs font-bold uppercase tracking-[0.3em] mb-4" style={{ color: '#00CFFF' }}>
            Our Story
          </p>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black leading-none mb-8 text-white">
            About<br />Black Diamond<br />Labs<span style={{ color: '#00CFFF' }}>.</span>
          </h1>
          <p className="text-lg sm:text-xl text-white/50 leading-relaxed max-w-2xl">
            Black Diamond Labs exists to unlock the untapped potential of minor sports by creating excitement, expanding opportunity, and building sustainable prosperity for athletes, fans, clubs, and communities through intelligent technology.
          </p>
        </div>
      </section>

      {/* The name */}
      <section className="py-20 px-6 sm:px-12 lg:px-20" style={{ borderTop: '1px solid #ffffff08' }}>
        <div className="max-w-4xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.3em] mb-4" style={{ color: '#00CFFF' }}>
              The Name
            </p>
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-6">
              Why Black Diamond Labs?
            </h2>
            <div className="space-y-5 text-white/50 leading-relaxed">
              <p>
                <span className="text-white font-semibold">"Black"</span> honours the legacy of representing New Zealand — including Nathan's two decades with the Black Sox and the privilege both Nathan and Katrina have had of wearing the black jersey.
              </p>
              <p>
                <span className="text-white font-semibold">"Diamond"</span> celebrates the playing fields around the world that shaped their lives through sport.
              </p>
              <p>
                <span className="text-white font-semibold">"Labs"</span> represents our commitment to continuous research, development, and innovation — creating intelligent technology that helps unlock the untapped potential of minor sports.
              </p>
            </div>
          </div>

          {/* Diamond accent */}
          <div className="flex items-center justify-center">
            <svg viewBox="0 0 300 320" fill="none" width="260" height="280" style={{ opacity: 0.6 }}>
              <defs>
                <radialGradient id="aTableGrad" cx="50%" cy="40%" r="50%">
                  <stop offset="0%" stopColor="#cccccc" stopOpacity="0.2"/>
                  <stop offset="100%" stopColor="#000000" stopOpacity="0.9"/>
                </radialGradient>
                <radialGradient id="aCuletGlow" cx="50%" cy="100%" r="30%">
                  <stop offset="0%" stopColor="#00CFFF" stopOpacity="0.9"/>
                  <stop offset="100%" stopColor="#00CFFF" stopOpacity="0"/>
                </radialGradient>
              </defs>
              <polygon points="100,40 150,28 200,40 210,80 150,90 90,80" fill="url(#aTableGrad)" stroke="#00CFFF" strokeWidth="0.6" strokeOpacity="0.6"/>
              <polygon points="40,140 90,80 150,90 80,150" fill="#050505" stroke="#00CFFF" strokeWidth="0.5" strokeOpacity="0.4"/>
              <polygon points="260,140 210,80 150,90 220,150" fill="#0a0a0a" stroke="#00CFFF" strokeWidth="0.5" strokeOpacity="0.4"/>
              <polygon points="40,140 80,150 150,300" fill="#030303" stroke="#00CFFF" strokeWidth="0.6" strokeOpacity="0.45"/>
              <polygon points="80,150 150,90 150,300" fill="#060606" stroke="#00CFFF" strokeWidth="0.5" strokeOpacity="0.4"/>
              <polygon points="150,90 220,150 150,300" fill="#080808" stroke="#00CFFF" strokeWidth="0.5" strokeOpacity="0.4"/>
              <polygon points="220,150 260,140 150,300" fill="#040404" stroke="#00CFFF" strokeWidth="0.6" strokeOpacity="0.45"/>
              <path d="M60,57 L100,28 L150,28 L200,28 L240,57 L260,140 L220,150 L150,300 L80,150 L40,140 Z" fill="none" stroke="#00CFFF" strokeWidth="1" strokeOpacity="0.6"/>
              <ellipse cx="150" cy="298" rx="5" ry="5" fill="#00CFFF" opacity="0.9" filter="url(#culetFilter)"/>
              <polygon points="40,140 150,300 260,140 150,90" fill="url(#aCuletGlow)" opacity="0.06"/>
            </svg>
          </div>
        </div>
      </section>

      {/* Founders */}
      <section className="py-20 px-6 sm:px-12 lg:px-20" style={{ background: '#050505', borderTop: '1px solid #ffffff08' }}>
        <div className="max-w-4xl mx-auto">
          <p className="text-xs font-bold uppercase tracking-[0.3em] mb-4" style={{ color: '#00CFFF' }}>
            The Founders
          </p>
          <h2 className="text-3xl sm:text-4xl font-black text-white mb-12">
            Built by people who played the game.
          </h2>

          <div className="grid sm:grid-cols-2 gap-8 mb-12">
            {/* Nathan */}
            <div className="rounded-2xl border border-white/10 bg-white/5 p-8">
              <h3 className="text-xl font-black text-white mb-1">Nathan Nukunuku</h3>
              <p className="text-xs uppercase tracking-widest mb-4" style={{ color: '#00CFFF' }}>Co-Founder — Vision & Ideas</p>
              <p className="text-sm text-white/40 leading-relaxed">
                Two decades representing New Zealand with the Black Sox. A dual sportsman who played softball and rugby into his late 20s. Nathan brings the ideas — and a lifetime of lived experience in grassroots sport — to everything BDL builds.
              </p>
            </div>

            {/* Katrina */}
            <div className="rounded-2xl border border-white/10 bg-white/5 p-8">
              <h3 className="text-xl font-black text-white mb-1">Katrina Nukunuku</h3>
              <p className="text-xs uppercase tracking-widest mb-4" style={{ color: '#00CFFF' }}>Co-Founder — Heart & Purpose</p>
              <p className="text-sm text-white/40 leading-relaxed">
                New Zealand representative in softball and a high school netball player, Katrina brings the heart. Her passion for community and sport shapes the soul of every platform BDL creates.
              </p>
            </div>
          </div>

          {/* Family */}
          <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-8 text-center">
            <p className="text-base text-white/50 leading-relaxed italic max-w-xl mx-auto">
              "Nathan brings the ideas, Katrina brings the heart. Our kids bring the inspiration to do the work — and our passion for sport brings the drive to succeed."
            </p>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20 px-6 sm:px-12 lg:px-20" style={{ borderTop: '1px solid #ffffff08' }}>
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-xs font-bold uppercase tracking-[0.3em] mb-6" style={{ color: '#00CFFF' }}>
            What We Believe
          </p>
          <blockquote className="text-2xl sm:text-3xl font-black text-white leading-snug mb-8 max-w-3xl mx-auto">
            "Simply that they are helping others to be better."
          </blockquote>
          <p className="text-sm text-white/30 max-w-lg mx-auto leading-relaxed">
            That is what we want every person to feel when they interact with a Black Diamond Labs product. Not impressed. Not entertained. Better.
          </p>
        </div>
      </section>

      <Footer />
    </main>
  )
}
