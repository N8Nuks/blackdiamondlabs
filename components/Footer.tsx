export default function Footer() {
  return (
    <footer className="border-t border-white/5 px-12 py-8 bg-black">
      <div className="mx-auto max-w-6xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-6 text-xs text-white/20">
          <a href="mailto:info@blackdiamondlabs.co.nz" className="hover:text-white/50 transition-colors">info@blackdiamondlabs.co.nz</a>
        </div>
        <p className="text-xs text-white/20">© 2026 Black Diamond Labs</p>
      </div>
    </footer>
  )
}
