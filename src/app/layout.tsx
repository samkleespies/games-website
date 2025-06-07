import type { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
})

export const metadata: Metadata = {
  title: 'GameDev Portfolio | Interactive Games & Experiences',
  description: 'Explore my collection of interactive games built with Godot 4 and other cutting-edge technologies. Play games directly in your browser and discover the creative process behind each project.',
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
    title: 'GameDev Portfolio | Interactive Games & Experiences',
    description: 'Explore my collection of interactive games built with Godot 4 and other cutting-edge technologies.',
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
    title: 'GameDev Portfolio | Interactive Games & Experiences',
    description: 'Explore my collection of interactive games built with Godot 4 and other cutting-edge technologies.',
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
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="min-h-screen bg-background font-sans antialiased">
        {children}
      </body>
    </html>
  )
} 