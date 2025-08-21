'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-5 font-sans">
      <h1 className="text-5xl md:text-6xl font-bold text-center text-blue-600 mb-5">
        RIVAYA
      </h1>
      
      <p className="text-center text-2xl md:text-3xl text-gray-700 mb-10">
        AI-Powered Group Management
      </p>
      
      <div className="flex justify-center gap-5 flex-wrap">
        <button 
          onClick={() => alert('Get Started clicked!')}
          className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl text-lg font-semibold shadow-lg transition-all duration-200 transform hover:scale-105"
        >
          Get Started Free
        </button>
        
        <button 
          onClick={() => window.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ', '_blank')}
          className="bg-transparent hover:bg-blue-50 text-blue-600 px-8 py-4 border-2 border-blue-600 rounded-xl text-lg font-semibold transition-all duration-200 transform hover:scale-105"
        >
          Watch Demo
        </button>
      </div>
      
      <div className="mt-16 text-center">
        <p className="text-gray-500 mb-5 text-lg">
          Trusted by groups worldwide
        </p>
        <div className="flex justify-center gap-8 flex-wrap">
          <span className="text-gray-400 text-lg">🏠 Families</span>
          <span className="text-gray-400 text-lg">🎓 Alumni</span>
          <span className="text-gray-400 text-lg">🏦 SACCOs</span>
          <span className="text-gray-400 text-lg">👥 Communities</span>
        </div>
      </div>
    </div>
  );
}
