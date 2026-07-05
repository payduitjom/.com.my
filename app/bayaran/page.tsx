'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { QRCodeSVG } from 'qrcode.react'
import {
  ArrowLeft,
  Building2,
  CheckCircle2,
  Clock,
  Landmark,
  Loader2,
  Lock,
  QrCode,
  ShieldCheck,
  Upload,
  X,
} from 'lucide-react'
import {
  formatRM,
  getCustomer,
  makeTransactionId,
  type CustomerData,
} from '@/lib/payment-session'

type Stage = 'methods' | 'qr' | 'verifying'

export default function BayaranPage() {
  const router = useRouter()
  const [customer, setCustomer] = useState<CustomerData | null>(null)
  const [ready, setReady] = useState(false)
  const [showModal, setShowModal] = useState(true)
  const [stage, setStage] = useState<Stage>('methods')
  const txId = useMemo(() => makeTransactionId(), [])

  useEffect(() => {
    const data = getCustomer()
    if (!data || !data.nama) {
      router.replace('/login')
      return
    }
    setCustomer(data)
    setReady(true)
  }, [router])

  if (!ready || !customer) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-navy">
        <Loader2 className="h-10 w-10 animate-spin text-orange" />
      </main>
    )
  }

  if (stage === 'verifying') {
    return <VerifyingScreen />
  }

  return (
    <main className="relative min-h-screen bg-navy pb-16">
      <div className="pointer-events-none absolute -left-20 top-10 h-72 w-72 rounded-full bg-navy-light/50 blur-3xl" />
      <div className="pointer-events-none absolute right-0 top-40 h-80 w-80 rounded-full bg-orange/10 blur-3xl" />

      <header className="relative z-10 mx-auto flex w-full max-w-2xl items-center justify-between px-4 py-5 sm:px-6">
        <Image
          src="/duitjom-logo.png"
          alt="DuitJom"
          width={132}
          height={42}
          priority
          className="h-9 w-auto brightness-0 invert"
        />
        {stage === 'qr' ? (
          <button
            onClick={() => setStage('methods')}
            className="flex items-center gap-2 text-sm font-semibold text-white/80 transition-colors hover:text-orange"
          >
            <ArrowLeft className="h-4 w-4" />
            Kaedah Bayaran
          </button>
        ) : (
          <span className="flex items-center gap-2 text-xs font-semibold text-white/70">
            <Lock className="h-3.5 w-3.5 text-green" />
            Bayaran Selamat
          </span>
        )}
      </header>

      <div className="relative z-10 mx-auto w-full max-w-2xl px-4 sm:px-6">
        {stage === 'methods' && (
          <MethodSelect customer={customer} onSelectQr={() => setStage('qr')} />
        )}
        {stage === 'qr' && (
          <QrStage
            customer={customer}
            txId={txId}
            onPaid={() => setStage('verifying')}
          />
        )}
      </div>

      {showModal && (
        <WelcomeModal customer={customer} onClose={() => setShowModal(false)} />
      )}
    </main>
  )
}

/* ---------- Welcome modal: logo + customer data, 10s auto-close ---------- */

function WelcomeModal({
  customer,
  onClose,
}: {
  customer: CustomerData
  onClose: () => void
}) {
  const [count, setCount] = useState(10)

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((c) => {
        if (c <= 1) {
          clearInterval(interval)
          onClose()
          return 0
        }
        return c - 1
      })
    }, 1000)
    return () => clearInterval(interval)
  }, [onClose])

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-navy/70 p-4 backdrop-blur-sm">
      <div className="w-full max-w-sm rounded-3xl bg-card p-6 shadow-2xl ring-1 ring-black/5">
        <div className="flex items-center justify-between">
          <Image
            src="/duitjom-logo.png"
            alt="DuitJom"
            width={120}
            height={38}
            className="h-8 w-auto"
          />
          <button
            onClick={onClose}
            aria-label="Tutup"
            className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary text-muted-foreground transition-colors hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <h2 className="mt-5 text-lg font-extrabold text-foreground">
          Sahkan Butiran Bayaran
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Semak maklumat anda sebelum meneruskan.
        </p>

        <dl className="mt-5 space-y-3 rounded-2xl bg-secondary p-4">
          <Row label="Nama" value={customer.nama} />
          <Row label="ID Loan" value={customer.appId} />
          <Row label="Telefon" value={customer.phone} />
          <Row
            label="Jumlah"
            value={formatRM(customer.jumlah)}
            highlight
          />
        </dl>

        <button
          onClick={onClose}
          className="mt-5 w-full rounded-xl bg-orange py-3 text-sm font-bold text-navy transition-transform hover:scale-[1.01]"
        >
          Teruskan Bayaran
        </button>
        <p className="mt-3 text-center text-xs text-muted-foreground">
          Tetingkap ini akan tertutup dalam {count}s
        </p>
      </div>
    </div>
  )
}

