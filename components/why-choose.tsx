import {
  ArrowRight,
  Clock,
  Eye,
  Lock,
  Users,
  Zap,
} from 'lucide-react'

const features = [
  {
    icon: Zap,
    title: 'Pantas Kilat',
    desc: (
      <>
        Dapatkan kelulusan dalam masa <strong>5 minutes</strong> sahaja dengan
        sistem penilaian bertenaga AI kami. Tiada lagi menunggu berhari-hari
        untuk kelulusan pinjaman.
      </>
    ),
    stats: [
      { value: '5min', label: 'MASA KELULUSAN' },
      { value: '24/7', label: 'TERSEDIA' },
    ],
  },
  {
    icon: Users,
    title: 'Permohonan Mudah',
    desc: (
      <>
        Hanya <strong>MyKad and phone number</strong> anda - itu sahaja yang
        anda perlukan. Proses yang diperkemas kami menghapuskan kertas kerja
        yang tidak perlu.
      </>
    ),
    tags: ['Hanya MyKad diperlukan', 'Tiada dokumen pendapatan'],
  },
  {
    icon: Lock,
    title: 'Keselamatan Gred Bank',
    desc: (
      <>
        Data anda dilindungi dengan <strong>256-bit SSL encryption</strong> dan
        protokol keselamatan canggih yang dipercayai oleh institusi kewangan
        utama.
      </>
    ),
    tags: ['SSL Selamat', 'Data Dilindungi'],
  },
  {
    icon: Eye,
    title: 'Ketelusan Penuh',
    desc: (
      <>
        Tiada yuran tersembunyi atau caj mengejut. Anda akan tahu dengan tepat
        apa yang perlu anda bayar sebelum memohon dengan{' '}
        <strong>clear fee structure</strong> kami.
      </>
    ),
    stats: [
      { value: '18% p.a.', label: 'Kadar Tetap' },
      { value: 'RM 0', label: 'Yuran Pemprosesan' },
    ],
  },
  {
    icon: Users,
    title: 'Untuk Semua Orang',
    desc: (
      <>
        Kriteria kelayakan yang fleksibel bermakna lebih ramai orang boleh
        mengakses dana yang mereka perlukan, walaupun dengan{' '}
        <strong>less-than-perfect credit</strong>.
      </>
    ),
    tags: ['Umur 20-60', 'Sedang Bekerja'],
  },
  {
    icon: Clock,
    title: 'Tersedia 24/7',
    desc: (
      <>
        Mohon bila-bila masa, di mana-mana sahaja. Platform kami tidak pernah
        tidur, jadi anda boleh mendapat bantuan kewangan yang anda perlukan{' '}
        <strong>when you need it most</strong>.
      </>
    ),
    tags: ['Dioptimumkan Mudah Alih', 'Mesra Desktop'],
  },
]

const bannerStats = [
  { value: '50K+', label: 'PELANGGAN GEMBIRA' },
  { value: '99.9%', label: 'MASA AKTIF' },
  { value: '5', label: 'PENILAIAN', star: true },
]

export function WhyChoose() {
  return (
    <section id="pakej" className="bg-secondary py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-block rounded-full bg-navy px-4 py-1.5 text-xs font-semibold tracking-wide text-white">
            MENGAPA PILIH DUITJOM?
          </span>
          <h2 className="mt-5 text-balance text-3xl font-extrabold text-foreground sm:text-4xl">
            Alami Masa Depan Pinjaman Dalam Talian
          </h2>
          <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
            Sertai ribuan pelanggan yang berpuas hati yang mempercayai DuitJom
            untuk keperluan kewangan mereka. Teknologi terkini dan pendekatan
            mengutamakan pelanggan kami menjadikan peminjaman mudah, selamat, dan
            pantas.
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <div
              key={f.title}
              className="rounded-3xl border border-border bg-card p-7 shadow-sm transition-shadow hover:shadow-lg"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-navy text-orange">
                <f.icon className="h-5 w-5" />
              </span>
              <h3 className="mt-5 text-lg font-bold text-foreground">
                {f.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground [&_strong]:font-semibold [&_strong]:text-foreground">
                {f.desc}
              </p>

              {f.stats && (
                <div className="mt-5 grid grid-cols-2 gap-3">
                  {f.stats.map((s) => (
                    <div
                      key={s.label}
                      className="rounded-xl bg-secondary p-3 text-center"
                    >
                      <div className="text-xl font-extrabold text-navy">
                        {s.value}
                      </div>
                      <div className="mt-1 text-[10px] font-medium tracking-wide text-muted-foreground">
                        {s.label}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {f.tags && (
                <div className="mt-5 flex flex-wrap gap-2">
                  {f.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-foreground"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* CTA banner */}
        <div className="mt-12 overflow-hidden rounded-3xl bg-navy p-8 text-center sm:p-12">
          <h3 className="text-balance text-2xl font-extrabold text-white sm:text-3xl">
            Bersedia untuk Mengalami Perbezaan DuitJom?
          </h3>
          <p className="mx-auto mt-3 max-w-2xl text-pretty leading-relaxed text-white/70">
            Sertai ribuan pelanggan yang berpuas hati yang memilih cara yang
            lebih bijak untuk meminjam
          </p>
          <a
            href="#mohon"
            className="mt-7 inline-flex items-center gap-2 rounded-full bg-orange px-7 py-3.5 text-sm font-bold text-navy shadow-lg shadow-orange/20 transition-transform hover:scale-[1.02]"
          >
            Mohon Sekarang - Mulakan dalam 2 Minit
            <ArrowRight className="h-4 w-4" />
          </a>

          <div className="mx-auto mt-10 grid max-w-2xl grid-cols-3 gap-6 border-t border-white/10 pt-8">
            {bannerStats.map((s) => (
              <div key={s.label}>
                <div className="flex items-center justify-center gap-1 text-2xl font-extrabold text-orange sm:text-3xl">
                  {s.value}
                  {s.star && <span className="text-xl">★</span>}
                </div>
                <div className="mt-1 text-[11px] font-medium tracking-wide text-white/50">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
