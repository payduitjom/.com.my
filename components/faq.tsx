'use client'

import { useState } from 'react'
import { Plus } from 'lucide-react'

const faqs = [
  {
    q: 'Siapa yang boleh memohon pinjaman?',
    a: 'Sesiapa sahaja warganegara Malaysia berumur 20 hingga 60 tahun yang sedang bekerja dan mempunyai akaun bank yang sah boleh memohon. Anda hanya memerlukan MyKad dan nombor telefon anda untuk bermula.',
  },
  {
    q: 'Dokumen apa yang saya perlukan untuk permohonan pinjaman?',
    a: 'Anda hanya memerlukan MyKad dan nombor telefon anda. Tiada dokumen pendapatan atau kertas kerja yang rumit diperlukan - proses kami direka untuk menjadi semudah mungkin.',
  },
  {
    q: 'Bagaimana saya akan tahu jika pinjaman saya diluluskan?',
    a: 'Sistem AI kami menganalisis permohonan anda dengan serta-merta dan memberikan keputusan dalam masa purata 5 minit. Anda akan menerima pemberitahuan melalui SMS dan e-mel sebaik sahaja keputusan dibuat.',
  },
  {
    q: 'Berapa lama masa yang diperlukan untuk menerima pinjaman?',
    a: 'Sebaik sahaja diluluskan, dana dipindahkan terus ke akaun bank anda dalam beberapa minit. Kebanyakan pelanggan menerima wang mereka pada hari yang sama.',
  },
  {
    q: 'Kaedah apa yang boleh saya gunakan untuk membayar balik pinjaman?',
    a: 'Anda boleh membayar balik melalui pemindahan bank dalam talian, FPX, atau debit automatik. Anda akan menerima jadual pembayaran balik yang jelas semasa kelulusan.',
  },
  {
    q: 'Bolehkah saya bayar awal pinjaman?',
    a: 'Ya, anda boleh membayar balik pinjaman anda lebih awal pada bila-bila masa tanpa sebarang penalti. Ini boleh membantu anda menjimatkan kos faedah.',
  },
  {
    q: 'Adakah terdapat kos dan caj lain?',
    a: 'Kami mengamalkan ketelusan penuh - tiada yuran tersembunyi atau caj mengejut. Kadar tetap kami ialah 18% p.a. dengan yuran pemprosesan RM 0. Anda akan tahu dengan tepat apa yang perlu dibayar sebelum memohon.',
  },
  {
    q: 'Bolehkah saya mengambil pinjaman lain?',
    a: 'Ya, pelanggan sedia ada yang mempunyai rekod pembayaran yang baik boleh memohon pinjaman tambahan tertakluk kepada kelulusan.',
  },
]

export function Faq() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section id="soalan" className="bg-background py-20 sm:py-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-center text-3xl font-extrabold text-foreground sm:text-4xl">
          Soalan Lazim
        </h2>

        <div className="mt-12 space-y-3">
          {faqs.map((faq, i) => {
            const isOpen = open === i
            return (
              <div
                key={faq.q}
                className="overflow-hidden rounded-2xl border border-border bg-card"
              >
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="font-semibold text-foreground">{faq.q}</span>
                  <span
                    className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-secondary text-navy transition-transform ${
                      isOpen ? 'rotate-45' : ''
                    }`}
                  >
                    <Plus className="h-4 w-4" />
                  </span>
                </button>
                <div
                  className={`grid transition-all duration-300 ${
                    isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="px-5 pb-5 text-sm leading-relaxed text-muted-foreground">
                      {faq.a}
                    </p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