function Row({
  label,
  value,
  highlight,
}: {
  label: string
  value: string
  highlight?: boolean
}) {
  return (
    <div className="flex items-center justify-between gap-4">
      <dt className="text-xs font-medium text-muted-foreground">{label}</dt>
      <dd
        className={`truncate text-sm font-semibold ${
          highlight ? 'text-green-dark' : 'text-foreground'
        }`}
      >
        {value || '-'}
      </dd>
    </div>
  )
}

/* ---------- Method selection ---------- */

function MethodSelect({
  customer,
  onSelectQr,
}: {
  customer: CustomerData
  onSelectQr: () => void
}) {
  return (
    <div className="rounded-3xl bg-card p-6 shadow-2xl shadow-black/30 ring-1 ring-black/5 sm:p-8">
      <div className="rounded-2xl bg-navy p-5 text-center text-white">
        <div className="text-xs font-semibold tracking-wide text-white/60">
          JUMLAH UNTUK DIBAYAR
        </div>
        <div className="mt-1 text-4xl font-extrabold text-orange">
          {formatRM(customer.jumlah)}
        </div>
        <div className="mt-1 text-xs text-white/60">
          {customer.nama} &middot; {customer.appId}
        </div>
      </div>

      <h2 className="mt-7 text-lg font-bold text-foreground">
        Pilih Kaedah Bayaran
      </h2>

      <div className="mt-4 space-y-3">
        {/* Enabled: DuitNow QRPay */}
        <button
          onClick={onSelectQr}
          className="flex w-full items-center gap-4 rounded-2xl border-2 border-green bg-green/5 p-4 text-left transition-colors hover:bg-green/10"
        >
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-green text-white">
            <QrCode className="h-6 w-6" />
          </span>
          <span className="flex-1">
            <span className="block font-bold text-foreground">
              DuitNow QRPay
            </span>
            <span className="block text-sm text-muted-foreground">
              Imbas &amp; bayar dengan mana-mana aplikasi bank
            </span>
          </span>
          <span className="rounded-full bg-green px-2.5 py-1 text-[10px] font-bold text-white">
            DISYORKAN
          </span>
        </button>

        {/* Disabled methods (blurred) */}
        <DisabledMethod
          icon={<Building2 className="h-6 w-6" />}
          title="Pemindahan Bank"
          desc="Tidak tersedia buat masa ini"
        />
        <DisabledMethod
          icon={<Landmark className="h-6 w-6" />}
          title="Perbankan Dalam Talian"
          desc="Tidak tersedia buat masa ini"
        />
      </div>

      <div className="mt-6 flex items-center justify-center gap-2 border-t border-border pt-5 text-xs text-muted-foreground">
        <ShieldCheck className="h-4 w-4 text-green" />
        Dikuasakan oleh DuitNow &middot; PayNet Malaysia
      </div>
    </div>
  )
}

function DisabledMethod({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode
  title: string
  desc: string
}) {
  return (
    <div
      aria-disabled="true"
      className="pointer-events-none flex w-full items-center gap-4 rounded-2xl border border-border bg-secondary p-4 text-left opacity-50 blur-[1.5px] select-none"
    >
      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-muted text-muted-foreground">
        {icon}
      </span>
      <span className="flex-1">
        <span className="block font-bold text-foreground">{title}</span>
        <span className="block text-sm text-muted-foreground">{desc}</span>
      </span>
      <Lock className="h-4 w-4 text-muted-foreground" />
    </div>
  )
}

/* ---------- QR stage: countdown + transaction id + receipt upload ---------- */

