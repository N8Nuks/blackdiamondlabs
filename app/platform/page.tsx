import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

export default function Platform() {
  const ecosystem = [
    {
      number: '01',
      name: 'Competition Hub',
      purpose: 'Make competitions easier to run and more engaging to follow.',
      features: ['Fixtures & draws', 'Live scoring', 'Statistics', 'Ladders', 'Finals management', 'Tournament management', 'Officials management'],
      color: '#00CFFF',
    },
    {
      number: '02',
      name: 'Athlete Performance',
      purpose: 'Give every athlete access to elite-level development tools.',
      features: ['Training plans', 'AI coaching', 'Video analysis', 'Performance analytics', 'Player profiles', 'Skill tracking', 'Goal setting'],
      color: '#00CFFF',
    },
    {
      number: '03',
      name: 'Club & League Operations',
      purpose: 'Reduce administration so clubs can focus on sport.',
      features: ['Registrations', 'Memberships', 'Payments', 'Scheduling', 'Communications', 'Volunteer management', 'Compliance & reporting'],
      color: '#00CFFF',
    },
    {
      number: '04',
      name: 'Fan Experience',
      purpose: 'Give fans reasons to follow minor sports every week.',
      features: ['Live streaming', 'Highlights', 'Real-time scores', 'Player profiles', 'Fantasy competitions', 'Social feeds', 'Notifications'],
      color: '#00CFFF',
    },
    {
      number: '05',
      name: 'Commercial Engine',
      purpose: 'Generate sustainable revenue for clubs and competitions.',
      features: ['Sponsorship marketplace', 'Digital advertising', 'Merchandise', 'Ticketing', 'Donations', 'Crowdfunding', 'Membership subscriptions'],
      color: '#00CFFF',
    },
    {
      number: '06',
      name: 'Data & Intelligence',
      purpose: 'Turn data into better decisions.',
      features: ['AI insights', 'Predictive analytics', 'Recruitment tools', 'Performance benchmarking', 'Participation trends', 'Injury tracking', 'Business intelligence'],
      color: '#00CFFF',
    },
    {
      number: '07',
      name: 'Community',
      purpose: 'Build stronger sporting communities.',
      features: ['Teams & messaging', 'Events', 'Challenges', 'Recognition', 'Volunteer engagement', 'Social layer'],
      color: '#00CFFF',
    },
    {
      number: '08',
      name: 'Black Diamond AI',
      purpose: 'Your AI assistant trained specifically on minor sports.',
      features: ['Build training plans', 'Analyse games', 'Generate sponsorship proposals', 'Write club newsletters', 'Schedule competitions', 'Answer rules questions', 'Produce statistics', 'Recommend player development'],
      color: '#FFD700',
      highlight: true,
    },
  ]

  const brands = [
    { name: 'Grassroots Fantasy', status: 'Live', desc: 'Fantasy league platform. NFS Edition launching now.', color: '#2d9e4e' },
    { name: 'LegacyMint', status: 'Pending', desc: 'NFT fundraising platform. Awaiting final legal and payment options.', color: '#2596be' },
    { name: 'FutureProof Solutions', status: 'In Development', desc: 'Financial diversification education for individuals, teams and organisations. Cryptocurrency, token creation, Vault27 and Alchemy Pay.', color: '#FFD700' },
    { name: 'SnapTrack', status: 'In Development', desc: 'Skill performance education app.', color: '#00CFFF' },
    { name: 'Black Diamond AI', status: 'In Development', desc: 'AI assistant trained on minor sports. The Nate Clone.', color: '#A78BFA' },
    { name: 'Stat-You Hub', status: 'In Development', desc: 'A permanent digital statue for every athlete — every stat from every competition, all in one place.', color: '#00CFFF' },
    { name: 'Sport-Tube', status: 'In Development', desc: 'Live streaming built for minor sports competitions.', color: '#F87171' },
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
            One ecosystem.<br />Every sport<span style={{ color: '#00CFFF' }}>.</span>
          </h1>
          <p className="text-lg sm:text-xl text-white/50 leading-relaxed max-w-2xl">
            Black Diamond Labs is an intelligent technology platform that helps minor sports grow by connecting athletes, clubs, fans, competitions, and commercial opportunities in one ecosystem.
          </p>
        </div>
      </section>

      {/* Status banner */}
      <section className="px-6 sm:px-12 lg:px-20 py-8" style={{ background: '#050505', borderTop: '1px solid #ffffff08', borderBottom: '1px solid #ffffff08' }}>
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-12">
          <div className="flex items-center gap-3">
            <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-sm text-white/60">Platform in final build</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="h-2 w-2 rounded-full" style={{ backgroundColor: '#00CFFF' }} />
            <span className="text-sm text-white/60">Grassroots Fantasy launching now</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="h-2 w-2 rounded-full bg-yellow-400" />
            <span className="text-sm text-white/60">7 apps in development</span>
          </div>
        </div>
      </section>

      {/* Ecosystem modules */}
      <section className="py-24 px-6 sm:px-12 lg:px-20">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16">
            <p className="text-xs font-bold uppercase tracking-[0.3em] mb-3" style={{ color: '#00CFFF' }}>
              The Ecosystem
            </p>
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">
              Eight pillars. One platform.
            </h2>
            <p className="text-sm text-white/30 max-w-lg">
              Most sports software solves one problem. Black Diamond Labs solves the entire ecosystem.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {ecosystem.map((module) => (
              <div key={module.number}
                className={`rounded-2xl border p-6 flex flex-col gap-4 ${module.highlight ? 'border-yellow-400/30 bg-yellow-400/5' : 'border-white/10 bg-white/5'}`}>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-widest text-white/20">{module.number}</span>
                  {module.highlight && (
                    <span className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded-full"
                      style={{ backgroundColor: '#FFD70022', color: '#FFD700' }}>
                      AI Powered
                    </span>
                  )}
                </div>
                <h3 className="text-lg font-black text-white">{module.name}</h3>
                <p className="text-xs italic text-white/35">{module.purpose}</p>
                <ul className="mt-auto space-y-1">
                  {module.features.map((f) => (
                    <li key={f} className="text-xs text-white/40 flex items-center gap-2">
                      <span style={{ color: module.color }}>◆</span>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Big idea */}
      <section className="py-20 px-6 sm:px-12 lg:px-20" style={{ background: '#050505', borderTop: '1px solid #ffffff08' }}>
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-xs font-bold uppercase tracking-[0.3em] mb-6" style={{ color: '#00CFFF' }}>
            The Big Idea
          </p>
          <h2 className="text-3xl sm:text-4xl font-black text-white mb-6 leading-tight">
            Everything connects through a single profile —<br />
            <span style={{ color: '#00CFFF' }}>athlete, club, and competition.</span>
          </h2>
          <p className="text-sm text-white/30 max-w-xl mx-auto leading-relaxed">
            From grassroots participation through to elite competition — one platform connects every stakeholder, makes sport more engaging, more efficient, and more financially sustainable.
          </p>
        </div>
      </section>

      {/* All products */}
      <section className="py-24 px-6 sm:px-12 lg:px-20">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16">
            <p className="text-xs font-bold uppercase tracking-[0.3em] mb-3" style={{ color: '#00CFFF' }}>
              Our Products
            </p>
            <h2 className="text-3xl sm:text-4xl font-black text-white">
              What we're building.
            </h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {brands.map((brand) => (
              <div key={brand.name} className="rounded-2xl border border-white/10 bg-white/5 p-6 flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-black text-white">{brand.name}</h3>
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-full"
                    style={{
                      backgroundColor: brand.status === 'Live' ? '#00CFFF22' : brand.status === 'Pending' ? '#FFD70022' : '#ffffff11',
                      color: brand.status === 'Live' ? '#00CFFF' : brand.status === 'Pending' ? '#FFD700' : '#666666',
                    }}>
                    {brand.status}
                  </span>
                </div>
                <p className="text-xs text-white/35 leading-relaxed">{brand.desc}</p>
                <div className="h-px mt-auto" style={{ backgroundColor: brand.color + '30' }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
