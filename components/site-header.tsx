'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronDown, LogIn, Menu, X } from 'lucide-react'

const navLinks = [
  { label: 'Bayar Balik', href: '#mohon' },
  { label: 'Cara Berfungsi', href: '#cara' },
  { label: 'Kaedah Bayaran', href: '#pakej' },
  { label: 'Soalan Lazim', href: '#soalan' },
]

export function SiteHeader() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-shadow ${
        scrolled
          ? 'border-border bg-background/95 shadow-sm backdrop-blur'
          : 'border-transparent bg-background/90 backdrop-blur'
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <a href="#" className="flex items-center" aria-label="DuitJom - Laman Utama">
          <Image
            src="/duitjom-logo.png"
            alt="DuitJom"
            width={132}
            height={42}
            priority
            className="h-9 w-auto"
          />
        </a>

        <div className="hidden items-center gap-7 lg:flex">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm font-semibold text-foreground/80 transition-colors hover:text-orange"
            >
              {link.label}
            </a>
          ))}
          <button
            type="button"
            className="flex items-center gap-1 text-sm font-medium text-foreground/70 transition-colors hover:text-orange"
          >
            Bahasa Malaysia
            <ChevronDown className="h-4 w-4" />
          </button>
          <Link
            href="/login"
            className="rounded-full bg-orange px-5 py-2 text-sm font-bold text-navy shadow-sm transition-transform hover:scale-[1.03]"
          >
            <span className="flex items-center gap-2">
              <LogIn className="h-4 w-4" />
              Log Masuk
            </span>
          </Link>
        </div>

        <button
          type="button"
          className="text-navy lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Togol menu"
          aria-expanded={open}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {open && (
        <div className="mx-4 mb-3 rounded-2xl border border-border bg-card p-4 shadow-lg lg:hidden">
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="rounded-lg px-3 py-2 text-sm font-semibold text-foreground/80 hover:bg-secondary hover:text-orange"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <Link
              href="/login"
              onClick={() => setOpen(false)}
              className="mt-1 flex items-center justify-center gap-2 rounded-full bg-orange px-5 py-2.5 text-sm font-bold text-navy"
            >
              <LogIn className="h-4 w-4" />
              Log Masuk
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