function QrStage({
  customer,
  txId,
  onPaid,
}: {
  customer: CustomerData
  txId: string
  onPaid: () => void
}) {
  const [seconds, setSeconds] = useState(600) // 10 minute window
  const [receipt, setReceipt] = useState<string | null>(null)
  const [fileName, setFileName] = useState('')
  const fileRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (seconds <= 0) return
    const t = setInterval(() => setSeconds((s) => (s > 0 ? s - 1 : 0)), 1000)
    return () => clearInterval(t)
  }, [seconds])

  const mm = String(Math.floor(seconds / 60)).padStart(2, '0')
  const ss = String(seconds % 60).padStart(2, '0')

  const qrPayload = `DUITNOW|DJPAY|${txId}|${customer.appId}|${customer.jumlah}`

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setFileName(file.name)
    const reader = new FileReader()
    reader.onload = () => setReceipt(reader.result as string)
    reader.readAsDataURL(file)
  }

  return (
    <div className="rounded-3xl bg-card p-6 shadow-2xl shadow-black/30 ring-1 ring-black/5 sm:p-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 rounded-full bg-secondary px-3 py-1.5 text-xs font-semibold text-foreground">
          <QrCode className="h-3.5 w-3.5 text-green" />
          DuitNow QRPay
        </div>
        <div
          className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold ${
            seconds > 0
              ? 'bg-orange/10 text-orange-dark'
              : 'bg-destructive/10 text-destructive'
          }`}
        >
          <Clock className="h-3.5 w-3.5" />
          {seconds > 0 ? `${mm}:${ss}` : 'Tamat Tempoh'}
        </div>
      </div>

      <div className="mt-6 flex flex-col items-center">
        <div className="rounded-3xl border border-border bg-background p-5 shadow-sm">
          <div className="mb-3 flex items-center justify-center gap-2">
            <Image
              src="/duitjom-logo.png"
              alt="DuitJom"
              width={100}
              height={32}
              className="h-6 w-auto"
            />
          </div>
          <div className="rounded-2xl bg-white p-3">
            <QRCodeSVG
              value={qrPayload}
              size={200}
              level="M"
              marginSize={2}
              className="h-auto w-full max-w-[200px]"
            />
          </div>
        </div>

        <div className="mt-4 text-center">
          <div className="text-3xl font-extrabold text-navy">
            {formatRM(customer.jumlah)}
          </div>
          <div className="mt-1 text-sm text-muted-foreground">
            Imbas kod QR menggunakan aplikasi perbankan anda
          </div>
        </div>
      </div>

      <dl className="mt-6 space-y-2.5 rounded-2xl bg-secondary p-4">
        <Row label="ID Transaksi" value={txId} />
        <Row label="Penerima" value="DuitJom Pay Sdn Bhd" />
        <Row label="Rujukan" value={customer.appId} />
      </dl>

      {/* Receipt upload */}
      <div className="mt-6">
        <p className="text-sm font-bold text-foreground">
          Muat Naik Resit Bayaran
        </p>
        <p className="mt-1 text-xs text-muted-foreground">
          Selepas membayar, muat naik resit anda untuk pengesahan.
        </p>

        <input
          ref={fileRef}
          type="file"
          accept="image/*,application/pdf"
          onChange={handleFile}
          className="hidden"
        />

        <button
          onClick={() => fileRef.current?.click()}
          className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl border-2 border-dashed border-border py-6 text-sm font-semibold text-muted-foreground transition-colors hover:border-orange hover:text-orange"
        >
          {receipt ? (
            <span className="flex items-center gap-2 text-green-dark">
              <CheckCircle2 className="h-5 w-5" />
              {fileName || 'Resit dimuat naik'}
            </span>
          ) : (
            <>
              <Upload className="h-5 w-5" />
              Pilih fail resit
            </>
          )}
        </button>
      </div>

      <button
        onClick={onPaid}
        disabled={!receipt}
        className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-green py-4 text-sm font-bold text-white shadow-lg shadow-green/25 transition-colors hover:bg-green-dark disabled:cursor-not-allowed disabled:opacity-50"
      >
        SAYA TELAH MEMBAYAR
      </button>
    </div>
  )
}

/* ---------- 8 second verification screen ---------- */

function VerifyingScreen() {
  const router = useRouter()

  useEffect(() => {
    const t = setTimeout(() => router.push('/berjaya'), 8000)
    return () => clearTimeout(t)
  }, [router])

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
          Mengesahkan Bayaran Anda
        </h1>
        <p className="mt-3 max-w-sm text-pretty leading-relaxed text-white/70">
          Kami sedang menyemak resit dan mengesahkan transaksi anda. Jangan tutup
          tetingkap ini.
        </p>
        <div className="mt-6 h-1.5 w-56 overflow-hidden rounded-full bg-white/10">
          <div className="h-full w-full origin-left animate-pulse rounded-full bg-orange" />
        </div>
      </div>
    </main>
  )
}
