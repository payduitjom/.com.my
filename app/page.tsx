import { SiteHeader } from '@/components/site-header'
import { Hero } from '@/components/hero'
import { HowItWorks } from '@/components/how-it-works'
import { WhyChoose } from '@/components/why-choose'
import { CashCta } from '@/components/cash-cta'
import { Faq } from '@/components/faq'
import { SiteFooter } from '@/components/site-footer'

export default function Page() {
  return (
    <main className="min-h-screen bg-background">
      <SiteHeader />
      <Hero />
      <HowItWorks />
      <WhyChoose />
      <CashCta />
      <Faq />
      <SiteFooter />
    </main>
  )
}
