'use client'

export type CustomerData = {
  nama: string
  pengenalan: string
  appId: string
  phone: string
  email: string
  jumlah: string
}

const KEY = 'duitjompay:customer'

export function saveCustomer(data: CustomerData) {
  if (typeof window === 'undefined') return
  sessionStorage.setItem(KEY, JSON.stringify(data))
}

export function savePhone(phone: string) {
  if (typeof window === 'undefined') return
  const existing = getCustomer()
  saveCustomer({ ...(existing ?? emptyCustomer()), phone })
}

export function getCustomer(): CustomerData | null {
  if (typeof window === 'undefined') return null
  const raw = sessionStorage.getItem(KEY)
  if (!raw) return null
  try {
    return JSON.parse(raw) as CustomerData
  } catch {
    return null
  }
}

export function clearCustomer() {
  if (typeof window === 'undefined') return
  sessionStorage.removeItem(KEY)
}

export function emptyCustomer(): CustomerData {
  return {
    nama: '',
    pengenalan: '',
    appId: '',
    phone: '',
    email: '',
    jumlah: '',
  }
}

export function formatRM(value: string | number) {
  const num =
    typeof value === 'number' ? value : Number(String(value).replace(/[^0-9.]/g, ''))
  if (!Number.isFinite(num)) return 'RM 0.00'
  return `RM ${num.toLocaleString('en-MY', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`
}

export function makeTransactionId() {
  const rand = Math.floor(1000 + Math.random() * 9000)
  return `DJP-2026-${rand}`
}
