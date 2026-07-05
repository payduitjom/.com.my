import {
  Banknote,
  Clock,
  FileText,
  Mail,
  ScanLine,
  ShieldCheck,
  Smartphone,
  Zap,
} from 'lucide-react'

const steps = [
  {
    num: '01',
    tag: 'LANGKAH 1',
    icon: Smartphone,
    color: 'bg-navy text-orange',
    tint: 'bg-navy/5',
    title: 'Mohon Dalam Talian Dalam Minit',
    desc: 'Isi borang permohonan mudah kami dengan maklumat asas anda. Tiada kertas kerja yang rumit diperlukan.',
    points: [
      'Aplikasi mesra mudah alih',
      'Penyulitan data selamat',
      'Hanya mengambil masa 5 minit',
    ],
  },
  {
    num: '02',
    tag: 'LANGKAH 2',
    icon: ScanLine,
    color: 'bg-orange text-navy',
    tint: 'bg-orange/10',
    title: 'Semakan Bertenaga AI Segera',
    desc: 'Sistem AI canggih kami menganalisis permohonan anda dengan serta-merta dan memberikan keputusan kelulusan segera.',
    stats: [
      { value: '5 min', label: 'MASA SEMAKAN PURATA' },
      { value: '95%', label: 'KADAR KELULUSAN' },
    ],
  },
  {
    num: '03',
    tag: 'LANGKAH 3',
    icon: Banknote,
    color: 'bg-green text-white',
    tint: 'bg-green/10',
    title: 'Terima Dana Segera',
    desc: 'Sebaik sahaja diluluskan, jumlah pinjaman anda dipindahkan terus ke akaun bank anda dalam beberapa minit.',
    points: [
      'Pemindahan hari yang sama',
      'Terus ke akaun bank',
      'Pengesahan SMS & e-mel',
    ],
  },
]

const badges = [
  {
    icon: Zap,
    title: 'Pantas Kilat',
    desc: 'Proses lengkap dalam masa kurang dari 10 minit',
  },
  {
    icon: ShieldCheck,
    title: '100% Selamat',
    desc: 'Keselamatan gred bank untuk semua transaksi',
  },
  {
    icon: Clock,
    title: 'Sokongan 24/7',
    desc: 'Bantuan tersedia bila-bila masa anda memerlukannya',
  },
]

export function HowItWorks() {
  return (
    <section id="cara" className="bg-background py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-block rounded-full bg-navy px-4 py-1.5 text-xs font-semibold tracking-wide text-white">
            PROSES MUDAH
          </span>
          <h2 className="mt-5 text-balance text-3xl font-extrabold text-foreground sm:text-4xl">
            Cara Memohon Pinjaman Anda
          </h2>
          <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
            Dapatkan pinjaman anda diluluskan dalam 3 langkah mudah sahaja.
            Proses yang diperkemas kami memastikan anda mendapat dana yang
            diperlukan dengan cepat dan cekap.
          </p>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {steps.map((step) => (
            <div
              key={step.num}
              className="relative rounded-3xl border border-border bg-card p-7 shadow-sm transition-shadow hover:shadow-lg"
            >
              <div className="flex items-center justify-between">
                <span
                  className={`flex h-14 w-14 items-center justify-center rounded-2xl ${step.tint}`}
                >
                  <span
                    className={`flex h-10 w-10 items-center justify-center rounded-xl ${step.color}`}
                  >
                    <step.icon className="h-5 w-5" />
                  </span>
                </span>
                <span className="text-4xl font-extrabold text-border">
                  {step.num}
                </span>
              </div>

              <span className="mt-6 inline-block rounded-full bg-secondary px-3 py-1 text-[11px] font-semibold tracking-wide text-muted-foreground">
                {step.tag}
              </span>
              <h3 className="mt-3 text-xl font-bold text-foreground">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {step.desc}
              </p>

              {step.points && (
                <ul className="mt-5 space-y-2.5">
                  {step.points.map((p) => (
                    <li
                      key={p}
                      className="flex items-center gap-2 text-sm text-foreground"
                    >
                      <FileText className="h-4 w-4 shrink-0 text-green" />
                      {p}
                    </li>
                  ))}
                </ul>
              )}

              {step.stats && (
                <div className="mt-5 grid grid-cols-2 gap-3">
                  {step.stats.map((s) => (
                    <div
                      key={s.label}
                      className="rounded-xl bg-secondary p-3 text-center"
                    >
                      <div className="text-2xl font-extrabold text-navy">
                        {s.value}
                      </div>
                      <div className="mt-1 text-[10px] font-medium tracking-wide text-muted-foreground">
                        {s.label}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-8 grid gap-6 rounded-3xl border border-border bg-card p-8 shadow-sm sm:grid-cols-3">
          {badges.map((b) => (
            <div key={b.title} className="flex items-start gap-4">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-secondary text-navy">
                <b.icon className="h-5 w-5" />
              </span>
              <div>
                <h4 className="font-bold text-foreground">{b.title}</h4>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                  {b.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
