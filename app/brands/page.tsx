import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

export default function Brands() {
  const brands = [
    {
      name: 'Grassroots Fantasy',
      tagline: 'Built for the game you love.',
      desc: 'Fantasy league platform for the Northern Fastpitch Series — collect player cards, build your squad, score points based on real game results.',
      status: 'Live',
      href: 'https://grassrootsfantasy.co.nz',
      color: '#2d9e4e',
    },
    {
      name: 'LegacyMint',
      tagline: 'Your Legacy. Their Dream.',
      desc: 'NFT fundraising platform — creating and sharing lasting digital legacies, stories, moments, and memories built to endure. Awaiting final legal and payment options.',
      status: 'Pending',
      href: '#',
      color: '#2596be',
    },
    {
      name: 'FutureProof Solutions',
      tagline: 'Built for what comes next.',
      desc: 'Financial diversification education for individuals, teams, and organisations. Focus on cryptocurrency, token creation, and modern payment systems including Vault27 and Alchemy Pay.',
      status: 'In Development',
      href: '#',
      color: '#FFD700',
    },
    {
      name: 'SnapTrack',
      tagline: 'Track every skill. Build every athlete.',
      desc: 'Skill performance education app built for athletes who want to measure their development and coaches who want to see it.',
      status: 'In Development',
      href: '#',
      color: '#00CFFF',
    },
    {
      name: 'Black Diamond AI',
      tagline: 'Your AI. Trained on sport.',
      desc: 'An AI assistant trained specifically on minor sports. Build training plans, analyse games, generate sponsorship proposals, schedule competitions — just ask.',
      status: 'In Development',
      href: '#',
      color: '#A78BFA',
    },
    {
      name: 'Stat-You Hub',
      tagline: 'Every stat. Every competition. One place.',
      desc: 'A permanent digital statue for every athlete — a living profile that carries every stat from every competition across an entire career.',
      status: 'In Development',
      href: '#',
      color: '#00CFFF',
    },
    {
      name: 'Sport-Tube',
      tagline: 'Live sport. For everyone.',
      desc: 'Live streaming built specifically for minor sports competitions — putting every game in front of every fan, wherever they are.',
      status: 'In Development',
      href: '#',
      color: '#F87171',
    },
  ]

  const statusColor = (s: string) => {
    if (s === 'Live') return { bg: '#00CFFF22', text: '#00CFFF' }
    if (s === 'Pending') return { bg: '#FFD70022', text: '#FFD700' }
    return { bg: '#ffffff11', text: '#666666' }
  }

  return (
    <main className="min-h-screen bg-black text-white">
      <Nav />

      {/* Hero */}
      <section className="relative pt-36 pb-20 px-6 sm:px-12 lg:px-20 overflow-hidden">
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 60% 40% at 50% 0%, #001a2e 0%, #000 70%)' }} />
        <div className="relative z-10 max-w-4xl mx-auto">
          <p className="text-xs font-bold uppercase tracking-[0.3em] mb-4" style={{ color: '#00CFFF' }}>
            Our Brands
          </p>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black leading-none mb-8 text-white">
            What we<br />build<span style={{ color: '#00CFFF' }}>.</span>
          </h1>
          <p className="text-lg sm:text-xl text-white/50 leading-relaxed max-w-2xl">
            Every Black Diamond Labs brand is built for a specific community — connected through one intelligent platform.
          </p>
        </div>
      </section>

      {/* Brands grid */}
      <section className="py-24 px-6 sm:px-12 lg:px-20">
        <div className="max-w-6xl mx-auto grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {brands.map((brand) => {
            const sc = statusColor(brand.status)
            return (
              <div key={brand.name}
                className="flex flex-col rounded-2xl border border-white/10 bg-white/5 p-8 hover:bg-white/8 transition-all duration-300">

                {/* Status */}
                <div className="flex items-center justify-between mb-6">
                  <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full"
                    style={{ backgroundColor: sc.bg, color: sc.text }}>
                    {brand.status}
                  </span>
                  <div className="h-px w-6" style={{ backgroundColor: brand.color + '60' }} />
                </div>

                {/* Name */}
                <h2 className="text-xl font-black text-white mb-1">{brand.name}</h2>

                {/* Tagline */}
                <p className="text-sm font-semibold italic mb-4" style={{ color: brand.color }}>
                  {brand.tagline}
                </p>

                {/* Description */}
                <p className="text-xs text-white/35 leading-relaxed flex-1">{brand.desc}</p>

                {/* CTA */}
                {brand.status === 'Live' && (
                  <a href={brand.href}
                    className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-white/50 hover:text-white transition-colors">
                    Visit platform <span>→</span>
                  </a>
                )}
              </div>
            )
          })}
        </div>
      </section>

      <Footer />
    </main>
  )
}
