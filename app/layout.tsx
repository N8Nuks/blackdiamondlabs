import type { Metadata } from 'next'
import { Inter, Michroma } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const michroma = Michroma({ subsets: ['latin'], weight: '400', variable: '--font-michroma' })

export const metadata: Metadata = {
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
  title: 'Black Diamond Labs — Technology for grassroots sport',
  description: 'Black Diamond Labs builds digital platforms for grassroots sport communities. Home of Grassroots Fantasy — Northern Fastpitch Series Edition.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${michroma.variable}`}>{children}</body>
    </html>
  )
}
