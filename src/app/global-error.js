'use client';

export default function GlobalError({ error, reset }) {
  return (
    <html>
      <body style={{ fontFamily: "'Inter', sans-serif", textAlign: 'center', padding: '60px 20px', background: '#f8fafc' }}>
        <h2 style={{ color: '#0d3b66', fontSize: '1.8rem', marginBottom: '12px' }}>
          Something went wrong!
        </h2>
        <p style={{ color: '#64748b', marginBottom: '24px' }}>
          An unexpected error occurred. Please try again.
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
          }}
        >
          Try Again
        </button>
      </body>
    </html>
  );
}
