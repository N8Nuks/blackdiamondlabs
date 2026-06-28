import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

function BrandName({ name }: { name: string }) {
  if (name === 'Grassroots Fantasy') return (
    <span>
      <span style={{ color: '#2d9e4e' }}>Grassroots</span>
      {' '}
      <span style={{ background: 'linear-gradient(90deg,#a0c4ff,#fff,#c8e6ff,#fff,#a0c4ff)', backgroundSize: '200% auto', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', animation: 'shimmer 3s linear infinite' }}>Fantasy</span>
    </span>
  )
  if (name === 'LegacyMint') return (
    <span>
      <span style={{ color: '#ffffff' }}>LEGACY</span>
      <span style={{ color: '#98FFD0' }}>MINT</span>
    </span>
  )
  if (name === 'FutureProof Solutions') return (
    <span>
      <span style={{ background: 'linear-gradient(90deg,#B8860B,#FFD700,#FFF8DC,#FFD700,#B8860B)', backgroundSize: '200% auto', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', animation: 'shimmer 3s linear infinite' }}>FutureProof</span>
      {' '}
      <span style={{ background: 'linear-gradient(90deg,#888,#fff,#ccc,#fff,#888)', backgroundSize: '200% auto', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', animation: 'shimmer 3s linear infinite', animationDelay: '0.5s' }}>Solutions</span>
    </span>
  )
  return <span>{name}</span>
}

export default function Brands() {
  const brands = [
    { name: 'Grassroots Fantasy', tagline: 'Built for the game you love.', taglineColor: '#2d9e4e', desc: 'Fantasy league platform for the Northern Fastpitch Series — collect player cards, build your squad, score points based on real game results.', status: 'Pending', href: 'https://grassrootsfantasy.co.nz', accent: '#2d9e4e' },
    { name: 'LegacyMint', tagline: 'Your Legacy. Their Dream.', taglineColor: '#FFD700', desc: 'NFT fundraising platform — creating and sharing lasting digital legacies, stories, moments, and memories built to endure.', status: 'Pending', href: 'https://legacymint.club', accent: '#2596be' },
    { name: 'FutureProof Solutions', tagline: 'Built for what comes next.', taglineColor: '#C0C0C0', desc: 'Financial diversification education for individuals, teams, and organisations. Cryptocurrency, token creation, Vault27 and Alchemy Pay.', status: 'In Development', href: '#', accent: '#FFD700' },
    { name: 'SnapTrack', tagline: 'Track every skill. Build every athlete.', taglineColor: '#00CFFF', desc: 'Skill performance education app built for athletes who want to measure their development.', status: 'In Development', href: '#', accent: '#00CFFF' },
    { name: 'Black Diamond AI', tagline: 'Your AI. Trained on sport.', taglineColor: '#A78BFA', desc: 'An AI assistant trained specifically on minor sports. Build plans, analyse games, generate proposals — just ask.', status: 'In Development', href: '#', accent: '#A78BFA' },
    { name: 'Stat-You Hub', tagline: 'Every stat. Every competition. One place.', taglineColor: '#00CFFF', desc: 'A permanent digital profile for every athlete — every stat from every competition, across an entire career.', status: 'In Development', href: '#', accent: '#00CFFF' },
    { name: 'Sport-Tube', tagline: 'Live sport. For everyone.', taglineColor: '#F87171', desc: 'Live streaming built specifically for minor sports competitions — putting every game in front of every fan.', status: 'In Development', href: '#', accent: '#F87171' },
  ]

  const statusStyle = (s: string) => {
    if (s === 'Live') return { text: '#00CFFF', dot: '#00CFFF' }
    if (s === 'Pending') return { text: '#FFD700', dot: '#FFD700' }
    return { text: '#555555', dot: '#333333' }
  }

  const live = brands.filter(b => b.status === 'Live')
  const rest = brands.filter(b => b.status !== 'Live')

  return (
    <main className="min-h-screen bg-black text-white">
      <style>{`
        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
      `}</style>
      <Nav />

      {/* Hero */}
      <section className="relative pt-40 pb-24 px-6 sm:px-16 lg:px-24 overflow-hidden">
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 70% 50% at 50% 0%, #001525 0%, #000 65%)' }} />
        <div className="relative z-10 max-w-5xl mx-auto">
          <p className="text-xs font-bold uppercase tracking-[0.35em] mb-5" style={{ color: '#00CFFF' }}>Our Brands</p>
          <h1 className="text-6xl sm:text-7xl lg:text-8xl font-black leading-none mb-10 text-white">
            BDL<br />Brands<span style={{ color: '#00CFFF' }}>.</span>
          </h1>
          <div className="h-px w-24 mb-10" style={{ backgroundColor: '#00CFFF40' }} />
          <p className="text-base sm:text-lg text-white/40 leading-relaxed max-w-xl">
            Every Black Diamond Labs brand is built for a specific community — connected through one intelligent platform.
          </p>
        </div>
      </section>

      <section className="px-6 sm:px-16 lg:px-24 pb-32">
        <div className="max-w-5xl mx-auto">

          {/* Live — featured */}
          {live.map(brand => {
            const sc = statusStyle(brand.status)
            return (
              <div key={brand.name} className="mb-8 rounded-2xl border p-10 sm:p-14 flex flex-col sm:flex-row items-start sm:items-center gap-10"
                style={{ borderColor: brand.accent + '40', background: brand.accent + '08' }}>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-6">
                    <span className="h-1.5 w-1.5 rounded-full animate-pulse" style={{ backgroundColor: sc.dot }} />
                    <span className="text-xs font-bold uppercase tracking-widest" style={{ color: sc.text }}>{brand.status}</span>
                  </div>
                  <h2 className="text-3xl sm:text-4xl font-black mb-3"><BrandName name={brand.name} /></h2>
                  <p className="text-base font-semibold italic mb-5" style={{ color: brand.taglineColor }}>{brand.tagline}</p>
                  <p className="text-sm text-white/40 leading-relaxed max-w-lg">{brand.desc}</p>
                </div>
                <a href={brand.href} className="shrink-0 inline-flex items-center gap-3 border px-8 py-4 text-sm font-bold text-white hover:bg-white/5 transition-all duration-200" style={{ borderColor: brand.accent }}>
                  Visit Platform →
                </a>
              </div>
            )
          })}

          {/* Rest — grid */}
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map(brand => {
              const sc = statusStyle(brand.status)
              return (
                <div key={brand.name} className="flex flex-col rounded-2xl border border-white/8 bg-white/[0.03] p-8 hover:bg-white/[0.06] transition-all duration-300">
                  <div className="flex items-center gap-2 mb-8">
                    <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: sc.dot }} />
                    <span className="text-xs font-bold uppercase tracking-widest" style={{ color: sc.text }}>{brand.status}</span>
                  </div>
                  <h2 className="text-lg font-black mb-2"><BrandName name={brand.name} /></h2>
                  <p className="text-xs font-semibold italic mb-5" style={{ color: brand.taglineColor }}>{brand.tagline}</p>
                  <p className="text-xs text-white/30 leading-relaxed flex-1">{brand.desc}</p>
                  <div className="mt-8 h-px" style={{ backgroundColor: brand.accent + '25' }} />
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
