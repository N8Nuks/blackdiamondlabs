import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

const goldText: React.CSSProperties = { background: 'linear-gradient(90deg,#B8860B,#FFD700,#FFF3C4,#FFD700,#B8860B)', backgroundSize: '200% auto', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', animation: 'shimmer 3s linear infinite' }

const COMING = [
  { name: 'The Legend', sport: 'Fastpitch Softball', tag: 'The name says it all. Coming soon.', show: true },
  { name: 'Coach ██████', sport: 'Netball', tag: 'Court craft. Combinations. Composure.' },
  { name: 'Coach ██████', sport: 'Basketball', tag: 'Spacing. Reads. Winning habits.' },
]

export default function BDAI() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Nav />
      <style>{`@keyframes shimmer { 0% { background-position: -200% center; } 100% { background-position: 200% center; } }`}</style>

      {/* Hero */}
      <section className="pt-36 pb-16 px-6 sm:px-12 text-center">
        <p className="text-xs font-bold uppercase tracking-[0.35em] mb-3" style={{ color: '#E8C77A' }}>Black Diamond AI</p>
        <h1 className="text-4xl sm:text-6xl font-black mb-4">Real coaches. <span style={goldText}>Always on.</span></h1>
        <p className="text-sm text-white/40 max-w-xl mx-auto">
          AI coaching assistants built on the real knowledge of proven coaches — their game plans, their training methods, their voice. Pick your coach. Ask like you would at training.
        </p>
      </section>

      {/* Coach grid */}
      <section className="px-6 sm:px-12 pb-20">
        <div className="max-w-5xl mx-auto grid gap-5 sm:grid-cols-2">

          {/* Coach Nate — live */}
          <a href="/coach-nate" className="rounded-2xl border p-8 flex flex-col transition-all duration-300 hover:bg-white/[0.04]"
            style={{ borderColor: '#E8C77A40', background: '#E8C77A08' }}>
            <div className="flex items-center gap-2 mb-5">
              <span className="h-1.5 w-1.5 rounded-full animate-pulse" style={{ backgroundColor: '#4ade80' }} />
              <span className="text-xs font-bold uppercase tracking-widest" style={{ color: '#4ade80' }}>Live — Pilot Coach</span>
            </div>
            <h2 className="text-2xl font-black mb-1">Coach <span style={goldText}>Nate</span></h2>
            <p className="text-xs font-semibold uppercase tracking-widest text-white/50 mb-4">Fastpitch Softball — NZ Black Sox</p>
            <p className="text-sm text-white/40 leading-relaxed flex-1">
              Two decades at the top of the game. Game plans, training, in-game calls, the mental side — built on a real coaching record, not generic advice.
            </p>
            <span className="mt-6 text-sm font-bold" style={goldText}>Enter Platform →</span>
          </a>

          {/* Coming slots */}
          {COMING.map(c => (
            <div key={c.sport} className="rounded-2xl border border-white/8 bg-white/[0.02] p-8 flex flex-col">
              <div className="flex items-center gap-2 mb-5">
                <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: '#C7CEDA' }} />
                <span className="text-xs font-bold uppercase tracking-widest text-white/40">Coming to the diamond</span>
              </div>
              <h2 className="text-2xl font-black mb-1" style={(c as any).show ? undefined : { filter: 'blur(6px)', userSelect: 'none' }}>{c.name}</h2>
              <p className="text-xs font-semibold uppercase tracking-widest text-white/50 mb-4">{c.sport}</p>
              <p className="text-sm text-white/30 leading-relaxed flex-1" style={{ filter: 'blur(4px)', userSelect: 'none' }}>{c.tag}</p>
              <span className="mt-6 text-sm font-bold text-white/25">In development</span>
            </div>
          ))}
        </div>
      </section>

      {/* Become a coach */}
      <section className="px-6 sm:px-12 py-20" style={{ borderTop: '1px solid #ffffff08', background: '#050505' }}>
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-xs font-bold uppercase tracking-[0.35em] mb-3" style={{ color: '#E8C77A' }}>For Coaches</p>
          <h2 className="text-3xl sm:text-4xl font-black mb-5">Your knowledge. <span style={goldText}>Working while you sleep.</span></h2>
          <p className="text-sm text-white/40 leading-relaxed mb-10 max-w-xl mx-auto">
            Black Diamond Labs turns a lifetime of coaching into an AI assistant your athletes can reach any hour, any day — built with you, in your voice. You earn the majority share of every subscription to your coach AI. We build it, host it, and keep it fast.
          </p>
          <div className="grid sm:grid-cols-3 gap-4 mb-12 text-left">
            <div className="rounded-2xl border border-white/8 bg-white/[0.02] p-6">
              <h3 className="font-black text-sm mb-2" style={{ color: '#E8C77A' }}>What you bring</h3>
              <p className="text-xs text-white/40 leading-relaxed">A proven coaching record and the depth of knowledge to fill a playbook — plans, drills, philosophy, stories.</p>
            </div>
            <div className="rounded-2xl border border-white/8 bg-white/[0.02] p-6">
              <h3 className="font-black text-sm mb-2" style={{ color: '#E8C77A' }}>What we build</h3>
              <p className="text-xs text-white/40 leading-relaxed">Structured interviews and materials become your coaching corpus — reviewed with you, protected, and served in your voice.</p>
            </div>
            <div className="rounded-2xl border border-white/8 bg-white/[0.02] p-6">
              <h3 className="font-black text-sm mb-2" style={{ color: '#E8C77A' }}>What you earn</h3>
              <p className="text-xs text-white/40 leading-relaxed">The majority share of your AI's subscription revenue, paid monthly. Your knowledge, your name, your upside.</p>
            </div>
          </div>
          <a href="mailto:info@blackdiamondlabs.co.nz?subject=BDL%20Coach%20Application"
            className="inline-block rounded-lg px-10 py-4 text-sm font-bold uppercase tracking-widest text-white"
            style={{ background: 'linear-gradient(90deg,#5B21B6,#8B5CF6,#A78BFA,#8B5CF6,#5B21B6)', backgroundSize: '200% auto', animation: 'shimmer 3s linear infinite', boxShadow: '0 0 24px rgba(139,92,246,0.35)' }}>
            Apply to become a BDL Coach
          </a>
        </div>
      </section>

      <Footer />
    </main>
  )
}
