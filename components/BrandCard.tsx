interface BrandCardProps {
  name: string
  edition?: string
  tagline: string
  taglineSplit?: { first: string; second: string; secondColor: string }
  description?: string
  href: string
  status: string
  accentColor: string
  nameSplit?: { first: string; firstColor?: string; second: string; secondColor: string; secondShimmer?: boolean }
  taglineStyle?: React.CSSProperties
  hideEdition?: boolean
  nameStyle?: string
  larger?: boolean
}

export default function BrandCard({
  name, edition, tagline, taglineSplit, description, href, status, accentColor,
  nameSplit, taglineStyle, hideEdition, nameStyle, larger
}: BrandCardProps) {
  const isLive = status === 'live'

  return (
    <div className={`w-full flex flex-col rounded-2xl border border-white/10 bg-white/5 text-center hover:bg-white/8 transition-all duration-300 ${larger ? 'p-10 sm:p-14' : 'p-6 sm:p-8'}`}>

      {!hideEdition && edition && (
        <p className="text-xs text-white/30 mb-3 uppercase tracking-wider">{edition}</p>
      )}

      <h3 className={`font-black leading-tight mb-1 ${larger ? 'text-3xl' : 'text-xl'}`}>
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
        ) : nameStyle === 'grassroots' ? (
          <>
            <span style={{ color: '#2d9e4e' }}>Grassroots</span>
            {' '}
            <span style={{
              background: 'linear-gradient(90deg,#a0c4ff,#ffffff,#c8e6ff,#ffffff,#a0c4ff)',
              backgroundSize: '200% auto',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              animation: 'shimmer 3s linear infinite',
            }}>Fantasy</span>
          </>
        ) : nameSplit ? (
          <>
            <span style={{ color: nameSplit.firstColor || '#ffffff' }}>{nameSplit.first}</span>
            <span style={nameSplit.secondShimmer ? {
              background: 'linear-gradient(90deg,#a0c4ff,#ffffff,#c8e6ff,#ffffff,#a0c4ff)',
              backgroundSize: '200% auto',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              animation: 'shimmer 3s linear infinite',
            } : { color: nameSplit.secondColor }}>{nameSplit.second}</span>
          </>
        ) : (
          <span className="text-white">{name}</span>
        )}
      </h3>

      {taglineSplit ? (
        <p className={`font-semibold mt-3 mb-3 ${larger ? 'text-base' : 'text-sm'}`}>
          <span style={{ color: accentColor }}>{taglineSplit.first}</span>
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

      {isLive && (
        <a href={href} className="mt-8 inline-flex items-center justify-center text-sm font-semibold text-white/60 hover:text-white transition-colors">
          Visit platform <span className="ml-2">→</span>
        </a>
      )}
    </div>
  )
}
