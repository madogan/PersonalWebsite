import type { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import { ThemeProvider } from '@/components/providers/theme-provider'
import { Footer } from '@/components/layout/footer'
import { BottomNavigation } from '@/components/home/bottom-navigation'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Personal Website',
    template: '%s | Personal Website',
  },
  description: 'Personal website with blog and resume',
  keywords: ['blog', 'resume', 'portfolio', 'personal website'],
  authors: [{ name: 'Your Name' }],
  creator: 'Your Name',
  metadataBase: new URL('https://example.com'),
  icons: {
    icon: [
      { url: '/images/profile.jpg', sizes: '32x32', type: 'image/jpeg' },
      { url: '/images/profile.jpg', sizes: '16x16', type: 'image/jpeg' },
    ],
    apple: [
      { url: '/images/profile.jpg', sizes: '180x180', type: 'image/jpeg' },
    ],
    shortcut: '/favicon.ico',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://example.com',
    siteName: 'Personal Website',
    title: 'Personal Website',
    description: 'Personal website with blog and resume',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased`}>
        <ThemeProvider>
          <div className="flex min-h-screen flex-col">
            <main className="flex-1">{children}</main>
            <Footer />
            <BottomNavigation />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}

