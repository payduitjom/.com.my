'use client'

import { useState } from 'react'
import {
  ArrowRight,
  CheckCircle2,
  PlayCircle,
  ShieldCheck,
  Star,
  Users,
  Zap,
} from 'lucide-react'

const presets = [
  { label: '300', value: 300 },
  { label: '500', value: 500 },
  { label: '1K', value: 1000 },
  { label: '2K', value: 2000 },
  { label: '3K', value: 3000 },
  { label: '5K', value: 5000 },
]

const heroStats = [
  { icon: Zap, value: '5 min', label: 'KELULUSAN' },
  { icon: Users, value: '50K+', label: 'PELANGGAN' },
  { icon: Star, value: '4.8', label: 'PENILAIAN' },
]

export function Hero() {
  const [amount, setAmount] = useState(1000)

  return (
    <section
      id="mohon"
      className="relative overflow-hidden bg-navy pt-28 pb-20 sm:pt-32 lg:pb-28"
    >
      {/* subtle radial glows */}
      <div className="pointer-events-none absolute -left-20 top-10 h-72 w-72 rounded-full bg-navy-light/50 blur-3xl" />
      <div className="pointer-events-none absolute right-0 top-40 h-80 w-80 rounded-full bg-orange/10 blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
        {/* Left copy */}
        <div>
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white/90 ring-1 ring-white/15">
            <ShieldCheck className="h-3.5 w-3.5 text-green" />
            Berlesen oleh Bank Negara Malaysia
          </span>

          <div className="mt-6 flex items-center gap-3 text-sm font-semibold text-orange">
            <span>Pantas</span>
            <span className="text-white/30">•</span>
            <span>Selamat</span>
            <span className="text-white/30">•</span>
            <span>Telus</span>
          </div>

          <h1 className="mt-3 text-balance text-4xl font-extrabold leading-tight text-white sm:text-5xl">
            Dapatkan Sehingga <span className="text-orange">RM 5,000</span> Hari
            Yang Sama Pinjaman ke{' '}
            <span className="text-green">Akaun Bank Anda</span>
          </h1>

          <p className="mt-6 max-w-xl text-pretty leading-relaxed text-white/70">
            Kelulusan pantas dalam masa 5 minit sahaja. Tiada yuran tersembunyi,
            tiada kertas kerja yang rumit. Dapatkan wang tunai yang anda perlukan
            hari ini dengan pemberi pinjaman dalam talian yang paling dipercayai
            di Malaysia.
          </p>

          <div className="mt-8 flex flex-wrap gap-8">
            {heroStats.map((stat) => (
              <div key={stat.label} className="flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 text-orange ring-1 ring-white/10">
                  <stat.icon className="h-5 w-5" />
                </span>
                <div>
                  <div className="text-lg font-bold text-white">
                    {stat.value}
                    {stat.label === 'PENILAIAN' && (
                      <Star className="ml-1 inline h-4 w-4 fill-orange text-orange" />
                    )}
                  </div>
                  <div className="text-[11px] font-medium tracking-wide text-white/50">
                    {stat.label}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href="#kalkulator"
              className="inline-flex items-center gap-2 rounded-full bg-orange px-7 py-3.5 text-sm font-bold text-navy shadow-lg shadow-orange/20 transition-transform hover:scale-[1.02]"
            >
              MOHON SEKARANG
              <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="#cara"
              className="inline-flex items-center gap-2 text-sm font-semibold text-white/90 transition-colors hover:text-orange"
            >
              <PlayCircle className="h-5 w-5" />
              Cara ia berfungsi
            </a>
          </div>
        </div>

        {/* Right: loan calculator */}
        <LoanCalculator
          amount={amount}
          setAmount={setAmount}
          presets={presets}
        />
      </div>
    </section>
  )
}

function LoanCalculator({
  amount,
  setAmount,
  presets,
}: {
  amount: number
  setAmount: (v: number) => void
  presets: { label: string; value: number }[]
}) {
  const format = (n: number) => `RM ${n.toLocaleString('en-US')}`

  return (
    <div
      id="kalkulator"
      className="rounded-3xl bg-card p-6 shadow-2xl shadow-black/30 ring-1 ring-black/5 sm:p-8"
    >
      <div className="flex items-center gap-3">
        <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-navy text-orange">
          <Zap className="h-5 w-5" />
        </span>
        <div>
          <h3 className="text-lg font-bold text-foreground">
            Kalkulator Pinjaman
          </h3>
          <p className="text-sm text-muted-foreground">
            Dapatkan pengiraan segera
          </p>
        </div>
      </div>

      <div className="mt-6 rounded-2xl bg-secondary p-5 text-center">
        <div className="text-xs font-semibold tracking-wide text-muted-foreground">
          JUMLAH PINJAMAN
        </div>
        <div className="mt-1 text-4xl font-extrabold text-navy">
          {format(amount)}
        </div>
        <div className="mt-1 text-xs text-muted-foreground">
          RM 300 - RM 5,000
        </div>
      </div>

      <div className="mt-6">
        <input
          type="range"
          min={300}
          max={5000}
          step={100}
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          aria-label="Loan amount slider"
          className="h-2 w-full cursor-pointer appearance-none rounded-full bg-secondary accent-orange"
          style={{
            background: `linear-gradient(to right, var(--orange) 0%, var(--orange) ${
              ((amount - 300) / (5000 - 300)) * 100
            }%, var(--secondary) ${
              ((amount - 300) / (5000 - 300)) * 100
            }%, var(--secondary) 100%)`,
          }}
        />
      </div>

      <div className="mt-5 grid grid-cols-6 gap-2">
        {presets.map((p) => (
          <button
            key={p.value}
            onClick={() => setAmount(p.value)}
            className={`rounded-lg py-2 text-xs font-semibold transition-colors ${
              amount === p.value
                ? 'bg-navy text-white'
                : 'bg-secondary text-muted-foreground hover:bg-border'
            }`}
          >
            {p.label}
          </button>
        ))}
      </div>

      <div className="mt-6">
        <label className="text-xs font-semibold tracking-wide text-muted-foreground">
          Mulakan Permohonan Anda
        </label>
        <div className="mt-2 flex items-stretch overflow-hidden rounded-xl ring-1 ring-border focus-within:ring-2 focus-within:ring-orange">
          <span className="flex items-center bg-secondary px-3 text-sm font-semibold text-foreground">
            +60
          </span>
          <input
            type="tel"
            placeholder="123456789"
            className="w-full px-3 py-3 text-sm text-foreground outline-none placeholder:text-muted-foreground"
          />
        </div>
      </div>

      <button className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-green py-3.5 text-sm font-bold text-white shadow-lg shadow-green/25 transition-colors hover:bg-green-dark">
        MOHON SEKARANG
        <ArrowRight className="h-4 w-4" />
      </button>

      <p className="mt-3 text-center text-xs text-muted-foreground">
        Data anda dilindungi dengan keselamatan gred bank
      </p>

      <div className="mt-4 grid gap-2 border-t border-border pt-4 text-xs sm:grid-cols-3">
        {['Tiada yuran tersembunyi', 'Kelulusan 5 minit', 'Pemindahan hari yang sama'].map(
          (item) => (
            <div key={item} className="flex items-center gap-1.5 text-foreground">
              <CheckCircle2 className="h-4 w-4 shrink-0 text-green" />
              {item}
            </div>
          ),
        )}
      </div>
    </div>
  )
}
