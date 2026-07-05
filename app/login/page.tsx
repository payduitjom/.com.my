'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, ArrowRight, LogIn, ShieldCheck } from 'lucide-react'
import { savePhone } from '@/lib/payment-session'

export default function LoginPage() {
  const router = useRouter()
  const [phone, setPhone] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const digits = phone.replace(/[^0-9]/g, '')
    if (!digits) return
    savePhone(`+60${digits.replace(/^0+/, '')}`)
    router.push('/borang')
  }

  return (
    <main className="relative flex min-h-screen flex-col overflow-hidden bg-navy">
      {/* subtle glows to match brand */}
      <div className="pointer-events-none absolute -left-20 top-10 h-72 w-72 rounded-full bg-navy-light/50 blur-3xl" />
      <div className="pointer-events-none absolute right-0 top-40 h-80 w-80 rounded-full bg-orange/10 blur-3xl" />

      <header className="relative z-10 mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-5 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center" aria-label="DuitJom - Laman Utama">
          <Image
            src="/duitjom-logo.png"
            alt="DuitJom"
            width={132}
            height={42}
            priority
            className="h-9 w-auto brightness-0 invert"
          />
        </Link>
        <Link
          href="/"
          className="flex items-center gap-2 text-sm font-semibold text-white/80 transition-colors hover:text-orange"
        >
          <ArrowLeft className="h-4 w-4" />
          Laman Utama
        </Link>
      </header>

      <div className="relative z-10 flex flex-1 items-center justify-center px-4 py-10 sm:px-6">
        <div className="w-full max-w-md rounded-3xl bg-card p-7 shadow-2xl shadow-black/30 ring-1 ring-black/5 sm:p-9">
          <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-navy text-orange">
            <LogIn className="h-6 w-6" />
          </span>

          <h1 className="mt-6 text-2xl font-extrabold text-foreground">
            Log Masuk
          </h1>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            Masukkan nombor telefon anda untuk meneruskan bayaran balik pinjaman.
          </p>

          <form onSubmit={handleSubmit} className="mt-7">
            <label
              htmlFor="phone"
              className="text-xs font-semibold tracking-wide text-muted-foreground"
            >
              NOMBOR TELEFON
            </label>
            <div className="mt-2 flex items-stretch overflow-hidden rounded-xl ring-1 ring-border focus-within:ring-2 focus-within:ring-orange">
              <span className="flex items-center bg-secondary px-3 text-sm font-semibold text-foreground">
                +60
              </span>
              <input
                id="phone"
                type="tel"
                inputMode="numeric"
                autoFocus
                value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/[^0-9]/g, ''))}
                placeholder="123456789"
                className="w-full px-3 py-3.5 text-sm text-foreground outline-none placeholder:text-muted-foreground"
              />
            </div>

            <button
              type="submit"
              disabled={!phone.trim()}
              className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-orange py-3.5 text-sm font-bold text-navy shadow-lg shadow-orange/20 transition-transform hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-50"
            >
              LOG MASUK
              <ArrowRight className="h-4 w-4" />
            </button>
          </form>

          <div className="mt-6 flex items-center justify-center gap-2 border-t border-border pt-5 text-xs text-muted-foreground">
            <ShieldCheck className="h-4 w-4 text-green" />
            Keselamatan gred bank &middot; SSL 256-bit
          </div>
        </div>
      </div>
    </main>
  )
}
