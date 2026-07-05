'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import {
  ArrowRight,
  CheckCircle2,
  LogIn,
  PlayCircle,
  ShieldCheck,
  Star,
  Users,
  Wallet,
  Zap,
} from 'lucide-react'
import { savePhone } from '@/lib/payment-session'

const heroStats = [
  { icon: Zap, value: '1 min', label: 'BAYARAN' },
  { icon: Users, value: '50K+', label: 'PELANGGAN' },
  { icon: Star, value: '4.8', label: 'PENILAIAN' },
]

export function Hero() {
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
            Bayar Balik <span className="text-orange">Pinjaman Anda</span> Dengan{' '}
            <span className="text-green">Mudah &amp; Selamat</span>
          </h1>

          <p className="mt-6 max-w-xl text-pretty leading-relaxed text-white/70">
            Log masuk, isikan butiran anda, dan selesaikan bayaran balik pinjaman
            anda dalam beberapa minit menggunakan DuitNow QRPay. Tiada yuran
            tersembunyi, pengesahan segera, resit automatik.
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
            <Link
              href="/login"
              className="inline-flex items-center gap-2 rounded-full bg-orange px-7 py-3.5 text-sm font-bold text-navy shadow-lg shadow-orange/20 transition-transform hover:scale-[1.02]"
            >
              LOG MASUK UNTUK BAYAR
              <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href="#cara"
              className="inline-flex items-center gap-2 text-sm font-semibold text-white/90 transition-colors hover:text-orange"
            >
              <PlayCircle className="h-5 w-5" />
              Cara ia berfungsi
            </a>
          </div>
        </div>

        {/* Right: quick login card */}
        <LoginCard />
      </div>
    </section>
  )
}

function LoginCard() {
  const router = useRouter()
  const [phone, setPhone] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!phone.trim()) return
    savePhone(`+60${phone.replace(/^0+/, '')}`)
    router.push('/borang')
  }

  return (
    <div
      id="kalkulator"
      className="rounded-3xl bg-card p-6 shadow-2xl shadow-black/30 ring-1 ring-black/5 sm:p-8"
    >
      <div className="flex items-center gap-3">
        <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-navy text-orange">
          <Wallet className="h-5 w-5" />
        </span>
        <div>
          <h3 className="text-lg font-bold text-foreground">
            Log Masuk Pelanggan
          </h3>
          <p className="text-sm text-muted-foreground">
            Masukkan nombor telefon anda
          </p>
        </div>
      </div>

      <div className="mt-6 rounded-2xl bg-secondary p-5 text-center">
        <div className="text-xs font-semibold tracking-wide text-muted-foreground">
          PORTAL BAYARAN BALIK
        </div>
        <div className="mt-1 text-2xl font-extrabold text-navy">DuitJom Pay</div>
        <div className="mt-1 text-xs text-muted-foreground">
          Selesaikan bayaran pinjaman anda
        </div>
      </div>

      <form onSubmit={handleSubmit} className="mt-6">
        <label
          htmlFor="hero-phone"
          className="text-xs font-semibold tracking-wide text-muted-foreground"
        >
          Nombor Telefon
        </label>
        <div className="mt-2 flex items-stretch overflow-hidden rounded-xl ring-1 ring-border focus-within:ring-2 focus-within:ring-orange">
          <span className="flex items-center bg-secondary px-3 text-sm font-semibold text-foreground">
            +60
          </span>
          <input
            id="hero-phone"
            type="tel"
            inputMode="numeric"
            value={phone}
            onChange={(e) => setPhone(e.target.value.replace(/[^0-9]/g, ''))}
            placeholder="123456789"
            className="w-full px-3 py-3 text-sm text-foreground outline-none placeholder:text-muted-foreground"
          />
        </div>

        <button
          type="submit"
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-green py-3.5 text-sm font-bold text-white shadow-lg shadow-green/25 transition-colors hover:bg-green-dark"
        >
          <LogIn className="h-4 w-4" />
          LOG MASUK
        </button>
      </form>

      <p className="mt-3 text-center text-xs text-muted-foreground">
        Data anda dilindungi dengan keselamatan gred bank
      </p>

      <div className="mt-4 grid gap-2 border-t border-border pt-4 text-xs sm:grid-cols-3">
        {['Tiada yuran tersembunyi', 'Pengesahan segera', 'DuitNow QRPay'].map(
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
