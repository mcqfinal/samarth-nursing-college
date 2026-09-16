'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

import Image from 'next/image';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

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
      backgroundColor: '#082238',
      padding: '20px',
      fontFamily: "'Inter', sans-serif",
    }}>
      <div style={{
        width: '100%',
        maxWidth: '440px',
        backgroundColor: '#fff',
        borderRadius: '20px',
        boxShadow: '0 25px 60px rgba(0,0,0,0.45)',
        overflow: 'hidden',
        border: '1px solid rgba(255,255,255,0.1)',
      }}>
        {/* Header */}
        <div style={{
          background: 'linear-gradient(135deg, #082238 0%, #1e3a8a 100%)',
          padding: '36px 24px 28px',
          textAlign: 'center',
          color: '#fff',
          borderBottom: '3px solid #ffb703',
        }}>
          <div style={{
            width: '74px',
            height: '74px',
            margin: '0 auto 16px',
            borderRadius: '16px',
            backgroundColor: '#ffffff',
            padding: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 8px 24px rgba(0,0,0,0.25)',
          }}>
            <Image
              src="/images/college-logo.png"
              alt="Samarth College of Nursing"
              width={60}
              height={60}
              style={{ objectFit: 'contain' }}
            />
          </div>
          <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#ffb703', letterSpacing: '1px', textTransform: 'uppercase' }}>
            Swami Samarth V Om Gagangiri Foundation
          </span>
          <h2 style={{ margin: '4px 0 6px', fontSize: '1.4rem', fontWeight: 800, color: '#fff', fontFamily: "'Playfair Display', serif" }}>
            Samarth College of Nursing
          </h2>
          <p style={{ margin: 0, fontSize: '0.85rem', color: '#cbd5e1' }}>
            Admin Management Console • Sangamner
          </p>
        </div>

        {/* Form Body */}
        <div style={{ padding: '28px 24px' }}>
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
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
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
                background: 'linear-gradient(135deg, #ffb703 0%, #fb8500 100%)',
                color: '#082238',
                border: 'none',
                borderRadius: '10px',
                fontSize: '1rem',
                fontWeight: '700',
                cursor: loading ? 'not-allowed' : 'pointer',
                opacity: loading ? 0.7 : 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                boxShadow: '0 4px 14px rgba(251, 133, 0, 0.35)',
                transition: 'all 0.2s ease',
              }}
            >
              {loading ? (
                <>
                  <i className="fas fa-spinner fa-spin"></i> Authenticating...
                </>
              ) : (
                <>
                  Sign In to Console <i className="fas fa-arrow-right"></i>
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
