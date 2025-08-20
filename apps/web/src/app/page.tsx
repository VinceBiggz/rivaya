import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'RIVAYA - AI-Powered Group Management',
  description: 'Revolutionizing how families, alumni, SACCOs, and friends stay connected across any distance.',
  keywords: ['group management', 'AI', 'family', 'alumni', 'SACCO', 'social networking'],
  authors: [{ name: 'RIVAYA Team' }],
  openGraph: {
    title: 'RIVAYA - AI-Powered Group Management',
    description: 'Revolutionizing how families, alumni, SACCOs, and friends stay connected across any distance.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'RIVAYA - AI-Powered Group Management',
    description: 'Revolutionizing how families, alumni, SACCOs, and friends stay connected across any distance.',
  },
};

export default function HomePage(): JSX.Element {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100">
      <div className="container mx-auto px-4 py-20">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              RIVAYA
            </span>
            <br />
            <span className="text-gray-900">AI-Powered Group Management</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Revolutionizing how families, alumni, SACCOs, and friends stay connected across any distance.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              type="button"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Get Started Free
            </button>
            <button 
              type="button"
              className="border border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-3 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Watch Demo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
