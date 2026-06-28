import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

export default function Platform() {
  const pillars = [
    { number: '01', name: 'Competition Hub', desc: 'The engine of the sport.', features: 'Fixtures · Scoring · Ladders · Finals · Tournaments', color: '#00CFFF' },
    { number: '02', name: 'Athlete Performance', desc: 'Helping athletes improve.', features: 'Training Plans · AI Coaching · Video Analysis · Skill Tracking', color: '#00CFFF' },
    { number: '03', name: 'Club & League Operations', desc: 'Helping organisations save time.', features: 'Registrations · Payments · Scheduling · Compliance', color: '#00CFFF' },
    { number: '04', name: 'Fan Experience', desc: 'Creating excitement.', features: 'Live Streaming · Highlights · Fantasy · Social Feeds', color: '#00CFFF' },
    { number: '05', name: 'Commercial Engine', desc: 'Creating prosperity.', features: 'Sponsorship · Ticketing · Merchandise · Crowdfunding', color: '#00CFFF' },
    { number: '06', name: 'Data & Intelligence', desc: 'The platform\'s competitive advantage.', features: 'AI Insights · Analytics · Benchmarking · Intelligence', color: '#00CFFF' },
    { number: '07', name: 'Community', desc: 'The social layer.', features: 'Teams · Messaging · Events · Recognition · Volunteers', color: '#00CFFF' },
    { number: '08', name: 'Black Diamond AI', desc: 'Your AI. Trained on sport.', features: 'Training Plans · Game Analysis · Scheduling · Proposals', color: '#FFD700', highlight: true },
  ]

  return (
    <main className="min-h-screen bg-black text-white">
      <Nav />

      {/* Hero */}
      <section className="relative pt-36 pb-20 px-6 sm:px-12 lg:px-20 overflow-hidden">
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 60% 40% at 50% 0%, #001a2e 0%, #000 70%)' }} />
        <div className="relative z-10 max-w-4xl mx-auto">
          <p className="text-xs font-bold uppercase tracking-[0.3em] mb-4" style={{ color: '#00CFFF' }}>
            The Platform
          </p>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black leading-none mb-8 text-white">
            One ecosystem.<br />Any sport<span style={{ color: '#00CFFF' }}>.</span>
          </h1>
          <p className="text-lg sm:text-xl text-white/50 leading-relaxed max-w-2xl">
            Black Diamond Labs connects athletes, clubs, fans, competitions, and commercial opportunities in one intelligent ecosystem — built from the ground up for minor sports.
          </p>
        </div>
      </section>

      {/* Eight pillars — portal style */}
      <section className="py-24 px-6 sm:px-12 lg:px-20">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.3em] mb-3" style={{ color: '#00CFFF' }}>
                Eight Pillars
              </p>
              <h2 className="text-3xl sm:text-4xl font-black text-white">
                One platform.
              </h2>
            </div>
            <p className="text-sm text-white/30 max-w-xs">
              Most sports software solves one problem. Black Diamond Labs solves the entire ecosystem.
            </p>
          </div>

          <div className="grid gap-px bg-white/5 rounded-2xl overflow-hidden border border-white/10 sm:grid-cols-2 lg:grid-cols-4">
            {pillars.map((p, i) => (
              <div key={p.number}
                className={`relative flex flex-col gap-4 p-6 transition-all duration-300 hover:bg-white/5 group ${p.highlight ? 'bg-yellow-400/5' : 'bg-black'}`}>

                {/* Number */}
                <span className="text-xs font-black text-white/15 tabular-nums">{p.number}</span>

                {/* Accent line */}
                <div className="h-px w-8" style={{ backgroundColor: p.color + '80' }} />

                {/* Name */}
                <h3 className="text-base font-black text-white group-hover:text-white transition-colors">
                  {p.name}
                </h3>

                {/* Desc */}
                <p className="text-xs italic text-white/30">{p.desc}</p>

                {/* Features */}
                <p className="text-xs text-white/20 leading-relaxed mt-auto">
                  {p.features}
                </p>

                {p.highlight && (
                  <span className="absolute top-4 right-4 text-xs font-bold px-2 py-0.5 rounded-full"
                    style={{ backgroundColor: '#FFD70022', color: '#FFD700' }}>
                    AI
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 sm:px-12 lg:px-20" style={{ background: '#050505', borderTop: '1px solid #ffffff08' }}>
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-8">
          <div>
            <h2 className="text-2xl font-black text-white mb-2">See what we're building.</h2>
            <p className="text-sm text-white/30">Explore our brands and products in development.</p>
          </div>
          <a href="/brands"
            className="shrink-0 inline-flex items-center gap-3 border border-white/20 px-8 py-4 text-sm font-bold text-white hover:bg-white/5 transition-all duration-200">
            Our Brands
            <svg width="14" height="10" viewBox="0 0 14 10" fill="none">
              <path d="M1 5h12M9 1l4 4-4 4" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </a>
        </div>
      </section>

      <Footer />
    </main>
  )
}
