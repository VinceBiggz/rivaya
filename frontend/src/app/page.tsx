'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: '#f0f9ff', 
      padding: '20px',
      fontFamily: 'Arial, sans-serif'
    }}>
      <h1 style={{ 
        color: '#2563eb', 
        fontSize: '48px', 
        textAlign: 'center',
        marginBottom: '20px'
      }}>
        RIVAYA
      </h1>
      
      <p style={{ 
        textAlign: 'center', 
        fontSize: '24px',
        color: '#374151',
        marginBottom: '40px'
      }}>
        AI-Powered Group Management
      </p>
      
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        gap: '20px',
        flexWrap: 'wrap'
      }}>
        <button 
          onClick={() => alert('Get Started clicked!')}
          style={{
            backgroundColor: '#2563eb',
            color: 'white',
            padding: '16px 32px',
            border: 'none',
            borderRadius: '12px',
            fontSize: '18px',
            cursor: 'pointer',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
          }}
        >
          Get Started Free
        </button>
        
        <button 
          onClick={() => window.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ', '_blank')}
          style={{
            backgroundColor: 'transparent',
            color: '#2563eb',
            padding: '16px 32px',
            border: '2px solid #2563eb',
            borderRadius: '12px',
            fontSize: '18px',
            cursor: 'pointer'
          }}
        >
          Watch Demo
        </button>
      </div>
      
      <div style={{ 
        marginTop: '60px',
        textAlign: 'center'
      }}>
        <p style={{ color: '#6b7280', marginBottom: '20px' }}>
          Trusted by groups worldwide
        </p>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          gap: '32px',
          flexWrap: 'wrap'
        }}>
          <span style={{ color: '#9ca3af' }}>🏠 Families</span>
          <span style={{ color: '#9ca3af' }}>🎓 Alumni</span>
          <span style={{ color: '#9ca3af' }}>🏦 SACCOs</span>
          <span style={{ color: '#9ca3af' }}>👥 Communities</span>
        </div>
      </div>
    </div>
  );
}
