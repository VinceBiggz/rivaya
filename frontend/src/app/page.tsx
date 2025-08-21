'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(false);
  const [activeFeature, setActiveFeature] = useState('ai');

  const handleGetStarted = () => {
    setIsLoading(true);
    setTimeout(() => {
      alert('Welcome to RIVAYA! 🎉\n\nThis is where your group management journey begins.\n\nFeatures coming soon:\n• AI-powered insights\n• Smart group organization\n• Payment management\n• Real-time collaboration');
      setIsLoading(false);
    }, 1000);
  };

  const features = [
    {
      id: 'ai',
      title: 'AI-Powered Insights',
      description: 'Get intelligent recommendations for your group management',
      icon: '🤖'
    },
    {
      id: 'payments',
      title: 'Payment Management',
      description: 'Handle group finances with ease and transparency',
      icon: '💳'
    },
    {
      id: 'collaboration',
      title: 'Real-time Collaboration',
      description: 'Work together seamlessly across all devices',
      icon: '👥'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-5 font-sans">
      {/* Header */}
      <header className="text-center mb-12">
        <h1 className="text-5xl md:text-6xl font-bold text-blue-600 mb-5 animate-pulse">
          RIVAYA
        </h1>
        
        <p className="text-center text-2xl md:text-3xl text-gray-700 mb-4">
          AI-Powered Group Management
        </p>
        
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Transform how you manage families, alumni groups, SACCOs, and communities with intelligent automation and seamless collaboration.
        </p>
      </header>
      
      {/* CTA Buttons */}
      <div className="flex justify-center gap-5 flex-wrap mb-16">
        <button 
          onClick={handleGetStarted}
          disabled={isLoading}
          className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-8 py-4 rounded-xl text-lg font-semibold shadow-lg transition-all duration-200 transform hover:scale-105 disabled:transform-none"
        >
          {isLoading ? 'Loading...' : 'Get Started Free'}
        </button>
        
        <button 
          onClick={() => window.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ', '_blank')}
          className="bg-transparent hover:bg-blue-50 text-blue-600 px-8 py-4 border-2 border-blue-600 rounded-xl text-lg font-semibold transition-all duration-200 transform hover:scale-105"
        >
          Watch Demo
        </button>
      </div>

      {/* Features Section */}
      <section className="max-w-6xl mx-auto mb-16">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
          Powerful Features for Modern Groups
        </h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div
              key={feature.id}
              onClick={() => setActiveFeature(feature.id)}
              className={`p-6 rounded-xl cursor-pointer transition-all duration-300 ${
                activeFeature === feature.id
                  ? 'bg-blue-600 text-white shadow-xl transform scale-105'
                  : 'bg-white text-gray-800 shadow-lg hover:shadow-xl hover:transform hover:scale-105'
              }`}
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className={`text-sm ${activeFeature === feature.id ? 'text-blue-100' : 'text-gray-600'}`}>
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="max-w-4xl mx-auto mb-16">
        <div className="grid md:grid-cols-4 gap-8 text-center">
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="text-3xl font-bold text-blue-600 mb-2">10K+</div>
            <div className="text-gray-600">Active Groups</div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="text-3xl font-bold text-blue-600 mb-2">50K+</div>
            <div className="text-gray-600">Members</div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="text-3xl font-bold text-blue-600 mb-2">$2M+</div>
            <div className="text-gray-600">Transactions</div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="text-3xl font-bold text-blue-600 mb-2">99.9%</div>
            <div className="text-gray-600">Uptime</div>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="text-center">
        <p className="text-gray-500 mb-5 text-lg">
          Trusted by groups worldwide
        </p>
        <div className="flex justify-center gap-8 flex-wrap">
          <span className="text-gray-400 text-lg">🏠 Families</span>
          <span className="text-gray-400 text-lg">🎓 Alumni</span>
          <span className="text-gray-400 text-lg">🏦 SACCOs</span>
          <span className="text-gray-400 text-lg">👥 Communities</span>
        </div>
        
        <div className="mt-8 text-sm text-gray-500">
          © 2024 RIVAYA. All rights reserved. | 
          <a href="#" className="text-blue-600 hover:underline ml-1">Privacy Policy</a> | 
          <a href="#" className="text-blue-600 hover:underline ml-1">Terms of Service</a>
        </div>
      </footer>
    </div>
  );
}
