import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

export default function About() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Nav />

      {/* Hero */}
      <section className="relative pt-40 pb-32 px-8 sm:px-16 lg:px-32 overflow-hidden">
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 70% 50% at 50% 0%, #001525 0%, #000 65%)' }} />
        <div className="relative z-10 max-w-5xl mx-auto">
          <p className="text-xs font-bold uppercase tracking-[0.35em] mb-5" style={{ color: '#00CFFF' }}>Our Story</p>
          <h1 className="text-6xl sm:text-7xl lg:text-8xl font-black leading-none mb-10 text-white">
            About<br />BDL<span style={{ color: '#00CFFF' }}>.</span>
          </h1>
          <div className="h-px w-24 mb-10" style={{ backgroundColor: '#00CFFF40' }} />
          <p className="text-base text-white/40 leading-relaxed max-w-xl">
            Black Diamond Labs exists to unlock the untapped potential of minor sports by creating excitement, expanding opportunity, and building sustainable prosperity for athletes, fans, clubs, and communities through intelligent technology.
          </p>
        </div>
      </section>

      {/* Meet the Founders */}
      <section className="px-8 sm:px-16 lg:px-32 py-24" style={{ borderTop: '1px solid #ffffff08' }}>
        <div className="max-w-5xl mx-auto">
          <p className="text-xs font-bold uppercase tracking-[0.35em] mb-5" style={{ color: '#00CFFF' }}>Meet the Founders</p>
          <h2 className="text-3xl sm:text-4xl font-black text-white mb-16">Built by people who know the game.</h2>

          <div className="grid sm:grid-cols-2 gap-6 mb-6">
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-10 flex flex-col gap-3">
              <div>
                <h3 className="text-xl font-black mb-2" style={{ background: "linear-gradient(90deg,#00CFFF,#ffffff,#00CFFF,#ffffff,#00CFFF)", backgroundSize: "200% auto", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", animation: "shimmer 3s linear infinite" }}>Nathan Nukunuku</h3>
                <p className="text-xs font-bold uppercase tracking-widest" style={{ color: '#00CFFF' }}>Co-Founder — Vision & Execution</p>
              </div>
              <div className="h-px w-12" style={{ backgroundColor: '#00CFFF30' }} />
              <p className="text-sm text-white/40 leading-relaxed">
                Two decades representing New Zealand with the Black Sox. A dual sportsman who played both softball and rugby into his late 20s. Nathan brings the ideas — and a lifetime of lived experience in grassroots sport — to everything BDL builds.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-10 flex flex-col gap-3">
              <div>
                <h3 className="text-xl font-black mb-2" style={{ background: "linear-gradient(90deg,#00CFFF,#ffffff,#00CFFF,#ffffff,#00CFFF)", backgroundSize: "200% auto", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", animation: "shimmer 3s linear infinite" }}>Katrina Nukunuku</h3>
                <p className="text-xs font-bold uppercase tracking-widest" style={{ color: '#00CFFF' }}>Co-Founder — Heart & Purpose</p>
              </div>
              <div className="h-px w-12" style={{ backgroundColor: '#00CFFF30' }} />
              <p className="text-sm text-white/40 leading-relaxed">
                Katrina is a long time member of the New Zealand White Sox and attended multiple World Championships. Katrina has a lot of success at Club and Regional level in Softball. A keen high school netball player also, Katrina brings the heart to this company. Her passion for community and people shapes the soul of every platform BDL creates.
              </p>
            </div>
          </div>

          <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-10 sm:p-14 text-center">
            <p className="text-base sm:text-lg font-semibold text-white/40 leading-relaxed italic max-w-2xl mx-auto">
              "Nathan brings the ideas, Katrina brings the heart. Our kids bring the inspiration to do the work — and our passion for sport brings the drive to succeed."
            </p>
          </div>
        </div>
      </section>

      {/* The Name */}
      <section className="px-8 sm:px-16 lg:px-32 py-24" style={{ borderTop: '1px solid #ffffff08', background: '#050505' }}>
        <div className="max-w-5xl mx-auto">
          <p className="text-xs font-bold uppercase tracking-[0.35em] mb-5" style={{ color: '#00CFFF' }}>The Name</p>
          <h2 className="text-3xl sm:text-4xl font-black text-white mb-16">Why Black Diamond Labs?</h2>

          <div className="grid sm:grid-cols-3 gap-6">
            {[
              { word: 'Black', desc: 'Honours the legacy of representing New Zealand — including Nathan\'s two decades with the Black Sox and the privilege both Nathan and Katrina have had of wearing the black jersey.' },
              { word: 'Diamond', desc: 'Celebrates the playing fields around the world that shaped their lives through sport.' },
              { word: 'Labs', desc: 'Represents our commitment to continuous research, development, and innovation — creating intelligent technology that helps unlock the untapped potential of minor sports.' },
            ].map(item => (
              <div key={item.word} className="flex flex-col gap-3 p-8 rounded-2xl border border-white/8 bg-white/[0.02]">
                <h3 className="text-4xl font-black" style={{ color: '#00CFFF' }}>{item.word}</h3>
                <div className="h-px w-8" style={{ backgroundColor: '#00CFFF30' }} />
                <p className="text-sm text-white/40 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why and How */}
      <section className="px-8 sm:px-16 lg:px-32 py-24" style={{ borderTop: '1px solid #ffffff08' }}>
        <div className="max-w-5xl mx-auto">
          <p className="text-xs font-bold uppercase tracking-[0.35em] mb-5" style={{ color: '#00CFFF' }}>Why and How</p>
          <h2 className="text-3xl sm:text-4xl font-black text-white mb-16">Our purpose. Our method.</h2>

          <div className="grid sm:grid-cols-2 gap-6">
            <div className="rounded-2xl border border-white/8 bg-white/[0.02] p-10 flex flex-col gap-3">
              <h3 className="text-xl font-black text-white">Why?</h3>
              <div className="h-px w-8" style={{ backgroundColor: '#00CFFF30' }} />
              <p className="text-sm text-white/40 leading-relaxed" >
                We want to give back to the sports community that made us into the driven and successful individuals we are. Promoting excellence and being better every day.
              </p>
            </div>
            <div className="rounded-2xl border border-white/8 bg-white/[0.02] p-10 flex flex-col gap-3">
              <h3 className="text-xl font-black text-white">How?</h3>
              <div className="h-px w-8" style={{ backgroundColor: '#00CFFF30' }} />
              <p className="text-sm text-white/40 leading-relaxed" >
                Providing innovative platforms that enable sporting organisations and communities to gain market share in the User Digital Space (UDS), to educate and promote to their user bases at varying levels and ultimately, to build a sustainable digital future for sports communities.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
