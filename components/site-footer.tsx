import Image from 'next/image'
import {
  Clock,
  Lock,
  Mail,
  MapPin,
  MessageCircle,
  Send,
  ShieldCheck,
  Share2,
  Users,
  Wallet,
} from 'lucide-react'

const quickLinks = [
  { label: 'Mohon Sekarang', href: '#mohon' },
  { label: 'Pakej Kami', href: '#pakej' },
  { label: 'Kalkulator Pinjaman', href: '#kalkulator' },
  { label: 'Soalan Lazim', href: '#soalan' },
]
const legalLinks = ['Terma & Syarat', 'Dasar Privasi']

const trustBadges = [
  { icon: ShieldCheck, title: 'Keselamatan Gred Bank', sub: 'Penyulitan SSL 256-bit' },
  { icon: Wallet, title: 'Pemberi Pinjam Berlesen', sub: 'Diluluskan oleh Bank Negara' },
  { icon: Clock, title: 'Sokongan 24/7', sub: 'Sentiasa ada untuk membantu' },
  { icon: Users, title: '50,000+ Pelanggan', sub: 'Dipercayai Rakyat Malaysia' },
]

const currentYear = 2025

export function SiteFooter() {
  return (
    <footer className="bg-navy text-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.5fr_1fr_1fr_1.3fr]">
          <div>
            <div>
              <Image
                src="/duitjom-logo.png"
                alt="DuitJom"
                width={150}
                height={48}
                className="h-10 w-auto brightness-0 invert"
              />
              <p className="mt-2 text-[11px] text-white/50">
                Rakan Kewangan Anda Yang Dipercayai
              </p>
            </div>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/60">
              Platform pinjaman dalam talian terkemuka Malaysia yang menyediakan
              penyelesaian kewangan yang pantas, selamat, dan telus. Dapatkan
              kelulusan dalam sistem bertenaga AI kami.
            </p>

            <div className="mt-6 space-y-2 text-sm text-white/70">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-green" />
                Berlesen oleh Bank Negara Malaysia
              </div>
              <div className="flex items-center gap-2">
                <Lock className="h-4 w-4 text-green" />
                Penyulitan SSL 256-bit
              </div>
            </div>

            <div className="mt-6">
              <p className="text-sm font-semibold">Ikuti Kami:</p>
              <div className="mt-3 flex gap-3">
                {[Share2, MessageCircle, Send].map((Icon, i) => (
                  <a
                    key={i}
                    href="#"
                    className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 text-white/80 transition-colors hover:bg-orange hover:text-navy"
                    aria-label="Social media"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-bold">Pautan Pantas</h4>
            <ul className="mt-4 space-y-3 text-sm text-white/60">
              {quickLinks.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    className="transition-colors hover:text-orange"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold">Undang-undang</h4>
            <ul className="mt-4 space-y-3 text-sm text-white/60">
              {legalLinks.map((l) => (
                <li key={l}>
                  <a href="#" className="transition-colors hover:text-orange">
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold">Hubungan & Sokongan</h4>
            <ul className="mt-4 space-y-4 text-sm text-white/60">
              <li className="flex items-start gap-3">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-orange" />
                <div>
                  <div className="text-white/80">E-mel</div>
                  support@duitjom.my
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-orange" />
                <div>
                  <div className="text-white/80">Sokongan</div>
                  Tersedia 24/7
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-orange" />
                <div>
                  <div className="text-white/80">Alamat</div>
                  Kuala Lumpur, Malaysia
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Trust badges */}
        <div className="mt-14 grid gap-4 rounded-2xl bg-white/5 p-6 ring-1 ring-white/10 sm:grid-cols-2 lg:grid-cols-4">
          {trustBadges.map((b) => (
            <div key={b.title} className="flex items-center gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10 text-orange">
                <b.icon className="h-5 w-5" />
              </span>
              <div>
                <div className="text-sm font-semibold text-white">{b.title}</div>
                <div className="text-xs text-white/50">{b.sub}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-6 text-xs text-white/50 sm:flex-row sm:px-6 lg:px-8">
          <p>© {currentYear} DuitJom. Hak cipta terpelihara.</p>
          <p className="text-center sm:text-right">
            DuitJom adalah tanda dagangan berdaftar. Berlesen oleh Bank Negara
            Malaysia di bawah Akta Peminjam Wang 2011.
          </p>
        </div>
      </div>
    </footer>
  )
}
