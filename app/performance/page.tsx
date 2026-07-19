import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

const silverText: React.CSSProperties = { background: 'linear-gradient(90deg,#8E9BA8,#E6EAF0,#FFFFFF,#E6EAF0,#8E9BA8)', backgroundSize: '200% auto', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', animation: 'shimmer 3s linear infinite' }

const STEPS = [
  { n: '01', t: 'Book your review', d: 'Complete the online booking form and athlete questionnaire, and confirm with payment.' },
  { n: '02', t: 'Upload your video', d: '2–5 minutes of training or game footage for your chosen focus area. Simple upload instructions arrive by email.' },
  { n: '03', t: 'Performance analysis', d: 'Nathan and Katrina review your footage before your consultation — strengths, priorities, and the changes that matter most.' },
  { n: '04', t: 'Live consultation', d: 'A personalised 45–60 minute online Performance Review Consultation. Your footage, your goals, direct feedback.' },
  { n: '05', t: 'Your performance plan', d: 'A follow-up email with your review summary, Individual Action Plan, and training priorities for the next 2–4 weeks.' },
]

const INCLUDED = [
  'Online booking and athlete questionnaire',
  'Video submission and pre-consultation analysis',
  '45–60 minute live Performance Review Consultation',
  'Personalised feedback and practical guidance',
  'Individual Action Plan',
  'Follow-up email with training recommendations',
]

const AREAS = ['Hitting', 'Infield Defence', 'Outfield Defence', 'Base Running', 'General Game Performance']

export default function Performance() {
  return (
    <main className="min-h-screen text-white relative">
      <Nav />
      <style>{`@keyframes shimmer { 0% { background-position: -200% center; } 100% { background-position: 200% center; } }`}</style>

      {/* Hero */}
      <section className="relative z-10 pt-36 pb-16 px-6 sm:px-12 text-center">
        <div className="fixed inset-0 z-0 pointer-events-none">
          <div className="w-full h-full" style={{ backgroundImage: 'url(/performance-bg.jpg)', backgroundSize: 'cover', backgroundPosition: 'center 25%' }} />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.9) 100%)' }} />
        </div>
        <div className="relative z-10">
          <p className="text-xs font-bold uppercase tracking-[0.35em] mb-3" style={{ color: '#C7CEDA' }}>Black Diamond Performance</p>
          <h1 className="text-4xl sm:text-6xl font-black mb-4">Elite experience. <span style={silverText}>Personalised feedback.</span></h1>
          <p className="text-sm text-white/40 max-w-xl mx-auto">
            Expert video analysis and a live one-on-one consultation with Nathan and Katrina Nukunuku — two of New Zealand&apos;s most accomplished softball players, with 40+ years of combined international experience.
          </p>
          <a href="/performance/book" className="inline-block mt-8 rounded-full px-8 py-3 text-sm font-black text-black transition-all hover:opacity-90" style={{ background: 'linear-gradient(90deg,#C7CEDA,#FFFFFF,#C7CEDA)' }}>
            Book your Performance Review →
          </a>
        </div>
      </section>

      {/* Product card */}
      <section className="relative z-10 px-6 sm:px-12 pb-20">
        <div className="max-w-3xl mx-auto rounded-2xl border p-8 sm:p-10" style={{ borderColor: '#C7CEDA40', background: '#C7CEDA08' }}>
          <div className="flex items-center gap-2 mb-5">
            <span className="h-1.5 w-1.5 rounded-full animate-pulse" style={{ backgroundColor: '#4ade80' }} />
            <span className="text-xs font-bold uppercase tracking-widest" style={{ color: '#4ade80' }}>Now taking bookings</span>
          </div>
          <h2 className="text-2xl font-black mb-1">The <span style={silverText}>Performance Review</span></h2>
          <p className="text-xs font-semibold uppercase tracking-widest text-white/50 mb-4">Online video analysis + live consultation — athletes 10 years and over</p>
          <p className="text-sm text-white/40 leading-relaxed mb-6">
            Submit your footage, then meet Nathan and Katrina online for direct, honest feedback. Every review focuses on one or two key priorities — simple, practical, and immediately applicable. Choose your focus: {AREAS.join(' · ')}.
          </p>
          <div className="flex items-end gap-4 mb-2">
            <span className="text-lg text-white/30 line-through">$180 NZD</span>
            <span className="text-4xl font-black" style={silverText}>$99 NZD</span>
          </div>
          <p className="text-xs text-white/40 mb-6">Launch price — for a limited time only. Inclusive of GST where applicable.</p>
          <a href="/performance/book" className="text-sm font-bold" style={silverText}>Book now and lock in the launch price →</a>
        </div>
      </section>

      {/* How it works */}
      <section className="relative z-10 px-6 sm:px-12 py-20" style={{ borderTop: '1px solid #ffffff08', background: '#050505' }}>
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-black text-center mb-12">How it <span style={silverText}>works</span></h2>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {STEPS.map(s => (
              <div key={s.n} className="rounded-2xl border border-white/8 bg-white/[0.02] p-6">
                <p className="text-xs font-black mb-2" style={{ color: '#C7CEDA' }}>{s.n}</p>
                <h3 className="font-black text-sm mb-2">{s.t}</h3>
                <p className="text-xs text-white/40 leading-relaxed">{s.d}</p>
              </div>
            ))}
            <div className="rounded-2xl border border-white/8 bg-white/[0.02] p-6">
              <p className="text-xs font-black mb-2" style={{ color: '#C7CEDA' }}>Included</p>
              <ul className="text-xs text-white/40 leading-relaxed space-y-1">
                {INCLUDED.map(i => <li key={i}>— {i}</li>)}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Under 18 + coming soon */}
      <section className="relative z-10 px-6 sm:px-12 py-20" style={{ borderTop: '1px solid #ffffff08' }}>
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-black mb-4">Athletes <span style={silverText}>under 18</span></h2>
          <p className="text-sm text-white/40 leading-relaxed mb-14">
            Young athletes are at the heart of what we do. A parent or guardian completes the consent section of the booking form, and a responsible adult is present during every consultation. Footage is stored securely and deleted within 30 days of your consultation.
          </p>
          <p className="text-xs font-bold uppercase tracking-[0.35em] mb-3" style={{ color: '#C7CEDA' }}>Coming to Black Diamond Performance</p>
          <p className="text-sm text-white/30">In-person sessions · Weekend training camps · Team &amp; club programmes</p>
        </div>
      </section>

      <Footer />
    </main>
  )
}
