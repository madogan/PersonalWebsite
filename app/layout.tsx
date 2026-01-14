import type { Metadata } from 'next'
import localFont from 'next/font/local'
import { ThemeProvider } from '@/components/providers/theme-provider'
import { Footer } from '@/components/layout/footer'
import { BottomNavigation } from '@/components/home/bottom-navigation'
import { ThemeToggle } from '@/components/ui/theme-toggle'
import { NotebookBinding } from '@/components/layout/notebook-binding'
import { PageTransition } from '@/components/transitions/page-transition'
import './globals.css'

// Charm font family - unified typography using local font files
// License: SIL Open Font License (OFL) - see fonts/OFL.txt
const charm = localFont({
  src: [
    { path: '../fonts/Charm-Regular.ttf', weight: '400', style: 'normal' },
    { path: '../fonts/Charm-Bold.ttf', weight: '700', style: 'normal' },
  ],
  variable: '--font-charm',
  display: 'swap',
  preload: true,
})

export const metadata: Metadata = {
  title: {
    default: 'Personal Website',
    template: '%s | Personal Website',
  },
  description: 'Personal website with blog',
  keywords: ['blog', 'portfolio', 'personal website'],
  authors: [{ name: 'Your Name' }],
  creator: 'Your Name',
  metadataBase: new URL('https://example.com'),
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '32x32' },
      { url: '/icon.png', sizes: '192x192' },
    ],
    apple: [{ url: '/icon.png', sizes: '180x180' }],
    shortcut: '/favicon.ico',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://example.com',
    siteName: 'Personal Website',
    title: 'Personal Website',
    description: 'Personal website with blog',
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
      <body
        className={`${charm.variable} paper-texture font-sans antialiased`}
      >
        <ThemeProvider>
          <div className="relative flex min-h-screen flex-col">
            {/* Notebook Binding - Left Edge */}
            <NotebookBinding />
            {/* Theme Toggle - Top Right */}
            <div className="no-print fixed right-4 top-4 z-50">
              <ThemeToggle />
            </div>
            <main className="flex-1">
              <PageTransition>{children}</PageTransition>
            </main>
            <Footer />
            <BottomNavigation />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
