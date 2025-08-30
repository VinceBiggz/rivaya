import type { Metadata } from 'next'
import { Inter, Poppins } from 'next/font/google';
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'RIVAYA - AI-Powered Group Management Platform',
  description: 'Revolutionizing how families, alumni, SACCOs, and communities stay connected across any distance with AI-powered group management.',
  keywords: ['group management', 'AI', 'communities', 'families', 'alumni', 'SACCOs'],
  authors: [{ name: 'RIVAYA Team' }],
  creator: 'RIVAYA Team',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://rivaya.com',
    title: 'RIVAYA - AI-Powered Group Management Platform',
    description: 'Revolutionizing how families, alumni, SACCOs, and communities stay connected across any distance with AI-powered group management.',
    siteName: 'RIVAYA',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'RIVAYA - AI-Powered Group Management Platform',
    description: 'Revolutionizing how families, alumni, SACCOs, and communities stay connected across any distance with AI-powered group management.',
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
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${poppins.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
