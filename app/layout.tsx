import type { Metadata } from 'next'
import localFont from 'next/font/local'
import { ThemeProvider } from '@/components/providers/theme-provider'
import { Footer } from '@/components/layout/footer'
import { BottomNavigation } from '@/components/home/bottom-navigation'
import { ThemeTogglePlacement } from '@/components/ui/theme-toggle-placement'
import { PageTransition } from '@/components/transitions/page-transition'
import './globals.css'

// Solitreo font family - unified typography using local font files
// License: SIL Open Font License (OFL) - see fonts/Solitreo/OFL.txt
const solitreo = localFont({
  src: [
    {
      path: '../fonts/Solitreo/Solitreo-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    // Note: Only Regular weight available - bold will use synthetic bold
  ],
  variable: '--font-solitreo',
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
  // suppressHydrationWarning on body helps when a browser extension injects attributes (e.g. data--h-bstatus, hb-hide-temp) and causes hydration mismatch; disable extensions for this site if warnings persist.
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${solitreo.variable} paper-texture font-sans antialiased`}
        suppressHydrationWarning
      >
        <ThemeProvider>
          <div className="relative flex min-h-screen flex-col" suppressHydrationWarning>
            {/* Theme Toggle - Top Right (hidden on /admin; admin header has its own) */}
            <ThemeTogglePlacement />
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
