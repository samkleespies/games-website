import type { Metadata } from 'next'
import { Orbitron, Rajdhani, JetBrains_Mono } from 'next/font/google'
import './globals.css'

const orbitron = Orbitron({
  subsets: ['latin'],
  variable: '--font-display',
})

const rajdhani = Rajdhani({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-body',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
})

export const metadata: Metadata = {
  title: 'GameDev Portfolio',
  description: 'Explore a collection of my games. Play them directly in-browser.',
  keywords: ['game development', 'Godot 4', 'indie games', 'web games', 'interactive portfolio', 'browser games'],
  authors: [{ name: 'Game Developer' }],
  creator: 'Game Developer',
  publisher: 'Game Developer',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://your-domain.com'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://your-domain.com',
    title: 'GameDev Portfolio',
    description: 'Explore a collection of my games. Play them directly in-browser.',
    siteName: 'GameDev Portfolio',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'GameDev Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GameDev Portfolio',
    description: 'Explore a collection of my games. Play them directly in-browser.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${orbitron.variable} ${rajdhani.variable} ${jetbrainsMono.variable}`}>
      <body className="min-h-screen terminal-bg font-body antialiased text-foreground">
        {children}
      </body>
    </html>
  )
} 