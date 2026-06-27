interface BrandCardProps {
  name: string
  edition?: string
  tagline: string
  description?: string
  href: string
  status: string
  accentColor: string
  nameSplit?: { first: string; second: string; secondColor: string }
  taglineStyle?: React.CSSProperties
  hideEdition?: boolean
  nameStyle?: string
}

export default function BrandCard({
  name, edition, tagline, description, href, status, accentColor,
  nameSplit, taglineStyle, hideEdition, nameStyle
}: BrandCardProps) {
  const isLive = status === 'live'

  return (
    <div className="w-full flex flex-col rounded-2xl border border-white/10 bg-white/5 p-6 sm:p-8 text-center hover:bg-white/8 transition-all duration-300">

      {!hideEdition && edition && (
        <p className="text-xs text-white/30 mb-3 uppercase tracking-wider">{edition}</p>
      )}

      <h3 className="text-xl font-black leading-tight mb-1">
        {nameStyle === 'futureproof' ? (
          <>
            <span style={{
              background: 'linear-gradient(90deg,#B8860B,#FFD700,#FFF8DC,#FFD700,#B8860B)',
              backgroundSize: '200% auto',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              animation: 'shimmer 3s linear infinite',
            }}>FutureProof</span>
            {' '}
            <span style={{
              background: 'linear-gradient(90deg,#888,#fff,#ccc,#fff,#888)',
              backgroundSize: '200% auto',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              animation: 'shimmer 3s linear infinite',
              animationDelay: '0.5s',
            }}>Solutions</span>
          </>
        ) : nameSplit ? (
          <>
            <span style={{ color: '#ffffff' }}>{nameSplit.first}</span>
            <span style={{ color: nameSplit.secondColor }}>{nameSplit.second}</span>
          </>
        ) : (
          <span className="text-white">{name}</span>
        )}
      </h3>

      <p className="text-sm font-semibold mt-3 mb-3" style={taglineStyle || { color: isLive ? accentColor : '#888888' }}>
        {tagline}
      </p>

      {description && (
        <p className="text-xs text-white/35 leading-relaxed flex-1 italic">
          {description}
        </p>
      )}

      {isLive && (
        <a href={href} className="mt-6 inline-flex items-center justify-center text-sm font-semibold text-white/60 hover:text-white transition-colors">
          Visit platform <span className="ml-2">→</span>
        </a>
      )}
    </div>
  )
}
