import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

const H = ({ children }: { children: React.ReactNode }) => <h2 className="text-lg font-black mt-10 mb-3 text-white">{children}</h2>
const P = ({ children }: { children: React.ReactNode }) => <p className="text-sm text-white/50 leading-relaxed mb-3">{children}</p>

export default function Terms() {
  return (
    <main className="min-h-screen text-white relative">
      <Nav />
      <section className="relative z-10 pt-36 pb-24 px-6">
        <div className="max-w-2xl mx-auto">
          <p className="text-xs font-bold uppercase tracking-[0.35em] mb-3" style={{ color: '#C7CEDA' }}>Black Diamond Labs</p>
          <h1 className="text-3xl sm:text-4xl font-black mb-2">Terms of Service</h1>
          <p className="text-xs text-white/30 mb-10">Last updated: 19 July 2026 · Black Diamond Labs Limited (NZBN 9429053800411)</p>

          <H>1. General</H>
          <P>These terms apply to all products and services provided by Black Diamond Labs Limited ("BDL", "we", "us"), including Black Diamond AI ("BDAI") and Black Diamond Performance ("BDP"). By purchasing or using our services you accept these terms. Nothing in these terms limits your rights under the Consumer Guarantees Act 1993 or the Fair Trading Act 1986.</P>

          <H>2. Pricing</H>
          <P>All prices are in New Zealand dollars and inclusive of GST where applicable. Launch pricing is available for a limited time and pricing is subject to change. Where a subscription is purchased at launch pricing, that pricing continues for the life of the subscription unless we notify you otherwise in advance.</P>

          <H>3. Black Diamond AI — subscriptions</H>
          <P>BDAI provides AI coaching assistants accessed by subscription and personal access key. Your key is for your own use and must not be shared; we may monitor usage patterns and suspend keys that show account sharing, after contacting you first. Subscriptions renew automatically until cancelled and can be cancelled at any time, taking effect at the end of the current billing period. AI-generated coaching content is general guidance, not medical, health, or professional advice.</P>

          <H>4. Black Diamond Performance — bookings</H>
          <P>Payment is required to confirm a Performance Review booking. Video footage must be submitted within 14 days of booking and at least 48 hours before your scheduled consultation; if footage is not received within 14 days, your booking will lapse and you may request a credit or refund. Consultations may be rescheduled free of charge with at least 24 hours&apos; notice. If you cancel before your footage has been reviewed, you will receive a full refund; once analysis has begun, refunds are at our discretion. Consultations are not recorded unless agreed in advance by all parties. Recommendations are general athletic development guidance, not medical advice; athletes returning from injury should have appropriate clearance before applying training recommendations.</P>

          <H>5. Athletes under 18</H>
          <P>For any BDP service involving an athlete under 18, a parent or guardian must provide the required consents at booking, and a parent, guardian or other responsible adult must be present during any online consultation.</P>

          <H>6. Intellectual property</H>
          <P>All content, branding, coaching frameworks, and materials provided through our services remain the property of Black Diamond Labs Limited or its licensors. Feedback and plans provided to you are for your personal training use.</P>

          <H>7. Liability</H>
          <P>Physical training carries inherent risk. You are responsible for training within your own capability and seeking medical advice where appropriate. To the maximum extent permitted by law, and except for the guarantees in the Consumer Guarantees Act 1993 where they apply, our total liability in connection with a service is limited to the amount you paid for that service.</P>

          <H>8. Contact</H>
          <P>Questions about these terms: info@blackdiamondlabs.co.nz</P>
        </div>
      </section>
      <Footer />
    </main>
  )
}
