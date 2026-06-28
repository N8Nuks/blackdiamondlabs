import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

export default function Brands() {
  const brands = [
    {
      name: 'Grassroots Fantasy',
      nameDisplay: (
        <>
          <span style={{ color: '#2d9e4e' }}>Grassroots</span>
          {' '}
          <span style={{
            background: 'linear-gradient(90deg,#a0c4ff,#ffffff,#c8e6ff,#ffffff,#a0c4ff)',
            backgroundSize: '200% auto',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>Fantasy</span>
        </>
      ),
      tagline: 'Built for the game you love.',
      taglineColor: '#2d9e4e',
      desc: 'Fantasy league platform for the Northern Fastpitch Series — collect player cards, build your squad, score points based on real game results.',
      status: 'Live',
      href: 'https://grassrootsfantasy.co.nz',
      accent: '#2d9e4e',
    },
    {
      name: 'LegacyMint',
      nameDisplay: (
        <>
          <span style={{ color: '#ffffff' }}>LEGACY</span>
          <span style={{ color: '#2596be' }}>MINT</span>
        </>
      ),
      tagline: 'Your Legacy. Their Dream.',
      taglineColor: '#FFD700',
      desc: 'NFT fundraising platform — creating and sharing lasting digital legacies, stories, moments, and memories built to endure.',
      status: 'Pending',
      href: '#',
      accent: '#2596be',
    },
    {
      name: 'FutureProof Solutions',
      nameDisplay: (
        <>
          <span style={{
            background: 'linear-gradient(90deg,#B8860B,#FFD700,#FFF8DC,#FFD700,#B8860B)',
            backgroundSize: '200% auto',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>FutureProof</span>
          {' '}
          <span style={{
            background: 'linear-gradient(90deg,#888,#fff,#ccc,#fff,#888)',
            backgroundSize: '200% auto',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>Solutions</span>
        </>
      ),
      tagline: 'Built for what comes next.',
      taglineColor: '#C0C0C0',
      desc: 'Financial diversification education for individuals, teams, and organisations. Cryptocurrency, token creation, Vault27 and Alchemy Pay.',
      status: 'In Development',
      href: '#',
      accent: '#FFD700',
    },
    {
      name: 'SnapTrack',
      nameDisplay: null,
      tagline: 'Track every skill. Build every athlete.',
      taglineColor: '#00CFFF',
      desc: 'Skill performance education app built for athletes who want to measure their development.',
      status: 'In Development',
      href: '#',
      accent: '#00CFFF',
    },
    {
      name: 'Black Diamond AI',
      nameDisplay: null,
      tagline: 'Your AI. Trained on sport.',
      taglineColor: '#A78BFA',
      desc: 'An AI assistant trained specifically on minor sports. Build plans, analyse games, generate proposals — just ask.',
      status: 'In Development',
      href: '#',
      accent: '#A78BFA',
    },
    {
      name: 'Stat-You Hub',
      nameDisplay: null,
      tagline: 'Every stat. Every competition. One place.',
      taglineColor: '#00CFFF',
      desc: 'A permanent digital profile for every athlete — every stat from every competition, across an entire career.',
      status: 'In Development',
      href: '#',
      accent: '#00CFFF',
    },
    {
      name: 'Sport-Tube',
      nameDisplay: null,
      tagline: 'Live sport. For everyone.',
      taglineColor: '#F87171',
      desc: 'Live streaming built specifically for minor sports competitions — putting every game in front of every fan.',
      status: 'In Development',
      href: '#',
      accent: '#F87171',
    },
  ]

  const statusStyle = (s: string) => {
    if (s === 'Live') return { bg: '#00CFFF15', text: '#00CFFF', dot: '#00CFFF' }
    if (s === 'Pending') return { bg: '#FFD70015', text: '#FFD700', dot: '#FFD700' }
    return { bg: '#ffffff08', text: '#555555', dot: '#333333' }
  }

  return (
    <main className="min-h-screen bg-black text-white">
      <style>{`
        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        .brand-shimmer span {
          animation: shimmer 3s linear infinite;
        }
      `}</style>
      <Nav />

      {/* Hero */}
      <section className="relative pt-40 pb-24 px-6 sm:px-16 lg:px-24 overflow-hidden">
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 70% 50% at 50% 0%, #001525 0%, #000 65%)' }} />
        <div className="relative z-10 max-w-5xl mx-auto">
          <p className="text-xs font-bold uppercase tracking-[0.35em] mb-5" style={{ color: '#00CFFF' }}>
            Our Brands
          </p>
          <h1 className="text-6xl sm:text-7xl lg:text-8xl font-black leading-none mb-10 text-white">
            BDL<br />Brands<span style={{ color: '#00CFFF' }}>.</span>
          </h1>
          <div className="h-px w-24 mb-10" style={{ backgroundColor: '#00CFFF40' }} />
          <p className="text-base sm:text-lg text-white/40 leading-relaxed max-w-xl">
            Every Black Diamond Labs brand is built for a specific community — connected through one intelligent platform.
          </p>
        </div>
      </section>

      {/* Brands */}
      <section className="px-6 sm:px-16 lg:px-24 pb-32">
        <div className="max-w-5xl mx-auto">

          {/* Live brand — full width featured */}
          {brands.filter(b => b.status === 'Live').map(brand => {
            const sc = statusStyle(brand.status)
            return (
              <div key={brand.name} className="mb-8 rounded-2xl border p-10 sm:p-14 flex flex-col sm:flex-row items-start sm:items-center gap-10"
                style={{ borderColor: brand.accent + '40', background: brand.accent + '08' }}>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-6">
                    <span className="h-1.5 w-1.5 rounded-full animate-pulse" style={{ backgroundColor: sc.dot }} />
                    <span className="text-xs font-bold uppercase tracking-widest" style={{ color: sc.text }}>{brand.status}</span>
                  </div>
                  <h2 className="text-3xl sm:text-4xl font-black mb-3 brand-shimmer">
                    {brand.nameDisplay || brand.name}
                  </h2>
                  <p className="text-base font-semibold italic mb-5" style={{ color: brand.taglineColor }}>{brand.tagline}</p>
                  <p className="text-sm text-white/40 leading-relaxed max-w-lg">{brand.desc}</p>
                </div>
                <a href={brand.href}
                  className="shrink-0 inline-flex items-center gap-3 border px-8 py-4 text-sm font-bold text-white hover:bg-white/5 transition-all duration-200"
                  style={{ borderColor: brand.accent }}>
                  Visit Platform →
                </a>
              </div>
            )
          })}

          {/* Pending + In Development — grid */}
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {brands.filter(b => b.status !== 'Live').map(brand => {
              const sc = statusStyle(brand.status)
              return (
                <div key={brand.name}
                  className="flex flex-col rounded-2xl border border-white/8 bg-white/[0.03] p-8 hover:bg-white/[0.06]
cat > app/about/page.tsx << 'EOF'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

export default function About() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Nav />

      {/* Hero */}
      <section className="relative pt-40 pb-24 px-6 sm:px-16 lg:px-24 overflow-hidden">
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 70% 50% at 50% 0%, #001525 0%, #000 65%)' }} />
        <div className="relative z-10 max-w-5xl mx-auto">
          <p className="text-xs font-bold uppercase tracking-[0.35em] mb-5" style={{ color: '#00CFFF' }}>
            Our Story
          </p>
          <h1 className="text-6xl sm:text-7xl lg:text-8xl font-black leading-none mb-10 text-white">
            About<br />BDL<span style={{ color: '#00CFFF' }}>.</span>
          </h1>
          <div className="h-px w-24 mb-10" style={{ backgroundColor: '#00CFFF40' }} />
          <p className="text-base sm:text-lg text-white/40 leading-relaxed max-w-xl">
            Black Diamond Labs exists to unlock the untapped potential of minor sports by creating excitement, expanding opportunity, and building sustainable prosperity for athletes, fans, clubs, and communities through intelligent technology.
          </p>
        </div>
      </section>

      {/* Founders — first */}
      <section className="px-6 sm:px-16 lg:px-24 pb-32">
        <div className="max-w-5xl mx-auto">

          <p className="text-xs font-bold uppercase tracking-[0.35em] mb-5" style={{ color: '#00CFFF' }}>
            The Founders
          </p>
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-16">
            Built by people<br />who played the game.
          </h2>

          {/* Founders grid */}
          <div className="grid sm:grid-cols-2 gap-6 mb-6">
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-10 flex flex-col gap-6">
              <div>
                <h3 className="text-2xl font-black text-white mb-1">Nathan Nukunuku</h3>
                <p className="text-xs font-bold uppercase tracking-widest" style={{ color: '#00CFFF' }}>
                  Co-Founder — Vision & Ideas
                </p>
              </div>
              <div className="h-px w-12" style={{ backgroundColor: '#00CFFF30' }} />
              <p className="text-sm text-white/40 leading-relaxed">
                Two decades representing New Zealand with the Black Sox. A dual sportsman who played both softball and rugby into his late 20s. Nathan brings the ideas — and a lifetime of lived experience in grassroots sport — to everything BDL builds.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-10 flex flex-col gap-6">
              <div>
                <h3 className="text-2xl font-black text-white mb-1">Katrina Nukunuku</h3>
                <p className="text-xs font-bold uppercase tracking-widest" style={{ color: '#00CFFF' }}>
                  Co-Founder — Heart & Purpose
                </p>
              </div>
              <div className="h-px w-12" style={{ backgroundColor: '#00CFFF30' }} />
              <p className="text-sm text-white/40 leading-relaxed">
                New Zealand representative in softball and a high school netball player. Katrina brings the heart. Her passion for community and people shapes the soul of every platform BDL creates.
              </p>
            </div>
          </div>

          {/* Family quote */}
          <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-10 sm:p-14 text-center mb-32">
            <p className="text-xl sm:text-2xl font-black text-white/60 leading-relaxed italic max-w-2xl mx-auto">
              "Nathan brings the ideas, Katrina brings the heart. Our kids bring the inspiration to do the work — and our passion for sport brings the drive to succeed."
            </p>
          </div>

          {/* The name */}
          <p className="text-xs font-bold uppercase tracking-[0.35em] mb-5" style={{ color: '#00CFFF' }}>
            The Name
          </p>
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-16">
            Why Black<br />Diamond Labs?
          </h2>

          <div className="grid sm:grid-cols-3 gap-6 mb-32">
            {[
              {
                word: 'Black',
                desc: 'Honours the legacy of representing New Zealand — including Nathan\'s two decades with the Black Sox and the privilege both Nathan and Katrina have had of wearing the black jersey.'
              },
              {
                word: 'Diamond',
                desc: 'Celebrates the playing fields around the world that shaped their lives through sport.'
              },
              {
                word: 'Labs',
                desc: 'Represents our commitment to continuous research, development, and innovation — creating intelligent technology that helps unlock the untapped potential of minor sports.'
              },
            ].map(item => (
              <div key={item.word} className="flex flex-col gap-6 p-10 rounded-2xl border border-white/8 bg-white/[0.02]">
                <h3 className="text-4xl font-black" style={{ color: '#00CFFF' }}>{item.word}</h3>
                <div className="h-px w-8" style={{ backgroundColor: '#00CFFF30' }} />
                <p className="text-sm text-white/40 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          {/* Mission */}
          <div className="text-center py-20 border-t border-white/5">
            <p className="text-xs font-bold uppercase tracking-[0.35em] mb-8" style={{ color: '#00CFFF' }}>
              What We Believe
            </p>
            <blockquote className="text-2xl sm:text-3xl lg:text-4xl font-black text-white leading-snug max-w-3xl mx-auto mb-8">
              "Simply that they are helping others to be better."
            </blockquote>
            <p className="text-sm text-white/25 max-w-md mx-auto leading-relaxed">
              That is what we want every person to feel when they interact with a Black Diamond Labs product. Not impressed. Not entertained. Better.
            </p>
          </div>

        </div>
      </section>

      <Footer />
    </main>
  )
}
