'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('admin@samarthnursing.edu.in');
  const [password, setPassword] = useState('admin123');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const fillSampleCredentials = () => {
    setEmail('admin@samarthnursing.edu.in');
    setPassword('admin123');
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Invalid credentials');
      }

      router.push('/admin');
      router.refresh();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#092847',
      padding: '20px',
      fontFamily: "'Inter', sans-serif",
    }}>
      <div style={{
        width: '100%',
        maxWidth: '440px',
        backgroundColor: '#fff',
        borderRadius: '16px',
        boxShadow: '0 20px 50px rgba(0,0,0,0.35)',
        overflow: 'hidden',
      }}>
        {/* Header */}
        <div style={{
          backgroundColor: '#0d3b66',
          padding: '30px 24px',
          textAlign: 'center',
          color: '#fff',
        }}>
          <div style={{
            width: '64px',
            height: '64px',
            margin: '0 auto 14px',
            borderRadius: '50%',
            backgroundColor: '#1a9988',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.8rem',
            fontWeight: 'bold',
            fontFamily: "'Playfair Display', serif",
            boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
          }}>
            S
          </div>
          <h2 style={{ margin: '0 0 6px', fontSize: '1.35rem', color: '#fff' }}>
            Samarth College of Nursing
          </h2>
          <p style={{ margin: 0, fontSize: '0.85rem', color: '#93c5fd' }}>
            Admin Management Console
          </p>
        </div>

        {/* Form Body */}
        <div style={{ padding: '28px 24px' }}>
          
          {/* Sample Credentials Box */}
          <div style={{
            backgroundColor: '#f0fdf4',
            border: '1px solid #bbf7d0',
            borderRadius: '10px',
            padding: '14px 16px',
            marginBottom: '20px',
            fontSize: '0.86rem',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ fontWeight: '700', color: '#166534', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <i className="fas fa-key" style={{ color: '#16a34a' }}></i> Sample Admin Access
              </span>
              <button
                type="button"
                onClick={fillSampleCredentials}
                style={{
                  backgroundColor: '#16a34a',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '4px',
                  padding: '4px 10px',
                  fontSize: '0.75rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                }}
              >
                Auto-fill
              </button>
            </div>
            <div style={{ color: '#374151', lineHeight: '1.6' }}>
              <div><strong>Email:</strong> <code style={{ backgroundColor: '#fff', padding: '2px 6px', borderRadius: '4px' }}>admin@samarthnursing.edu.in</code></div>
              <div><strong>Password:</strong> <code style={{ backgroundColor: '#fff', padding: '2px 6px', borderRadius: '4px' }}>admin123</code></div>
            </div>
          </div>

          {error && (
            <div style={{
              backgroundColor: '#fde8e8',
              color: '#c81e1e',
              padding: '12px 16px',
              borderRadius: '8px',
              fontSize: '0.85rem',
              marginBottom: '20px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              border: '1px solid #f8b4b4',
            }}>
              <i className="fas fa-exclamation-circle" style={{ flexShrink: 0 }}></i>
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '18px' }}>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', color: '#333', marginBottom: '6px' }}>
                Admin Email
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@samarthnursing.edu.in"
                  required
                  style={{
                    width: '100%',
                    padding: '12px 14px 12px 38px',
                    borderRadius: '8px',
                    border: '1px solid #d1d5db',
                    fontSize: '0.95rem',
                    boxSizing: 'border-box',
                    outline: 'none',
                  }}
                />
                <i className="fas fa-envelope" style={{
                  position: 'absolute',
                  left: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: '#9ca3af',
                }}></i>
              </div>
            </div>

            <div style={{ marginBottom: '24px' }}>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', color: '#333', marginBottom: '6px' }}>
                Password
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  style={{
                    width: '100%',
                    padding: '12px 14px 12px 38px',
                    borderRadius: '8px',
                    border: '1px solid #d1d5db',
                    fontSize: '0.95rem',
                    boxSizing: 'border-box',
                    outline: 'none',
                  }}
                />
                <i className="fas fa-lock" style={{
                  position: 'absolute',
                  left: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: '#9ca3af',
                }}></i>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%',
                padding: '13px',
                backgroundColor: '#1a9988',
                color: '#fff',
                border: 'none',
                borderRadius: '8px',
                fontSize: '1rem',
                fontWeight: '600',
                cursor: loading ? 'not-allowed' : 'pointer',
                opacity: loading ? 0.7 : 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                boxShadow: '0 4px 12px rgba(26,153,136,0.3)',
                transition: 'background 0.2s',
              }}
            >
              {loading ? (
                <>
                  <i className="fas fa-spinner fa-spin"></i> Authenticating...
                </>
              ) : (
                <>
                  <i className="fas fa-sign-in-alt"></i> Sign In to Dashboard
                </>
              )}
            </button>
          </form>

          <div style={{ marginTop: '24px', textAlign: 'center' }}>
            <Link href="/" style={{ color: '#0d3b66', fontSize: '0.88rem', textDecoration: 'none', fontWeight: '500' }}>
              &larr; Back to Website
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
