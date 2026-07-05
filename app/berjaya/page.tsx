'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { CheckCircle2, Home, Loader2 } from 'lucide-react'
import {
  clearCustomer,
  formatRM,
  getCustomer,
  type CustomerData,
} from '@/lib/payment-session'

export default function BerjayaPage() {
  const router = useRouter()
  const [customer, setCustomer] = useState<CustomerData | null>(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const data = getCustomer()
    if (!data || !data.nama) {
      router.replace('/login')
      return
    }
    setCustomer(data)
    setReady(true)
  }, [router])

  const handleReturn = () => {
    clearCustomer()
    router.push('/login')
  }

  if (!ready || !customer) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-navy">
        <Loader2 className="h-10 w-10 animate-spin text-orange" />
      </main>
    )
  }

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-navy px-4 py-10">
      <div className="pointer-events-none absolute -left-20 top-10 h-72 w-72 rounded-full bg-navy-light/50 blur-3xl" />
      <div className="pointer-events-none absolute right-0 top-40 h-80 w-80 rounded-full bg-green/10 blur-3xl" />

      <div className="relative z-10 w-full max-w-md rounded-3xl bg-card p-7 text-center shadow-2xl shadow-black/30 ring-1 ring-black/5 sm:p-9">
        <Image
          src="/duitjom-logo.png"
          alt="DuitJom"
          width={130}
          height={42}
          priority
          className="mx-auto h-9 w-auto"
        />

        <div className="mx-auto mt-8 flex h-20 w-20 items-center justify-center rounded-full bg-green/10">
          <CheckCircle2 className="h-11 w-11 text-green" />
        </div>

        <h1 className="mt-6 text-2xl font-extrabold text-foreground">
          Bayaran Berjaya!
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          Terima kasih. Bayaran balik pinjaman anda telah diterima dan disahkan.
        </p>

        <dl className="mt-7 space-y-3 rounded-2xl bg-secondary p-5 text-left">
          <div className="flex items-center justify-between gap-4">
            <dt className="text-xs font-medium text-muted-foreground">Nama</dt>
            <dd className="truncate text-sm font-semibold text-foreground">
              {customer.nama}
            </dd>
          </div>
          <div className="flex items-center justify-between gap-4 border-t border-border pt-3">
            <dt className="text-xs font-medium text-muted-foreground">
              Jumlah Dibayar
            </dt>
            <dd className="text-lg font-extrabold text-green-dark">
              {formatRM(customer.jumlah)}
            </dd>
          </div>
        </dl>

        <button
          onClick={handleReturn}
          className="mt-7 flex w-full items-center justify-center gap-2 rounded-xl bg-orange py-3.5 text-sm font-bold text-navy shadow-lg shadow-orange/20 transition-transform hover:scale-[1.01]"
        >
          <Home className="h-4 w-4" />
          Kembali ke Log Masuk
        </button>
      </div>
    </main>
  )
}
