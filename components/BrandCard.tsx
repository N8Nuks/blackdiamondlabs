interface BrandCardProps {
  name: string
  edition: string
  tagline: string
  description: string
  href: string
  status: string
  accentColor: string
}

export default function BrandCard({ name, edition, tagline, description, href, status, accentColor }: BrandCardProps) {
  const isLive = status === 'live'

  return (
    <div className="w-full flex flex-col rounded-2xl border border-white/10 bg-white/5 p-8 text-center">
      <div className="flex items-center justify-center mb-4">
        <span className="rounded-full px-3 py-0.5 text-xs font-semibold uppercase tracking-wider"
          style={{ backgroundColor: isLive ? accentColor + '22' : '#ffffff11', color: isLive ? accentColor : '#666666' }}>
          {isLive ? 'Live' : 'Coming Soon'}
        </span>
      </div>

      <h3 className="text-xl font-black text-white">{name}</h3>
      <p className="text-sm text-white/30 mt-1 mb-3">{edition}</p>
      <p className="text-sm font-semibold italic mb-4" style={{ color: isLive ? accentColor : '#555555' }}>{tagline}</p>
      <p className="text-sm text-white/40 leading-relaxed flex-1">{description}</p>

      {isLive && (
        <a href={href} className="mt-8 inline-flex items-center justify-center text-sm font-semibold text-white/60 hover:text-white transition-colors">
          Visit platform <span className="ml-2">→</span>
        </a>
      )}
    </div>
  )
}
