import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from '@/components/providers';
import { Toaster } from '@/components/ui/toaster';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'RIVAYA - AI-Powered Group Management Platform',
  description: 'Revolutionizing how families, alumni, SACCOs, and friends stay connected across any distance.',
  keywords: ['group management', 'family', 'alumni', 'SACCO', 'community', 'AI'],
  authors: [{ name: 'Vincent Wachira', url: 'https://github.com/VinceBiggz' }],
  creator: 'Vincent Wachira',
  publisher: 'RIVAYA',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://rivaya.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://rivaya.com',
    title: 'RIVAYA - AI-Powered Group Management Platform',
    description: 'Revolutionizing how families, alumni, SACCOs, and friends stay connected across any distance.',
    siteName: 'RIVAYA',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'RIVAYA - AI-Powered Group Management Platform',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'RIVAYA - AI-Powered Group Management Platform',
    description: 'Revolutionizing how families, alumni, SACCOs, and friends stay connected across any distance.',
    images: ['/og-image.jpg'],
    creator: '@VinceBiggz',
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
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
