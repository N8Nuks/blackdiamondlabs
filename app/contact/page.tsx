'use client'
import { useState } from 'react'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

export default function Contact() {
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({
    name: '', email: '', phone: '',
    sport: '', problem: '', audience: '',
    solution: '', competitors: '', stage: '', why: '',
  })

  const handle = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const [loading, setLoading] = useState(false)

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (res.ok) setSubmitted(true)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const inputClass = "w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-white/30 transition-colors"
  const labelClass = "block text-xs font-bold uppercase tracking-widest mb-2"

  return (
    <main className="min-h-screen bg-black text-white">
      <Nav />

      {/* Hero */}
      <section className="relative pt-40 pb-24 px-8 sm:px-16 lg:px-32 overflow-hidden">
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 70% 50% at 50% 0%, #001525 0%, #000 65%)' }} />
        <div className="relative z-10 max-w-5xl mx-auto">
          <p className="text-xs font-bold uppercase tracking-[0.35em] mb-5" style={{ color: '#C7CEDA' }}>Get In Touch</p>
          <h1 className="text-6xl sm:text-7xl lg:text-8xl font-black leading-none mb-10 text-white">
            Contact<br />BDL<span style={{ color: '#C7CEDA' }}>.</span>
          </h1>
          <div className="h-px w-24 mb-10" style={{ backgroundColor: 'rgba(255,255,255,0.25)' }} />
          <p className="text-base text-white/40 leading-relaxed max-w-xl">
            Have a question, a partnership idea, or want to pitch us your vision? We'd love to hear from you.
          </p>
        </div>
      </section>

      <section className="px-8 sm:px-16 lg:px-32 pb-32">
        <div className="max-w-5xl mx-auto grid lg:grid-cols-3 gap-12">

          {/* Left — contact info */}
          <div className="flex flex-col gap-8">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.35em] mb-5" style={{ color: '#C7CEDA' }}>Direct Contact</p>
              <a href="mailto:info@blackdiamondlabs.co.nz"
                className="text-sm text-white/50 hover:text-white transition-colors">
                info@blackdiamondlabs.co.nz
              </a>
            </div>

            <div className="h-px w-12" style={{ backgroundColor: 'rgba(255,255,255,0.15)' }} />

            <div>
              <p className="text-xs font-bold uppercase tracking-[0.35em] mb-4" style={{ color: '#C7CEDA' }}>Have an Idea?</p>
              <p className="text-sm text-white/30 leading-relaxed">
                We're always looking for the next platform to build. If you have an idea that could unlock the potential of a sport or community, submit it using the form and we'll review it.
              </p>
            </div>

            <div className="h-px w-12" style={{ backgroundColor: 'rgba(255,255,255,0.15)' }} />

            <div>
              <p className="text-xs font-bold uppercase tracking-[0.35em] mb-4" style={{ color: '#C7CEDA' }}>Based In</p>
              <p className="text-sm text-white/30">Auckland, New Zealand</p>
            </div>
          </div>

          {/* Right — form */}
          <div className="lg:col-span-2">
            {submitted ? (
              <div className="rounded-2xl border border-white/5 bg-white/[0.015] p-12 text-center flex flex-col gap-6">
                <div className="text-4xl">◆</div>
                <h2 className="text-2xl font-black text-white">Idea received.</h2>
                <p className="text-sm text-white/40 leading-relaxed max-w-sm mx-auto">
                  Thank you for sharing your vision with us. We review every submission and will be in touch if it's a fit for Black Diamond Labs.
                </p>
              </div>
            ) : (
              <form onSubmit={submit} className="flex flex-col gap-8">

                {/* Section 1 — Your details */}
                <div className="rounded-2xl border border-white/5 bg-white/[0.015] p-8 flex flex-col gap-6">
                  <p className="text-xs font-bold uppercase tracking-[0.35em]" style={{ color: '#C7CEDA' }}>Your Details</p>

                  <div>
                    <label className={labelClass} style={{ color: '#ffffff60' }}>Full Name *</label>
                    <input name="name" required value={form.name} onChange={handle}
                      placeholder="Your full name" className={inputClass} />
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className={labelClass} style={{ color: '#ffffff60' }}>Email *</label>
                      <input name="email" type="email" required value={form.email} onChange={handle}
                        placeholder="your@email.com" className={inputClass} />
                    </div>
                    <div>
                      <label className={labelClass} style={{ color: '#ffffff60' }}>Phone (optional)</label>
                      <input name="phone" value={form.phone} onChange={handle}
                        placeholder="+64 21 000 0000" className={inputClass} />
                    </div>
                  </div>
                </div>

                {/* Section 2 — The idea */}
                <div className="rounded-2xl border border-white/5 bg-white/[0.015] p-8 flex flex-col gap-6">
                  <p className="text-xs font-bold uppercase tracking-[0.35em]" style={{ color: '#C7CEDA' }}>Your Idea</p>

                  <div>
                    <label className={labelClass} style={{ color: '#ffffff60' }}>What sport or community is your idea for? *</label>
                    <input name="sport" required value={form.sport} onChange={handle}
                      placeholder="e.g. Softball, Rugby League, Community Fitness..." className={inputClass} />
                  </div>

                  <div>
                    <label className={labelClass} style={{ color: '#ffffff60' }}>What problem does it solve? *</label>
                    <textarea name="problem" required value={form.problem} onChange={handle}
                      placeholder="What pain point exists today that your idea addresses?"
                      rows={3} className={inputClass + ' resize-none'} />
                  </div>

                  <div>
                    <label className={labelClass} style={{ color: '#ffffff60' }}>Who would use it? *</label>
                    <input name="audience" required value={form.audience} onChange={handle}
                      placeholder="e.g. Athletes, Club administrators, Fans, Coaches..." className={inputClass} />
                  </div>

                  <div>
                    <label className={labelClass} style={{ color: '#ffffff60' }}>What does your solution look like? *</label>
                    <textarea name="solution" required value={form.solution} onChange={handle}
                      placeholder="Describe your idea — what would it do and how would it work?"
                      rows={4} className={inputClass + ' resize-none'} />
                  </div>

                  <div>
                    <label className={labelClass} style={{ color: '#ffffff60' }}>Does anything like this already exist?</label>
                    <textarea name="competitors" value={form.competitors} onChange={handle}
                      placeholder="Are there competitors or alternatives? What makes yours different?"
                      rows={3} className={inputClass + ' resize-none'} />
                  </div>

                  <div>
                    <label className={labelClass} style={{ color: '#ffffff60' }}>What stage is your idea at? *</label>
                    <select name="stage" required value={form.stage} onChange={handle} className={inputClass}>
                      <option value="" disabled>Select a stage...</option>
                      <option value="idea">Just an idea</option>
                      <option value="research">Some research done</option>
                      <option value="prototype">Prototype exists</option>
                      <option value="ready">Ready to build</option>
                    </select>
                  </div>

                  <div>
                    <label className={labelClass} style={{ color: '#ffffff60' }}>Why should Black Diamond Labs build this? *</label>
                    <textarea name="why" required value={form.why} onChange={handle}
                      placeholder="What makes this idea the right fit for BDL and our mission?"
                      rows={3} className={inputClass + ' resize-none'} />
                  </div>
                </div>

                <button type="submit"
                  className="self-start inline-flex items-center gap-3 border border-white/20 px-10 py-4 text-sm font-bold text-white hover:bg-white/5 hover:border-white/40 transition-all duration-200">
                  Submit Your Idea
                  <span style={{ color: '#C7CEDA' }}>◆</span>
                </button>

              </form>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
