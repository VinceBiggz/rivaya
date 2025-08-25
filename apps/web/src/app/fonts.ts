import localFont from 'next/font/local';

// This is the new local font definition.
// It assumes you have downloaded the font files and placed them in `apps/web/public/fonts/`.
export const interLocal = localFont({
  src: [
    {
      path: '../../public/fonts/inter-v12-latin-regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/inter-v12-latin-500.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../../public/fonts/inter-v12-latin-600.woff2',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../../public/fonts/inter-v12-latin-700.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-inter',
  display: 'swap',
  fallback: ['system-ui', 'sans-serif'], // Optional
});