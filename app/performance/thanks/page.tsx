import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

const silverText: React.CSSProperties = { background: 'linear-gradient(90deg,#8E9BA8,#E6EAF0,#FFFFFF,#E6EAF0,#8E9BA8)', backgroundSize: '200% auto', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', animation: 'shimmer 3s linear infinite' }

export default function Thanks() {
  return (
    <main className="min-h-screen text-white relative">
      <Nav />
      <style>{`@keyframes shimmer { 0% { background-position: -200% center; } 100% { background-position: 200% center; } }`}</style>
      <section className="relative z-10 pt-44 pb-32 px-6 text-center">
        <p className="text-xs font-bold uppercase tracking-[0.35em] mb-3" style={{ color: '#C7CEDA' }}>Black Diamond Performance</p>
        <h1 className="text-4xl sm:text-5xl font-black mb-6">Booking <span style={silverText}>confirmed.</span></h1>
        <p className="text-sm text-white/40 max-w-md mx-auto leading-relaxed">
          Check your email for your confirmation and next steps. Submit your 2–5 minutes of footage within 14 days, and we&apos;ll confirm your consultation time once it&apos;s received.
        </p>
        <p className="text-sm text-white/40 max-w-md mx-auto leading-relaxed mt-4">
          Didn&apos;t receive an email? Check spam, or contact us via the <a href="/contact" className="underline">contact page</a>.
        </p>
      </section>
      <Footer />
    </main>
  )
}
