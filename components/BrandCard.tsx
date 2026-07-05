interface BrandCardProps {
  name: string
  edition?: string
  tagline: string
  taglineSplit?: { first: string; firstColor: string; second: string; secondColor: string }
  description?: string
  href: string
  status: string
  accentColor: string
  nameSplit?: { first: string; firstColor?: string; second: string; secondColor: string }
  taglineStyle?: React.CSSProperties
  hideEdition?: boolean
  nameStyle?: string
  larger?: boolean
  hideLink?: boolean
}

export default function BrandCard({
  name, edition, tagline, taglineSplit, description, href, status, accentColor,
  nameSplit, taglineStyle, hideEdition, nameStyle, larger, hideLink
}: BrandCardProps) {
  const isLive = status === 'live'

  const shimmerStyle = (colors: string): React.CSSProperties => ({
    background: colors,
    backgroundSize: '200% auto',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    animation: 'shimmer 3s linear infinite',
  })

  const grassStyle: React.CSSProperties = {
    background: 'linear-gradient(180deg, #87CEEB 0%, #60B8E0 20%, #87CEEB 35%, #90EE90 52%, #3a9c3a 65%, #1f6b1f 80%, #0d420d 100%)',
    backgroundSize: '100% 100%',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    filter: 'drop-shadow(0 2px 4px rgba(0,100,0,0.4))',
  }

  return (
    <div className={`w-full flex flex-col rounded-2xl border border-white/10 bg-white/5 text-center hover:bg-white/8 transition-all duration-300 ${larger ? 'p-10 sm:p-14' : 'p-6 sm:p-8'}`}>

      {!hideEdition && edition && (
        <p className="text-xs text-white/30 mb-3 uppercase tracking-wider">{edition}</p>
      )}

      <h3 className={`font-black leading-tight mb-1 ${larger ? 'text-3xl' : 'text-xl'}`}>
        {nameStyle === 'futureproof' ? (
          <>
            <span style={shimmerStyle('linear-gradient(90deg,#B8860B,#FFD700,#FFF8DC,#FFD700,#B8860B)')}>FutureProof</span>
            {' '}
            <span style={{ ...shimmerStyle('linear-gradient(90deg,#888,#fff,#ccc,#fff,#888)'), animationDelay: '0.5s' }}>Solutions</span>
          </>
        ) : nameStyle === 'grassroots' ? (
          <>
            <span style={grassStyle}>Grassroots</span>
            {' '}
            <span style={shimmerStyle('linear-gradient(90deg,#a0c4ff,#ffffff,#c8e6ff,#ffffff,#a0c4ff)')}>Fantasy</span>
          </>
        ) : nameSplit ? (
          <>
            <span style={{ color: nameSplit.firstColor || '#ffffff' }}>{nameSplit.first}</span>
            <span style={{ color: nameSplit.secondColor }}>{nameSplit.second}</span>
          </>
        ) : (
          <span className="text-white">{name}</span>
        )}
      </h3>

      {taglineSplit ? (
        <p className={`font-semibold italic mt-3 mb-3 ${larger ? 'text-base' : 'text-sm'}`}>
          <span style={{ color: taglineSplit.firstColor }}>{taglineSplit.first}</span>
          {' '}
          <span style={{ color: taglineSplit.secondColor }}>{taglineSplit.second}</span>
        </p>
      ) : (
        <p className={`font-semibold mt-3 mb-3 ${larger ? 'text-base' : 'text-sm'}`}
          style={taglineStyle || { color: isLive ? accentColor : '#888888' }}>
          {tagline}
        </p>
      )}

      {description && (
        <p className="text-xs text-white/35 leading-relaxed flex-1 italic">
          {description}
        </p>
      )}

      {isLive && !hideLink && (
        <a href={href} className="mt-8 inline-flex items-center justify-center text-sm font-semibold text-white/60 hover:text-white transition-colors">
          Visit platform <span className="ml-2">→</span>
        </a>
      )}
    </div>
  )
}
