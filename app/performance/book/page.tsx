'use client'
import { useState } from 'react'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

const silverText: React.CSSProperties = { background: 'linear-gradient(90deg,#8E9BA8,#E6EAF0,#FFFFFF,#E6EAF0,#8E9BA8)', backgroundSize: '200% auto', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', animation: 'shimmer 3s linear infinite' }
const API = 'https://api.blackdiamondlabs.co.nz/v1/bdp/book'
const inputCls = 'w-full rounded-lg bg-white/[0.04] border border-white/10 px-4 py-3 text-sm text-white placeholder-white/25 focus:outline-none focus:border-white/40 transition-colors'
const labelCls = 'block text-xs font-bold uppercase tracking-widest text-white/50 mb-2'

const AREAS = ['Hitting', 'Infield Defence', 'Outfield Defence', 'Base Running', 'General Game Performance']
const LEVELS = ['Club', 'Representative', 'National Age Group', 'Premier/Open', 'Other']
const PREPARING = ['Representative Trials', 'Tournament', 'Club Season', 'Returning from Injury', 'General Improvement', 'Other']
const FREQ = ['1', '2', '3', '4+']

function ageFromDob(dob: string): number {
  if (!dob) return 0
  const d = new Date(dob); const now = new Date()
  let a = now.getFullYear() - d.getFullYear()
  if (now.getMonth() < d.getMonth() || (now.getMonth() === d.getMonth() && now.getDate() < d.getDate())) a--
  return a
}

export default function Book() {
  const [f, setF] = useState<any>({
    athlete_name: '', dob: '', email: '', mobile: '', town_city: '',
    guardian_name: '', guardian_email: '', guardian_mobile: '',
    club: '', rep_teams: '', position_primary: '', position_secondary: '', playing_level: '',
    review_area: '', preferred_day: '', preferred_time: '', timezone: '',
    q_goal: '', q_why_area: '', q_strengths: '', q_improve: '', q_specific: '',
    q_preparing_for: '', q_injury_clearance: '', q_train_freq: '', q_other: '',
    consent_footage: false, consent_progressive: false, consent_medical: false, consent_contact: false,
    consent_terms: false, consent_marketing: false, consent_media: false, consent_research: false,
    guardian_participation: false, guardian_present: false, guardian_privacy: false,
  })
  const [err, setErr] = useState(''); const [busy, setBusy] = useState(false)
  const set = (k: string) => (e: any) => setF({ ...f, [k]: e.target.type === 'checkbox' ? e.target.checked : e.target.value })

  const age = ageFromDob(f.dob)
  const isMinor = f.dob !== '' && age < 18

  async function submit() {
    setErr('')
    if (!f.athlete_name || !f.dob || !f.email || !f.review_area) { setErr('Please complete athlete name, date of birth, email, and review area.'); return }
    if (!f.consent_footage || !f.consent_progressive || !f.consent_medical || !f.consent_contact || !f.consent_terms) { setErr('Please confirm all required consent items.'); return }
    if (isMinor && (!f.guardian_name || !f.guardian_email || !f.guardian_participation || !f.guardian_present || !f.guardian_privacy)) { setErr('Parent/guardian details and all parent/guardian consent items are required for athletes under 18.'); return }
    setBusy(true)
    try {
      const res = await fetch(API, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          athlete_name: f.athlete_name, dob: f.dob, age, email: f.email, mobile: f.mobile, town_city: f.town_city,
          is_minor: isMinor, guardian_name: f.guardian_name, guardian_email: f.guardian_email, guardian_mobile: f.guardian_mobile,
          club: f.club, rep_teams: f.rep_teams, position_primary: f.position_primary, position_secondary: f.position_secondary,
          playing_level: f.playing_level, review_area: f.review_area,
          preferred_day: f.preferred_day, preferred_time: f.preferred_time, timezone: f.timezone,
          q_goal: f.q_goal, q_why_area: f.q_why_area, q_strengths: f.q_strengths, q_improve: f.q_improve,
          q_specific: f.q_specific, q_preparing_for: f.q_preparing_for, q_injury_clearance: f.q_injury_clearance,
          q_train_freq: f.q_train_freq, q_other: f.q_other,
          consent_terms: f.consent_terms, consent_marketing: f.consent_marketing, consent_media: f.consent_media, consent_research: f.consent_research,
          guardian_consent: f.guardian_participation && f.guardian_present && f.guardian_privacy,
        }),
      })
      const data = await res.json()
      if (!res.ok) { setErr(data.detail || 'Something went wrong. Please try again.'); setBusy(false); return }
      window.location.href = data.payment_url
    } catch {
      setErr('Could not reach the booking service. Please try again shortly.'); setBusy(false)
    }
  }

  const Check = ({ k, children }: { k: string, children: React.ReactNode }) => (
    <label className="flex items-start gap-3 text-sm text-white/60 leading-relaxed cursor-pointer">
      <input type="checkbox" checked={f[k]} onChange={set(k)} className="mt-1 h-4 w-4 shrink-0 accent-white" />
      <span>{children}</span>
    </label>
  )
  const H = ({ children }: { children: React.ReactNode }) => (
    <h2 className="text-lg font-black mt-12 mb-5 pb-2 border-b border-white/10">{children}</h2>
  )

  return (
    <main className="min-h-screen text-white relative">
      <Nav />
      <noscript>
        <div style={{ padding: '140px 24px 24px', textAlign: 'center', fontSize: 14, color: '#f87171', fontWeight: 700 }}>
          This booking form needs JavaScript, which your browser or network is blocking. Please book from a personal device, or contact info@blackdiamondlabs.co.nz and we&apos;ll book you in directly.
        </div>
      </noscript>
      <style>{`@keyframes shimmer { 0% { background-position: -200% center; } 100% { background-position: 200% center; } }`}</style>
      <section className="relative z-10 pt-36 pb-24 px-6">
        <div className="max-w-2xl mx-auto">
          <p className="text-xs font-bold uppercase tracking-[0.35em] mb-3" style={{ color: '#C7CEDA' }}>Black Diamond Performance</p>
          <h1 className="text-3xl sm:text-5xl font-black mb-3">Book your <span style={silverText}>Performance Review</span></h1>
          <div className="flex items-end gap-3 mb-2">
            <span className="text-white/30 line-through">$180 NZD</span>
            <span className="text-2xl font-black" style={silverText}>$99 NZD</span>
          </div>
          <p className="text-xs text-white/40 mb-2">Launch price — limited time only. Inclusive of GST where applicable. Payment confirms your booking.</p>

          <H>Athlete details</H>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2"><label className={labelCls}>Athlete name *</label><input className={inputCls} value={f.athlete_name} onChange={set('athlete_name')} /></div>
            <div><label className={labelCls}>Date of birth *</label><input type="date" className={inputCls} value={f.dob} onChange={set('dob')} /></div>
            <div><label className={labelCls}>Email *</label><input type="email" className={inputCls} value={f.email} onChange={set('email')} /></div>
            <div><label className={labelCls}>Mobile</label><input className={inputCls} value={f.mobile} onChange={set('mobile')} /></div>
            <div><label className={labelCls}>Town / City</label><input className={inputCls} value={f.town_city} onChange={set('town_city')} /></div>
          </div>

          {isMinor && (
            <>
              <H>Parent / guardian details <span className="text-xs font-normal text-white/40">(required — athlete is under 18)</span></H>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2"><label className={labelCls}>Parent/guardian name *</label><input className={inputCls} value={f.guardian_name} onChange={set('guardian_name')} /></div>
                <div><label className={labelCls}>Parent/guardian email *</label><input type="email" className={inputCls} value={f.guardian_email} onChange={set('guardian_email')} /></div>
                <div><label className={labelCls}>Parent/guardian mobile</label><input className={inputCls} value={f.guardian_mobile} onChange={set('guardian_mobile')} /></div>
              </div>
            </>
          )}

          <H>Diamond Sports information</H>
          <div className="grid sm:grid-cols-2 gap-4">
            <div><label className={labelCls}>Current club</label><input className={inputCls} value={f.club} onChange={set('club')} /></div>
            <div><label className={labelCls}>Representative team(s)</label><input className={inputCls} value={f.rep_teams} onChange={set('rep_teams')} /></div>
            <div><label className={labelCls}>Primary position</label><input className={inputCls} value={f.position_primary} onChange={set('position_primary')} /></div>
            <div><label className={labelCls}>Secondary position</label><input className={inputCls} value={f.position_secondary} onChange={set('position_secondary')} /></div>
            <div className="sm:col-span-2"><label className={labelCls}>Current playing level</label>
              <select className={inputCls} value={f.playing_level} onChange={set('playing_level')}>
                <option value="">Select…</option>{LEVELS.map(l => <option key={l} value={l}>{l}</option>)}
              </select>
            </div>
          </div>

          <H>Your Performance Review</H>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2"><label className={labelCls}>Area to review *</label>
              <select className={inputCls} value={f.review_area} onChange={set('review_area')}>
                <option value="">Select one area…</option>{AREAS.map(a => <option key={a} value={a}>{a}</option>)}
              </select>
            </div>
            <div><label className={labelCls}>Preferred day</label><input className={inputCls} placeholder="e.g. Tuesday evenings, weekends" value={f.preferred_day} onChange={set('preferred_day')} /></div>
            <div><label className={labelCls}>Preferred time</label><input className={inputCls} value={f.preferred_time} onChange={set('preferred_time')} /></div>
            <div className="sm:col-span-2"><label className={labelCls}>Time zone (if outside New Zealand)</label><input className={inputCls} value={f.timezone} onChange={set('timezone')} /></div>
          </div>
          <p className="text-xs text-white/40 mt-3">Your consultation date and time will be confirmed by email once your video footage has been received.</p>

          <H>Athlete questionnaire</H>
          <div className="space-y-4">
            <div><label className={labelCls}>Your biggest Diamond Sports goal over the next 12 months</label><textarea rows={2} className={inputCls} value={f.q_goal} onChange={set('q_goal')} /></div>
            <div><label className={labelCls}>Why did you choose this area for your review?</label><textarea rows={2} className={inputCls} value={f.q_why_area} onChange={set('q_why_area')} /></div>
            <div><label className={labelCls}>What do you think you do well?</label><textarea rows={2} className={inputCls} value={f.q_strengths} onChange={set('q_strengths')} /></div>
            <div><label className={labelCls}>What would you most like to improve?</label><textarea rows={2} className={inputCls} value={f.q_improve} onChange={set('q_improve')} /></div>
            <div><label className={labelCls}>Anything specific you'd like Nathan and Katrina to look at?</label><textarea rows={2} className={inputCls} value={f.q_specific} onChange={set('q_specific')} /></div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div><label className={labelCls}>Currently preparing for</label>
                <select className={inputCls} value={f.q_preparing_for} onChange={set('q_preparing_for')}>
                  <option value="">Select…</option>{PREPARING.map(p => <option key={p} value={p}>{p}</option>)}
                </select>
              </div>
              <div><label className={labelCls}>Training sessions per week</label>
                <select className={inputCls} value={f.q_train_freq} onChange={set('q_train_freq')}>
                  <option value="">Select…</option>{FREQ.map(x => <option key={x} value={x}>{x}</option>)}
                </select>
              </div>
            </div>
            {f.q_preparing_for === 'Returning from Injury' && (
              <div><label className={labelCls}>Do you have clearance to train?</label>
                <select className={inputCls} value={f.q_injury_clearance} onChange={set('q_injury_clearance')}>
                  <option value="">Select…</option>
                  <option>Yes</option><option>Awaiting clearance</option><option>Not yet</option>
                </select>
              </div>
            )}
            <div><label className={labelCls}>Anything else you'd like us to know?</label><textarea rows={2} className={inputCls} value={f.q_other} onChange={set('q_other')} /></div>
          </div>

          <H>Booking terms</H>
          <ul className="text-xs text-white/40 leading-relaxed space-y-2">
            <li>— Payment is required to confirm your booking.</li>
            <li>— Video footage must be submitted within 14 days of booking, and at least 48 hours before your scheduled consultation. If footage is not received within 14 days, your booking will lapse and you may request a credit or refund.</li>
            <li>— Consultations may be rescheduled free of charge with at least 24 hours' notice.</li>
            <li>— If you cancel before your footage has been reviewed, you will receive a full refund. Once analysis has begun, refunds are at the discretion of Black Diamond Performance. Nothing in these terms limits your rights under the Consumer Guarantees Act 1993.</li>
            <li>— Your footage and personal information are stored securely, accessed only by authorised Black Diamond Labs Limited personnel for the purpose of your review, and footage is deleted within 30 days of your consultation unless you request otherwise.</li>
            <li>— Consultations are not recorded unless agreed in advance by all parties.</li>
            <li>— For athletes under 18, a parent, guardian or other responsible adult must be present during the consultation.</li>
            <li>— Launch pricing is available for a limited time and pricing is subject to change.</li>
          </ul>

          <H>Athlete consent <span className="text-xs font-normal text-white/40">(all required)</span></H>
          <div className="space-y-3">
            <Check k="consent_footage">I understand that my consultation will be based on the video footage I provide.</Check>
            <Check k="consent_progressive">I understand that recommendations are intended to support my development and should be applied progressively.</Check>
            <Check k="consent_medical">I understand that recommendations are not medical advice, and if I am returning from injury I should have appropriate clearance before training.</Check>
            <Check k="consent_contact">I agree that Black Diamond Performance may contact me regarding my booking.</Check>
            <Check k="consent_terms">I have read and accept the Booking Terms above and the <a href="/terms" target="_blank" className="underline">Terms of Service</a>.</Check>
          </div>

          <H>Optional</H>
          <div className="space-y-3">
            <Check k="consent_marketing">I'd like to receive updates from Black Diamond Labs about future programmes, camps and products.</Check>
            <Check k="consent_media">I give permission for short excerpts of my footage or review to be used to promote Black Diamond Performance. (Your review is unaffected either way.)</Check>
            <Check k="consent_research">I'm happy for my footage to be retained and used in anonymised form to help develop Black Diamond Labs' athlete analysis tools. (Optional — if unticked, footage is deleted within 30 days as standard.)</Check>
          </div>

          {isMinor && (
            <>
              <H>Parent / guardian consent <span className="text-xs font-normal text-white/40">(all required)</span></H>
              <div className="space-y-3">
                <Check k="guardian_participation">I consent to my child participating in the Black Diamond Performance Review.</Check>
                <Check k="guardian_present">I (or another responsible adult) will be present during the online consultation.</Check>
                <Check k="guardian_privacy">I consent to the collection and use of my child's information and video footage as described in the Booking Terms.</Check>
              </div>
            </>
          )}

          {err && <p className="mt-8 text-sm font-bold text-red-400">{err}</p>}

          <button onClick={submit} disabled={busy}
            className="mt-10 w-full rounded-full px-8 py-4 text-sm font-black transition-all hover:opacity-90 disabled:opacity-40"
            style={{ color: '#000', background: 'linear-gradient(90deg,#C7CEDA,#FFFFFF,#C7CEDA)' }}>
            {busy ? 'Preparing secure payment…' : 'Continue to secure payment — $99 NZD'}
          </button>
          <p className="mt-3 text-center text-xs text-white/30">You'll be taken to Stripe to complete payment. Your booking is confirmed once payment is complete.</p>
        </div>
      </section>
      <Footer />
    </main>
  )
}
