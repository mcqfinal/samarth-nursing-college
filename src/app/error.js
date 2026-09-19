'use client';

import { useEffect } from 'react';

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div style={{
      minHeight: '60vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '40px 20px',
      textAlign: 'center',
      fontFamily: "'Inter', sans-serif",
    }}>
      <div style={{
        width: '60px',
        height: '60px',
        borderRadius: '50%',
        backgroundColor: '#fee2e2',
        color: '#dc2626',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '1.5rem',
        marginBottom: '16px',
      }}>
        <i className="fas fa-exclamation-triangle"></i>
      </div>
      <h2 style={{ color: '#0d3b66', fontSize: '1.75rem', marginBottom: '10px' }}>
        काहीतरी तांत्रिक त्रुटी आली आहे / Something went wrong
      </h2>
      <p style={{ color: '#64748b', marginBottom: '24px', maxWidth: '480px', lineHeight: 1.6 }}>
        कृपया पृष्ठ रीलोड करा किंवा पुन्हा प्रयत्न करा.
      </p>
      <button
        onClick={() => reset()}
        style={{
          background: '#0d3b66',
          color: '#ffffff',
          border: 'none',
          padding: '12px 28px',
          borderRadius: '8px',
          fontWeight: 600,
          cursor: 'pointer',
          fontSize: '0.95rem',
          boxShadow: '0 4px 12px rgba(13,59,102,0.2)',
        }}
      >
        पुन्हा प्रयत्न करा (Try Again)
      </button>
    </div>
  );
}
