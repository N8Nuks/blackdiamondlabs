import type { Metadata, Viewport } from 'next'
import { Analytics } from '@vercel/analytics/react'
import { Inter, Michroma } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const michroma = Michroma({ subsets: ['latin'], weight: '400', variable: '--font-michroma' })

export const metadata: Metadata = {
  manifest: '/manifest.json',
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/apple-touch-icon.png',
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'Coach Nate',
  },
  title: 'Black Diamond Labs — Technology for grassroots sport',
  description: 'Black Diamond Labs builds digital platforms for grassroots sport communities. Home of Grassroots Fantasy — Northern Fastpitch Series Edition.',
}

export const viewport: Viewport = {
  themeColor: '#050505',
  viewportFit: 'cover',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${michroma.variable}`}>{children}<Analytics /></body>
    </html>
  )
}