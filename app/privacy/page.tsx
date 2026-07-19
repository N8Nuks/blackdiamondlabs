import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

const H = ({ children }: { children: React.ReactNode }) => <h2 className="text-lg font-black mt-10 mb-3 text-white">{children}</h2>
const P = ({ children }: { children: React.ReactNode }) => <p className="text-sm text-white/50 leading-relaxed mb-3">{children}</p>

export default function Privacy() {
  return (
    <main className="min-h-screen text-white relative">
      <Nav />
      <section className="relative z-10 pt-36 pb-24 px-6">
        <div className="max-w-2xl mx-auto">
          <p className="text-xs font-bold uppercase tracking-[0.35em] mb-3" style={{ color: '#C7CEDA' }}>Black Diamond Labs</p>
          <h1 className="text-3xl sm:text-4xl font-black mb-2">Privacy Policy</h1>
          <p className="text-xs text-white/30 mb-10">Last updated: 19 July 2026 · We comply with the Privacy Act 2020</p>

          <H>What we collect</H>
          <P>When you use our services we may collect: contact details (name, email, phone, town/city), softball and performance information you provide (club, positions, goals, questionnaire answers), video footage you submit for review, payment records (processed by Stripe — we do not store card details), and service usage information.</P>

          <H>How we use it</H>
          <P>We use your information to deliver the service you purchased, communicate with you about your booking or subscription, improve our services, and — only where you have opted in — send you updates about Black Diamond Labs programmes and products. You can opt out of marketing at any time by replying to any email or contacting us.</P>

          <H>Video footage</H>
          <P>Footage submitted for a Performance Review is stored securely, accessed only by authorised Black Diamond Labs Limited personnel for the purpose of your review, and deleted within 30 days of your consultation unless you request otherwise. Footage is never used for promotion unless you have given explicit optional consent at booking.</P>

          <H>Children and young athletes</H>
          <P>Our Performance services are available to athletes aged 10 and over. For athletes under 18 we collect parent/guardian contact details and require parent/guardian consent for the collection and use of the athlete&apos;s information and footage. A parent, guardian or other responsible adult must be present during online consultations.</P>

          <H>Storage and sharing</H>
          <P>Your information is stored on secure servers. We use trusted service providers to operate our services (including Stripe for payments and email providers for communications); they receive only what is necessary to perform their function. We do not sell your personal information.</P>

          <H>Your rights</H>
          <P>Under the Privacy Act 2020 you may request access to, or correction of, the personal information we hold about you. Contact info@blackdiamondlabs.co.nz. If you are not satisfied with our response you may complain to the Office of the Privacy Commissioner (privacy.org.nz).</P>
        </div>
      </section>
      <Footer />
    </main>
  )
}
