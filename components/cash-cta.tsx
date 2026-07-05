import Image from 'next/image'
import Link from 'next/link'
import {
  ArrowRight,
  Briefcase,
  GraduationCap,
  Home,
  HeartPulse,
  Lock,
  ShieldCheck,
  Star,
  TrendingUp,
  Users,
} from 'lucide-react'

const useCases = [
  { icon: HeartPulse, label: 'Kecemasan Perubatan' },
  { icon: Home, label: 'Pembaikan Rumah' },
  { icon: GraduationCap, label: 'Yuran Pendidikan' },
  { icon: Briefcase, label: 'Peluang Perniagaan' },
]

const stats = [
  { icon: Users, value: '50K+', label: 'Pelanggan Gembira' },
  { icon: TrendingUp, value: '95%', label: 'Kadar Kelulusan' },
  { icon: Star, value: '4.8', label: 'Penilaian Pelanggan' },
]

export function CashCta() {
  return (
    <section className="bg-navy py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <span className="inline-flex items-center gap-2 rounded-full bg-orange px-4 py-1.5 text-xs font-bold tracking-wide text-navy">
          <TrendingUp className="h-3.5 w-3.5" />
          PENYELESAIAN WANG TUNAI PANTAS
        </span>

        <div className="mt-8 grid items-center gap-10 lg:grid-cols-2">
          <div>
            <h2 className="text-balance text-3xl font-extrabold leading-tight text-white sm:text-4xl">
              Perlukan Wang <span className="text-orange">Hari Ini?</span>
              <br />
              Kami Ada untuk Anda!
            </h2>
            <p className="mt-5 max-w-xl text-pretty leading-relaxed text-white/70">
              Sama ada untuk kecemasan, perbelanjaan tidak dijangka, atau peluang
              yang baik - dapatkan wang tunai yang anda perlukan dalam akaun bank
              anda dalam beberapa minit.
            </p>

            <div className="mt-8 grid grid-cols-2 gap-3 sm:max-w-lg">
              {useCases.map((u) => (
                <div
                  key={u.label}
                  className="flex items-center gap-3 rounded-xl bg-white/5 px-4 py-3 ring-1 ring-white/10"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 text-orange">
                    <u.icon className="h-4 w-4" />
                  </span>
                  <span className="text-sm font-medium text-white">
                    {u.label}
                  </span>
                </div>
              ))}
            </div>

            <Link
              href="/login"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-orange px-7 py-3.5 text-sm font-bold text-navy shadow-lg shadow-orange/20 transition-transform hover:scale-[1.02]"
            >
              LOG MASUK UNTUK BAYAR
              <ArrowRight className="h-4 w-4" />
            </Link>

            <div className="mt-6 flex flex-wrap gap-5">
              <span className="flex items-center gap-2 text-sm text-white/80">
                <Lock className="h-4 w-4 text-green" />
                SSL 256-bit Selamat
              </span>
              <span className="flex items-center gap-2 text-sm text-white/80">
                <ShieldCheck className="h-4 w-4 text-green" />
                Berlesen oleh BNM
              </span>
            </div>
          </div>

          {/* Illustration with floating badges */}
          <div className="relative mx-auto w-full max-w-md">
            <div className="relative aspect-square">
              <Image
                src="/cash-stack.png"
                alt="Timbunan wang tunai ringgit Malaysia"
                fill
                className="object-contain drop-shadow-2xl"
              />
            </div>

            <div className="absolute left-2 top-6 rounded-2xl bg-white px-4 py-3 text-center shadow-xl">
              <div className="text-lg font-extrabold text-green">5 min</div>
              <div className="text-[10px] font-medium text-muted-foreground">
                HARI LOAN
              </div>
            </div>
            <div className="absolute bottom-16 left-0 rounded-2xl bg-white px-4 py-3 text-center shadow-xl">
              <div className="text-lg font-extrabold text-navy">RM 5K</div>
              <div className="text-[10px] font-medium text-muted-foreground">
                MAX LOAN
              </div>
            </div>
            <div className="absolute right-2 top-1/3 rounded-2xl bg-white px-4 py-3 text-center shadow-xl">
              <div className="text-lg font-extrabold text-orange">24/7</div>
              <div className="text-[10px] font-medium text-muted-foreground">
                AVAILABLE
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 grid gap-6 border-t border-white/10 pt-10 sm:grid-cols-3">
          {stats.map((s) => (
            <div key={s.label} className="flex items-center justify-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 text-orange">
                <s.icon className="h-5 w-5" />
              </span>
              <div>
                <div className="text-xl font-extrabold text-white">
                  {s.value}
                </div>
                <div className="text-[11px] font-medium tracking-wide text-white/50">
                  {s.label}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
